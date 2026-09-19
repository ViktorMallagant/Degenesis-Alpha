#!/usr/bin/env python3
"""Replace the page-two diamond portrait frame with an upright inset frame."""

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, FloatObject, NameObject
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]

TEMPLATES = {
    ROOT / "public" / "fiche_degenesis.pdf": "Portrait",
    ROOT / "public" / "fiche_degenesis_en.pdf": "CharPortrait",
}

# Rotating the original diamond upright changes its 193-point bounding box to
# the diamond's 136-point side length. Keep the lower edge aligned with the
# existing PORTRAIT label, matching the supplied layout reference.
FRAME_SIZE = 136.3
FRAME_CENTER_X = 297.65
FRAME_LEFT = FRAME_CENTER_X - FRAME_SIZE / 2
FRAME_BOTTOM = 610.0
FRAME_TOP = FRAME_BOTTOM + FRAME_SIZE
FRAME_INSET = 4.0

PORTRAIT_RECT = [
    FRAME_LEFT + FRAME_INSET,
    FRAME_BOTTOM + FRAME_INSET,
    FRAME_LEFT + FRAME_SIZE - FRAME_INSET,
    FRAME_TOP - FRAME_INSET,
]


def draw_diamond(pdf: canvas.Canvas, x: float, y: float, radius: float = 2.1) -> None:
    path = pdf.beginPath()
    path.moveTo(x, y + radius)
    path.lineTo(x + radius, y)
    path.lineTo(x, y - radius)
    path.lineTo(x - radius, y)
    path.close()
    pdf.drawPath(path, stroke=1, fill=0)


def make_overlay(width: float, height: float):
    stream = BytesIO()
    pdf = canvas.Canvas(stream, pagesize=(width, height))

    # Remove the old diamond and its central ornaments while leaving the
    # description/relationship tables and the PORTRAIT title bar untouched.
    pdf.setFillColorRGB(1, 1, 1)
    pdf.setStrokeColorRGB(1, 1, 1)
    pdf.rect(192.7, 606.0, 209.8, 202.5, stroke=0, fill=1)

    pdf.setFillColorRGB(0, 0, 0)
    pdf.setStrokeColorRGB(0, 0, 0)
    pdf.setLineWidth(0.35)

    # Restore the decorative line through the newly cleared central area.
    ornament_y = FRAME_TOP + 7.0
    pdf.line(192.7, ornament_y, FRAME_LEFT - 5.0, ornament_y)
    pdf.line(FRAME_LEFT + FRAME_SIZE + 5.0, ornament_y, 402.5, ornament_y)
    draw_diamond(pdf, FRAME_LEFT - 8.0, ornament_y)
    draw_diamond(pdf, FRAME_LEFT + FRAME_SIZE + 8.0, ornament_y)

    # Double-line upright frame, retaining the original document's fine linework.
    pdf.rect(FRAME_LEFT, FRAME_BOTTOM, FRAME_SIZE, FRAME_SIZE, stroke=1, fill=0)
    pdf.rect(
        FRAME_LEFT + 3.0,
        FRAME_BOTTOM + 3.0,
        FRAME_SIZE - 6.0,
        FRAME_SIZE - 6.0,
        stroke=1,
        fill=0,
    )
    draw_diamond(pdf, FRAME_LEFT - 4.0, FRAME_TOP - 25.0, 1.8)
    draw_diamond(pdf, FRAME_LEFT + FRAME_SIZE + 4.0, FRAME_TOP - 25.0, 1.8)

    pdf.save()
    stream.seek(0)
    return PdfReader(stream).pages[0]


def update_template(path: Path, portrait_field: str) -> None:
    reader = PdfReader(path)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)

    page = writer.pages[1]
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    page.merge_page(make_overlay(width, height), over=True)

    found = False
    for annotation_ref in page.get("/Annots") or []:
        annotation = annotation_ref.get_object()
        name = annotation.get("/T")
        parent_ref = annotation.get("/Parent")
        if not name and parent_ref:
            name = parent_ref.get_object().get("/T")
        if name != portrait_field:
            continue

        annotation[NameObject("/Rect")] = ArrayObject(
            [FloatObject(value) for value in PORTRAIT_RECT]
        )
        annotation.pop(NameObject("/AP"), None)
        found = True

    if not found:
        raise RuntimeError(f"Portrait field {portrait_field!r} not found in {path}")

    temporary = path.with_suffix(".tmp.pdf")
    with temporary.open("wb") as output:
        writer.write(output)
    temporary.replace(path)


def main() -> None:
    for template, field in TEMPLATES.items():
        update_template(template, field)


if __name__ == "__main__":
    main()

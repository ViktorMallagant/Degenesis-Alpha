import { EditorMode } from "@/config/modes";
import type { InventoryPurchase, ResourceMode } from "@/config/items";


export class Character {
  constructor(
    readonly name: string,
    readonly culture: string,
    readonly concept: string,
    readonly cult: string,
    readonly rank: string,
    readonly attributes: Array<[string, number]>,
    readonly skills: Array<[string, number]>,
    readonly origins: Array<[string, number]>,
    readonly potentials?: Array<[string, number]>,
    readonly legacies?: Array<[string, number]>,
    readonly age?: string,
    readonly gender?: string,
    readonly height?: string,
    readonly weight?: string,
    // Legacy flag, superseded by editorMode
    wasCreatedWithFreeMode?: boolean,
    readonly editorMode?: EditorMode,
    readonly clan?: string,
    readonly experience?: string,
    readonly portrait?: string,
    readonly inventory?: InventoryPurchase[],
    readonly resourceMode?: ResourceMode,
    readonly manualLC?: number | null,
    readonly legacyChoices?: Record<string, { attributes?: string[]; skills?: string[] }>,
    readonly sidewinderOldCultName?: string | null,
    readonly mentalPowerChoice?: 'primal' | 'focus' | null,
    readonly mentalResistanceChoice?: 'faith' | 'willpower' | null,
    readonly giftedBonuses?: Record<string, number>,
  ) {
    this.storageVersion = 'v1'
    const legacyEditorMode = wasCreatedWithFreeMode ? (wasCreatedWithFreeMode ? EditorMode.Free : editorMode) : editorMode
    this.editorMode = legacyEditorMode ?? EditorMode.Default
  }
  storageVersion: string
}
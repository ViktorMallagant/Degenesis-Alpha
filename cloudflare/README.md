# Degenesis Alpha Cloudflare share backend

This directory contains the Cloudflare Worker used to store and retrieve shared character JSON.

## Cloudflare dashboard setup

1. Open **Workers & Pages** and create a Worker named `degenesis-alpha-share`.
2. Replace the starter Worker code with `share-worker.js` and deploy it.
3. Open **Workers KV** and create a namespace named `DEGENESIS_SHARES`.
4. Return to the `degenesis-alpha-share` Worker.
5. Open **Settings > Bindings** and add a **KV Namespace** binding:
   - Variable name: `DEGENESIS_SHARES`
   - KV namespace: `DEGENESIS_SHARES`
6. Deploy the binding.
7. Keep the Worker's public `workers.dev` route enabled and note the full URL, for example:
   `https://degenesis-alpha-share.<account-subdomain>.workers.dev`

## API

- `GET /health` returns `{ "ok": true }`.
- `POST /share` accepts Degenesis Alpha `storageVersion: "v1"` character JSON and returns a random share key.
- `GET /share/:key` returns the stored character JSON.

The Worker accepts character-share browser requests only from the production GitHub Pages origin and local Vite development origins. Payload size is capped at 4 MiB.

No GitHub token, Cloudflare API token, or other secret is exposed to the frontend. The Worker accesses KV through the Cloudflare binding.

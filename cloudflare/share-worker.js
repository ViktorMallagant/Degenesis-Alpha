// Degenesis Alpha character-sharing backend for Cloudflare Workers + Workers KV.
//
// Required KV binding:
//   Variable name: DEGENESIS_SHARES
//
// Public API:
//   POST /share       -> { key: "<random-id>" }
//   GET  /share/:key  -> stored Character JSON
//   GET  /health      -> { ok: true }

const MAX_PAYLOAD_BYTES = 4 * 1024 * 1024

// CORS is a browser control, not authentication, but restricting the public
// frontend origins prevents other websites from casually using this Worker.
const ALLOWED_ORIGINS = new Set([
  'https://viktormallagant.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin')
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {}

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  }
}

function jsonResponse(request, value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders(request),
    },
  })
}

function originIsAllowed(request) {
  const origin = request.headers.get('Origin')
  return Boolean(origin && ALLOWED_ORIGINS.has(origin))
}

function randomShareId() {
  // 144 bits of entropy, represented as 36 lowercase hexadecimal characters.
  const bytes = crypto.getRandomValues(new Uint8Array(18))
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function isValidShareId(id) {
  return /^[a-f0-9]{36}$/.test(id)
}

function isDegenesisCharacter(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value.storageVersion === 'v1' &&
    typeof value.name === 'string' &&
    value.name.trim().length > 0 &&
    value.name.length <= 200
  )
}

async function createShare(request, env) {
  if (!originIsAllowed(request)) {
    return jsonResponse(request, { error: 'Origin not allowed.' }, 403)
  }

  const declaredLength = Number(request.headers.get('Content-Length') || '0')
  if (declaredLength > MAX_PAYLOAD_BYTES) {
    return jsonResponse(request, { error: 'Character payload is too large.' }, 413)
  }

  const body = await request.text()
  const byteLength = new TextEncoder().encode(body).byteLength
  if (byteLength === 0 || byteLength > MAX_PAYLOAD_BYTES) {
    return jsonResponse(request, { error: 'Character payload is empty or too large.' }, 413)
  }

  let character
  try {
    character = JSON.parse(body)
  } catch {
    return jsonResponse(request, { error: 'Invalid JSON.' }, 400)
  }

  if (!isDegenesisCharacter(character)) {
    return jsonResponse(request, { error: 'Payload is not a valid Degenesis Alpha character.' }, 400)
  }

  const key = randomShareId()
  await env.DEGENESIS_SHARES.put(`share:${key}`, body)

  return jsonResponse(request, { key }, 201)
}

async function getShare(request, env, key) {
  if (!originIsAllowed(request)) {
    return jsonResponse(request, { error: 'Origin not allowed.' }, 403)
  }

  if (!isValidShareId(key)) {
    return jsonResponse(request, { error: 'Share not found.' }, 404)
  }

  const character = await env.DEGENESIS_SHARES.get(`share:${key}`)
  if (character === null) {
    return jsonResponse(request, { error: 'Share not found.' }, 404)
  }

  return new Response(character, {
    status: 200,
    headers: {
      ...JSON_HEADERS,
      ...corsHeaders(request),
    },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'GET' && url.pathname === '/health') {
      return jsonResponse(request, { ok: true })
    }

    if (request.method === 'OPTIONS') {
      if (!originIsAllowed(request)) {
        return jsonResponse(request, { error: 'Origin not allowed.' }, 403)
      }
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      })
    }

    if (request.method === 'POST' && url.pathname === '/share') {
      return createShare(request, env)
    }

    if (request.method === 'GET' && url.pathname.startsWith('/share/')) {
      const key = url.pathname.slice('/share/'.length)
      return getShare(request, env, key)
    }

    return jsonResponse(request, { error: 'Not found.' }, 404)
  },
}

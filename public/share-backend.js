// Compatibility adapter for the Degenesis Alpha sharing backend.
//
// Existing Vue code historically talks to Bytebin using these two shapes:
//   POST https://bytebin.lucko.me/post
//   GET  https://bytebin.lucko.me/<share-id>
//
// Intercept those calls before any network request is made and route them to
// the project-owned Cloudflare Worker instead. This keeps existing #bb= share
// links and the compressed #view= fallback intact while sending zero traffic
// to Bytebin.
(function () {
  const SHARE_BACKEND = 'https://degenesis-alpha-share.gamemaster-witcher-openworldrpg.workers.dev'
  const BYTEBIN_POST = 'https://bytebin.lucko.me/post'
  const BYTEBIN_PREFIX = 'https://bytebin.lucko.me/'
  const nativeFetch = window.fetch.bind(window)

  window.fetch = function (input, init) {
    const url = typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.toString()
        : input instanceof Request
          ? input.url
          : String(input)

    if (url === BYTEBIN_POST) {
      return nativeFetch(`${SHARE_BACKEND}/share`, init)
    }

    if (url.startsWith(BYTEBIN_PREFIX)) {
      const key = url.slice(BYTEBIN_PREFIX.length)
      if (key && !key.includes('/') && !key.includes('?') && !key.includes('#')) {
        return nativeFetch(`${SHARE_BACKEND}/share/${encodeURIComponent(key)}`, init)
      }
    }

    return nativeFetch(input, init)
  }
})()

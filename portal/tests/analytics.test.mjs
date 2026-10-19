import test from 'node:test'
import assert from 'node:assert/strict'

function memoryStorage() {
  const data = new Map()
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) }
}

async function setup() {
  const scripts = []
  global.window = {
    localStorage: memoryStorage(), sessionStorage: memoryStorage(),
    navigator: { userAgent: 'Android Mobile' },
    location: { origin: 'https://michicho.com', hostname: 'michicho.com', pathname: '/theking', search: '?utm_source=tiktok&utm_campaign=launch&utm_content=horde_01' },
    dispatchEvent() {},
  }
  global.document = { title: 'THE KING', referrer: 'https://example.com/?email=private', cookie: '', createElement: () => ({}), head: { appendChild: el => scripts.push(el) } }
  const analytics = await import(`../src/lib/analytics.js?test=${Math.random()}`)
  const events = () => (window.dataLayer || []).map(entry => Array.from(entry)).filter(entry => entry[0] === 'event')
  return { analytics, scripts, events }
}

test('does not load Google or send analytics before consent; sends one view after consent', async () => {
  const { analytics: a, scripts, events } = await setup()
  a.trackPage('/theking', window.location.search)
  a.trackPage('/theking', window.location.search)
  assert.equal(scripts.length, 0)
  assert.equal(events().length, 0)
  a.setConsent('granted')
  assert.match(scripts[0].src, /googletagmanager.com\/gtag\/js\?id=G-X1C2JD7GC3/)
  a.trackPage('/theking', window.location.search)
  assert.deepEqual(events().map(e => e[1]), ['page_view', 'landing_page_view'])
  const params = events()[1][2]
  assert.equal(params.utm_source, 'tiktok')
  assert.equal(params.device_type, 'android')
  assert.equal(params.page_referrer, 'https://example.com')
  const config = window.dataLayer.map(e => Array.from(e)).find(e => e[0] === 'config')
  assert.equal(config[2].send_page_view, false)
  a.trackPage('/games')
  a.trackPage('/theking')
  assert.equal(events().filter(e => e[1] === 'landing_page_view').length, 2)
  assert.equal(events().at(-1)[2].utm_content, 'horde_01')
  a.setConsent('denied')
  assert.equal(a.trackEvent('platform_click', { platform: 'android' }), false)
  assert.equal(window['ga-disable-G-X1C2JD7GC3'], true)
  assert.equal(window.sessionStorage.getItem('michicho:campaign'), null)
})

test('campaign attribution drops unrelated queries and replaces stale creative fields', async () => {
  const { analytics: a } = await setup()
  assert.deepEqual(a.campaignFrom('?utm_source=reddit&email=private&user_id=123&utm_content=a%40b.com'), { utm_source: 'reddit' })
  a.captureAttribution('?utm_source=tiktok&utm_content=old')
  assert.deepEqual(a.captureAttribution(''), { utm_source: 'tiktok', utm_content: 'old' })
  assert.deepEqual(a.captureAttribution('?utm_source=youtube'), { utm_source: 'youtube' })
  a.trackPage('/theking', '?email=secret&token=secret&utm_source=youtube')
  a.setConsent('granted')
  assert.doesNotMatch(JSON.stringify(window.dataLayer), /email=|token=/)
})

test('platform navigation waits for GA callback and happens once; denied clicks navigate immediately', async () => {
  const { analytics: a, events } = await setup()
  const navigations = []
  let prevented = 0
  const click = { button: 0, preventDefault() { prevented++ } }
  const url = 'https://play.google.com/store/apps/details?id=com.wobbly.theking'
  a.trackPage('/theking', window.location.search)
  a.trackPlatformClick(click, 'android', url, href => navigations.push(href))
  assert.deepEqual(navigations, [url])
  a.setConsent('granted')
  a.trackPlatformClick(click, 'android', url, href => navigations.push(href))
  assert.equal(navigations.length, 1)
  const event = events().at(-1)
  assert.equal(event[1], 'platform_click')
  for (const key of ['platform', 'utm_source', 'utm_campaign', 'utm_content', 'device_type', 'page_path', 'event_timeout']) assert.ok(key in event[2])
  assert.equal(event[2].transport_type, 'beacon')
  event[2].event_callback()
  event[2].event_callback()
  assert.equal(navigations.length, 2)
  assert.equal(prevented, 2)
  a.trackPlatformClick({ ...click, currentTarget: { target: '_blank' } }, 'android', url, href => navigations.push(href))
  assert.equal(navigations.length, 2)
  assert.equal(prevented, 2)
  a.trackPlatformClick({ ...click, ctrlKey: true }, 'android', url, href => navigations.push(href))
  assert.equal(navigations.length, 2)
  assert.equal(prevented, 2)
})

test('blocked analytics cannot trap outbound navigation', async () => {
  const { analytics: a } = await setup()
  a.trackPage('/theking')
  a.setConsent('granted')
  const result = await new Promise(resolve => {
    a.trackPlatformClick({ button: 0, preventDefault() {} }, 'ios', 'https://apps.apple.com/app/id12345', resolve)
  })
  assert.equal(result, 'https://apps.apple.com/app/id12345')
})

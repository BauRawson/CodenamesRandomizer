import { deviceType } from '../config/theKing.js'

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
const CONSENT_KEY = 'michicho:analytics-consent'
const ATTRIBUTION_KEY = 'michicho:campaign'
const measurementId = import.meta.env?.VITE_GA_MEASUREMENT_ID ?? 'G-X1C2JD7GC3'
const debug = import.meta.env?.VITE_GA_DEBUG === 'true'
let consent = false
let initialized = false
let attribution = {}
let currentPage = null
let lastTrackedPage = null

function storage(kind, method, key, value) {
  try { return window[kind][method](key, value) } catch { return null }
}

export function campaignFrom(search) {
  const query = new URLSearchParams(search)
  return Object.fromEntries(UTM_KEYS.flatMap(key => {
    const value = query.get(key)
    // Campaign labels only. Never forward arbitrary query values or identifiers.
    return value && /^[a-z0-9_-]{1,100}$/i.test(value) ? [[key, value.toLowerCase()]] : []
  }))
}

export function captureAttribution(search) {
  const incoming = campaignFrom(search)
  if (Object.keys(incoming).length) attribution = incoming // A new campaign replaces all four fields.
  else if (!Object.keys(attribution).length && consent) {
    try { attribution = campaignFrom(new URLSearchParams(JSON.parse(storage('sessionStorage', 'getItem', ATTRIBUTION_KEY) || '{}')).toString()) } catch { /* blocked storage */ }
  }
  if (consent) storage('sessionStorage', 'setItem', ATTRIBUTION_KEY, JSON.stringify(attribution))
  return { ...attribution }
}

export function getConsent() {
  return storage('localStorage', 'getItem', CONSENT_KEY)
}

function push() { window.dataLayer.push(arguments) }

function initialize() {
  if (initialized || !/^G-[A-Z0-9]+$/.test(measurementId)) return
  initialized = true
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args) => { if (consent) push(...args) }
  push('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  push('consent', 'update', { analytics_storage: 'granted' })
  push('js', new Date())
  push('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...(debug ? { debug_mode: true } : {}),
  })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

export function setConsent(value) {
  consent = value === 'granted'
  storage('localStorage', 'setItem', CONSENT_KEY, value)
  window[`ga-disable-${measurementId}`] = !consent
  if (consent) {
    initialize()
    if (initialized) push('consent', 'update', { analytics_storage: 'granted' })
    captureAttribution(window.location.search)
    flushPage()
  } else {
    if (initialized) push('consent', 'update', { analytics_storage: 'denied' })
    storage('sessionStorage', 'removeItem', ATTRIBUTION_KEY)
    // Remove first-party GA cookies on withdrawal, including parent-domain cookies.
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim()
      if (!/^_ga(?:_|$)/.test(name)) continue
      const domains = ['', window.location.hostname, `.${window.location.hostname}`, '.michicho.com']
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`
    }
  }
  window.dispatchEvent(new Event('analytics-consent'))
}

function pageParameters() {
  const params = new URLSearchParams(attribution)
  return {
    ...Object.fromEntries(UTM_KEYS.map(key => [key, attribution[key] || '(not set)'])),
    device_type: deviceType(window.navigator),
    page_path: currentPage?.path || window.location.pathname,
    page_location: `${window.location.origin}${currentPage?.path || window.location.pathname}${params.size ? `?${params}` : ''}`,
    page_title: document.title,
    page_referrer: safeReferrer(document.referrer),
    ...(debug ? { debug_mode: true } : {}),
  }
}

function safeReferrer(referrer) {
  try { return new URL(referrer).origin } catch { return '' }
}

export function trackEvent(name, params = {}) {
  if (!consent || !initialized) return false
  window.gtag('event', name, { ...pageParameters(), ...params, send_to: measurementId })
  return true
}

function flushPage() {
  if (!currentPage || lastTrackedPage === currentPage.id || !consent) return
  if (!trackEvent('page_view')) return
  lastTrackedPage = currentPage.id
  if (/^\/theking\/?$/.test(currentPage.path)) trackEvent('landing_page_view')
}

export function trackPage(path, search = '') {
  captureAttribution(search)
  // React StrictMode repeats effects. Actual route changes still count on return.
  const id = path + search
  if (currentPage?.id !== id) {
    currentPage = { path, id }
    lastTrackedPage = null
  }
  if (getConsent() === 'granted' && !consent) setConsent('granted')
  flushPage()
}

export function trackPlatformClick(event, platform, url, navigate = href => window.location.assign(href)) {
  // Preserve native modified-click/new-tab behavior; dispatch synchronously first.
  const nativeNavigation = event.currentTarget?.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0
  if (nativeNavigation) {
    trackEvent('platform_click', { platform, transport_type: 'beacon' })
    return
  }
  event.preventDefault()
  let navigated = false
  let timer
  const finish = () => {
    if (navigated) return
    navigated = true
    clearTimeout(timer)
    navigate(url)
  }
  // Callback covers successful send; deadline covers blockers and slow networks.
  timer = setTimeout(finish, 1000)
  if (!trackEvent('platform_click', { platform, transport_type: 'beacon', event_callback: finish, event_timeout: 900 })) finish()
}

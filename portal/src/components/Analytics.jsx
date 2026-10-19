import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getConsent, setConsent, trackPage } from '../lib/analytics.js'

export default function Analytics() {
  const location = useLocation()
  const [choice, setChoice] = useState('pending')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const sync = () => setChoice(getConsent() || 'pending')
    const show = () => setOpen(true)
    sync()
    window.addEventListener('analytics-consent', sync)
    window.addEventListener('open-analytics-preferences', show)
    return () => {
      window.removeEventListener('analytics-consent', sync)
      window.removeEventListener('open-analytics-preferences', show)
    }
  }, [])
  useEffect(() => { trackPage(location.pathname, location.search) }, [location.pathname, location.search])
  function choose(value) { setConsent(value); setOpen(false) }
  return <>
    {!/^\/theking\/?$/.test(location.pathname) && <button className="analytics-settings" onClick={() => setOpen(true)}>Privacy settings</button>}
    {(choice === 'pending' || open) && <aside className="analytics-consent" aria-label="Analytics preferences">
      <div><strong>A little insight. A better game.</strong><p>Allow Google Analytics to measure visits and store clicks? Optional analytics uses cookies. Advertising tracking stays off.</p></div>
      <div className="analytics-actions">
        <button onClick={() => choose('denied')}>No thanks</button>
        <button onClick={() => choose('granted')}>Allow analytics</button>
        {open && <button onClick={() => setOpen(false)} aria-label="Close privacy settings">Close</button>}
      </div>
    </aside>}
  </>
}

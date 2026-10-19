import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { theKing, availablePlatforms, deviceType } from '../config/theKing.js'
import { trackPlatformClick, trackEvent } from '../lib/analytics.js'
import '../styles/theking.css'

function PlatformIcon({ platform }) {
  return <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    {platform === 'ios' ? <path d="M22 16c0-3 2-5 3-5-2-3-5-3-6-3-2 0-3 1-4 1s-3-1-5-1c-4 0-7 4-7 8 0 6 4 13 7 13 2 0 3-1 5-1s3 1 5 1c3 0 6-5 7-8-3-1-5-3-5-5ZM20 2c0 3-2 6-5 6 0-3 2-6 5-6Z" /> : platform === 'android' ? <path d="m6 3 15 13L6 29V3Zm17 11 5 3-5 3-3-3 3-3ZM8 2l17 10-4 3L8 2Zm0 28 13-12 4 3L8 30Z" /> : <><path d="m13 9 11 7-11 7V9Z"/><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2"/></>}
  </svg>
}

function StoreButtons({ device }) {
  const available = availablePlatforms(theKing.platforms, device)
  const keys = ['android', 'ios'].sort((a, b) => Number(b === device) - Number(a === device))
  const options = available.length ? available : keys.map(platform => ({ ...theKing.platforms[platform], platform, placeholder: true }))
  return <div className="king-stores" id="download">
    {options.map(({ platform, name, eyebrow, url, placeholder }, index) => placeholder
      ? <button key={platform} className={`king-store ${index === 0 ? 'king-store-primary' : ''}`} disabled aria-label={`${name} — coming soon`}>
          <PlatformIcon platform={platform}/><span><small>COMING SOON TO</small><strong>{name}</strong></span><span className="king-store-arrow" aria-hidden="true">↗</span>
        </button>
      : <a key={platform} className={`king-store ${index === 0 ? 'king-store-primary' : ''}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`} onClick={event => trackPlatformClick(event, platform, url)} onAuxClick={event => { if (event.button === 1) trackEvent('platform_click', { platform, transport_type: 'beacon' }) }}>
          <PlatformIcon platform={platform}/><span><small>{eyebrow}</small><strong>{name}</strong></span><span className="king-store-arrow" aria-hidden="true">↗</span>
        </a>)}
  </div>
}

export default function TheKingPage() {
  const [device, setDevice] = useState('other')
  useEffect(() => {
    setDevice(deviceType(navigator))
    const previousTitle = document.title
    document.title = theKing.title
    const entries = [
      ['meta[name="description"]', 'content', theKing.description],
      ['link[rel="canonical"]', 'href', theKing.canonical],
      ['meta[property="og:title"]', 'content', theKing.title],
      ['meta[property="og:description"]', 'content', theKing.description],
      ['meta[property="og:image"]', 'content', new URL(theKing.socialImage, theKing.canonical).href],
      ['meta[property="og:url"]', 'content', theKing.canonical],
      ['meta[property="og:type"]', 'content', 'website'],
      ['link[rel="icon"]', 'href', '/theking/favicon.png'],
    ]
    const restore = entries.map(([selector, attr, value]) => {
      let element = document.querySelector(selector)
      const existed = !!element
      if (!element) {
        element = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
        const [, name, content] = selector.match(/\[(.*?)="(.*?)"\]/)
        element.setAttribute(name, content)
        document.head.appendChild(element)
      }
      const old = element.getAttribute(attr)
      element.setAttribute(attr, value)
      return () => { if (!existed) element.remove(); else if (old === null) element.removeAttribute(attr); else element.setAttribute(attr, old) }
    })
    return () => { document.title = previousTitle; restore.forEach(fn => fn()) }
  }, [])

  return <div className="king-page">
    <a className="king-skip" href="#king-main">Skip to content</a>
    <header className="king-header">
      <Link className="king-studio" to="/"><img src="/icon-96.png" alt="" width="28" height="28"/>michicho<span className="king-studio-divider"/> <span className="king-studio-label">SMALL STUDIO. BIG BATTLES.</span></Link>
      <a className="king-header-cta" href="#download">YOUR KINGDOM AWAITS <span aria-hidden="true">↗</span></a>
    </header>
    <main id="king-main">
      <section className="king-hero" aria-labelledby="king-title">
        <div className="king-hero-copy">
          <div className="king-game-id"><img src="/theking/icon.webp" alt="THE KING game icon" width="62" height="62"/><div><span className="king-eyebrow">ACTION MEETS TOWER DEFENSE</span><p>THE KING <span> / </span> TOWER DEFENSE</p></div></div>
          <h1 id="king-title"><span className="king-title-name">THE KING</span><span>ONE KING.</span><span className="king-gold">THOUSANDS<br/>{' '}OF ENEMIES.</span></h1>
          <p className="king-hero-description">Ride into battle. Build your defenses.<br/>{' '}Survive the horde.</p>
          <StoreButtons device={device}/>
          <p className="king-release-note"><span/> Sharpen your arrows. Launching soon.</p>
        </div>
        <div className="king-hero-art">
          <div className="king-art-glow"/>
          <div className="king-keyart">
            {theKing.hero.video ? <video autoPlay muted loop playsInline controls poster={theKing.hero.image} width={theKing.hero.width} height={theKing.hero.height} onPlay={() => trackEvent('gameplay_video_play')} aria-label="THE KING gameplay"><source src={theKing.hero.video}/></video>
              : <img src={theKing.hero.image} alt={theKing.hero.alt} width={theKing.hero.width} height={theKing.hero.height} fetchpriority="high"/>}
            <span className="king-art-label">A KING. A BOW. AN ENTIRE ARMY.</span>
          </div>
          <div className="king-phone"><div className="king-phone-camera"/><img src="/theking/phone.webp" alt="Actual gameplay: the King and his towers face a massive enemy horde" width="600" height="1067"/><span>ACTUAL GAMEPLAY</span></div>
          <span className="king-art-spark king-art-spark-one" aria-hidden="true">✦</span><span className="king-art-spark king-art-spark-two" aria-hidden="true">✦</span>
        </div>
      </section>
      <div className="king-battle-strip" aria-hidden="true"><span>RIDE INTO BATTLE</span><i>✦</i><span>BUILD YOUR DEFENSES</span><i>✦</i><span>SURVIVE THE HORDE</span><i>✦</i></div>
      <section className="king-gameplay" aria-labelledby="king-gameplay-title">
        <div className="king-section-heading"><div><span className="king-eyebrow">THIS IS YOUR BATTLEFIELD</span><h2 id="king-gameplay-title">Big hordes. <span>Bigger energy.</span></h2></div><p>One brave King.<br/>A kingdom worth fighting for.</p></div>
        <div className="king-screenshots">{theKing.screenshots.slice(0, 3).map((shot, index) => <figure key={shot.src}>
          <div className="king-screenshot-image"><img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy"/><span>0{index + 1}</span></div>
          <figcaption><h3>{shot.caption}</h3><p>{shot.detail}</p></figcaption>
        </figure>)}</div>
      </section>
    </main>
    <footer className="king-footer"><Link to="/" className="king-footer-brand">michicho<span>Made for the joy of playing.</span></Link><div><Link to="/support">Support</Link><button onClick={() => window.dispatchEvent(new Event('open-analytics-preferences'))}>Privacy settings</button><a href="#download">THE KING ↑</a></div><span>© {new Date().getFullYear()} Michicho</span></footer>
  </div>
}

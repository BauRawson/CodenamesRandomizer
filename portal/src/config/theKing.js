// Set a verified listing URL and enable its platform when it is publicly live.
export const theKing = {
  canonical: 'https://michicho.com/theking',
  title: 'THE KING: Tower Defense | Michicho',
  description: 'One King. Thousands of enemies. Ride into battle, shoot arrows into enormous hordes, collect gold, and build defenses to protect your kingdom.',
  platforms: {
    android: { enabled: true, url: 'https://play.google.com/store/apps/details?id=com.wobbly.theking', name: 'Google Play', eyebrow: 'GET IT ON' },
    ios: { enabled: true, url: 'https://apps.apple.com/us/app/the-king-horde-defense/id6823861817', name: 'App Store', eyebrow: 'DOWNLOAD ON THE' },
    web: { enabled: false, url: '', name: 'Play on Web', eyebrow: 'PLAY ON POKI' },
  },
  // Add original game assets to public/theking/ and enter their paths here.
  // No invented gameplay or unrelated imagery is used when these are empty.
  logo: '',
  hero: { image: '/theking/hero.webp', video: '', alt: 'THE KING artwork: a mounted King draws his bow against a red enemy horde', width: 1024, height: 500 },
  screenshots: [
    { src: '/theking/horde.webp', alt: 'Enemy armies approach the King through a snowy battlefield', caption: 'Take on the horde.', detail: 'A thousand reasons to keep shooting.', width: 1000, height: 563 },
    { src: '/theking/boulder.webp', alt: 'The mounted King fights enemies alongside defensive towers', caption: 'Make every shot count.', detail: 'Ride, aim, and let the arrows fly.', width: 1000, height: 563 },
    { src: '/theking/snow.webp', alt: 'A giant boulder rolls through enemy soldiers on a snowy path', caption: 'Defend your kingdom.', detail: 'Build your defenses. Turn the tide.', width: 1000, height: 563 },
  ],
  socialImage: '/theking/social-card.png',
}

export function deviceType(nav = {}) {
  const ua = nav.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  if (/iPad|iPhone|iPod/i.test(ua) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1)) return 'ios'
  if (/Windows|Macintosh|Linux|CrOS/i.test(ua) && !/Mobile/i.test(ua)) return 'desktop'
  return 'other'
}

export function availablePlatforms(platforms, device) {
  const preferred = { android: 'android', ios: 'ios', desktop: 'web' }[device]
  const order = ['android', 'ios', 'web']
  if (preferred) order.sort((a, b) => Number(b === preferred) - Number(a === preferred))
  return order.filter(key => {
    try {
      const url = new URL(platforms[key].url)
      const host = { android: 'play.google.com', ios: 'apps.apple.com', web: 'poki.com' }[key]
      return platforms[key].enabled && url.protocol === 'https:' && (url.hostname === host || url.hostname.endsWith(`.${host}`))
    } catch { return false }
  }).map(key => ({ ...platforms[key], platform: key }))
}

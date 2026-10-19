import test from 'node:test'
import assert from 'node:assert/strict'
import { availablePlatforms, deviceType, theKing } from '../src/config/theKing.js'
import { campaignLink } from '../scripts/campaign-link.mjs'

test('detects Android, iPhone, desktop iPad mode, desktop, and unknown devices', () => {
  assert.equal(deviceType({ userAgent: 'Android Mobile' }), 'android')
  assert.equal(deviceType({ userAgent: 'iPhone' }), 'ios')
  assert.equal(deviceType({ userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 5 }), 'ios')
  assert.equal(deviceType({ userAgent: 'Windows NT 10' }), 'desktop')
  assert.equal(deviceType({}), 'other')
})

test('keeps release placeholders safe and prioritizes only available listings', () => {
  assert.deepEqual(availablePlatforms(theKing.platforms, 'desktop'), [])
  const platforms = {
    android: { enabled: true, url: 'https://play.google.com/store/apps/details?id=com.wobbly.theking' },
    ios: { enabled: true, url: 'https://apps.apple.com/app/id12345' },
    web: { enabled: true, url: 'https://poki.com/en/g/the-king' },
  }
  assert.equal(availablePlatforms(platforms, 'android')[0].platform, 'android')
  assert.equal(availablePlatforms(platforms, 'ios')[0].platform, 'ios')
  assert.equal(availablePlatforms(platforms, 'desktop')[0].platform, 'web')
  platforms.web.enabled = false
  assert.equal(availablePlatforms(platforms, 'desktop').length, 2)
  platforms.ios.url = 'javascript:alert(1)'
  assert.equal(availablePlatforms(platforms, 'ios').length, 1)
  platforms.android.url = 'https://play.google.com.evil.example/game'
  assert.equal(availablePlatforms(platforms, 'android').length, 0)
})

test('generates copyable, normalized marketing URLs without arbitrary query data', () => {
  assert.equal(campaignLink({ source: 'YouTube', campaign: 'launch', content: 'king_vs_10000_03' }), 'https://michicho.com/theking?utm_source=youtube&utm_medium=organic_social&utm_campaign=launch&utm_content=king_vs_10000_03')
  assert.throws(() => campaignLink({ source: 'person@example.com', campaign: 'launch', content: '1' }))
  assert.throws(() => campaignLink({ source: 'tiktok' }))
})

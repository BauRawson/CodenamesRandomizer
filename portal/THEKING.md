# THE KING landing page

The existing React/Vite portal serves `/theking`. GitHub Pages still publishes the tracked `docs/` directory; there is no new project, host, or dependency. `npm run build` at the repository root runs the existing portal and games builds. The portal build now also regenerates the sitemap from the public game catalog and prerenders THE KING's visible content, metadata, canonical URL, and VideoGame structured data into `docs/theking/index.html`. Social bots do not need JavaScript.

## Release configuration

Edit `portal/src/config/theKing.js`. Google Play and App Store are currently in review, so both buttons are intentionally disabled and say **Coming soon**. Poki is hidden. These disabled controls do not produce platform-click events.

When each listing is approved, put its **actual** HTTPS URL into `platforms.android.url` or `platforms.ios.url` and set that platform's `enabled` to `true`. Enable `platforms.web` only when publicly approved on Poki. URLs must use the corresponding official store domain. Available stores remain visible; Android/iOS users see their matching store first, and desktop sees Poki first when enabled. Visitors choose with a tap; there are no automatic redirects.

`hero.video` accepts the path to a future real gameplay MP4; the existing image becomes its poster. Optimize the file for mobile, retain `muted` and `playsInline`, and provide an actual gameplay poster when switching from artwork to video. Images and original asset provenance are in `public/theking/ASSETS.md`. The current feature graphic is marketing artwork; the phone and lower screenshots show actual gameplay. No fabricated gameplay is used.

## Analytics setup

The existing GA4 property **G-X1C2JD7GC3** is reused by default. To change it, set `VITE_GA_MEASUREMENT_ID` in `portal/.env.local` (see `.env.example`), then rebuild. An explicit empty or invalid ID disables loading. Do not put a Measurement Protocol API secret in the client.

**Required GA4 console setting:** Admin → Data streams → the web stream → Enhanced measurement → Page views → Advanced settings: disable page changes based on browser history events. This app sends its own route views. `send_page_view: false` disables the initial config view. Together these prevent duplicate initial/history views. Keep only one Google tag installation; the old inline tag was replaced rather than supplemented. For the leanest setup, disable unneeded enhanced-measurement events as well.

The shared analytics component measures each actual route transition once, including `/theking`. It avoids React StrictMode effect duplicates. It emits:

| Event | Meaning |
| --- | --- |
| `page_view` | One route view after consent; used by standard GA4 traffic reports |
| `landing_page_view` | A visit to `/theking` after consent |
| `platform_click` | An enabled Android, iOS, or web button was clicked; **not an install** |
| `gameplay_video_play` | Optional, emitted only when a configured video plays |

Landing and click events carry `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `device_type`, and `page_path`. Click events also carry `platform` (`android`, `ios`, `web`). Missing campaign fields are `(not set)`. Device values are `android`, `ios`, `desktop`, `other`; touchscreen iPads using desktop mode count as iOS.

Campaign labels are kept in memory during navigation and in session storage **after consent**, preserving attribution across internal navigation/reloads in the same tab. A newly tagged campaign replaces the old campaign completely, so a missing new content field cannot inherit an old video's ID. Without consent, attribution is not persisted. Only four validated campaign parameters are forwarded; arbitrary query strings and URL fragments are removed from explicit analytics page URLs, and the explicit referrer is reduced to its origin. Never put personal information in campaign labels. Native GA4 acquisition uses the sanitized landing URL's UTM parameters.

Store links call GA4 synchronously with beacon transport, then open the store in a new tab using the native link gesture. The original page stays alive so Google can deliver its event batch without delaying the visitor. Accessible labels announce the new tab. The helper also supports same-tab links with an event callback and a one-second fallback; current store links use new tabs because browser QA observed event loss during immediate same-tab navigation. Modified and middle clicks retain browser behavior. Delivery cannot be guaranteed with offline devices or blockers.

## Consent and privacy

The Google script does not load until the visitor chooses **Allow analytics**. Refusal leaves store navigation usable and sends no application analytics. Privacy settings lets a visitor change the choice later; withdrawal disables further events, removes session attribution and accessible first-party GA cookies. The same consent control covers the portal's existing game analytics. Previously collected data is not deleted by withdrawal.

Advertising consent stays denied, Google Signals and ad personalization are disabled, and no advertising pixels were added. Custom events include no names, emails, IP addresses, user IDs, or contact data. Google still receives network requests and manages analytics cookies when consent is granted. The consent choice itself is saved locally. Add an owner-reviewed privacy policy that identifies the GA4 provider, purpose, retention, and withdrawal process before public marketing; this UI is not a claim of universal legal compliance.

## Verify real delivery

1. Set `VITE_GA_DEBUG=true` in `portal/.env.local`, restart development or rebuild. Open `/theking?utm_source=tiktok&utm_medium=organic_social&utm_campaign=qa&utm_content=horde_01`.
2. In a fresh browser context, check Network: no Google tag or analytics collection request before consent. Choose Allow analytics.
3. In GA4 Admin → DebugView, inspect one `page_view` and one `landing_page_view`. Verify the four campaign parameters, `device_type`, and `/theking` page path. Alternatively use Reports → Realtime with debug mode off. If a developer-traffic exclusion filter is active, debug traffic may be excluded from ordinary reports.
4. Once a real listing is enabled, click its button. Inspect `platform_click` with all parameters before store navigation. Test a second source and content ID. Without live URLs, placeholders intentionally cannot send this event; unit tests and browser QA use temporary listing configuration without shipping it.
5. Check Network for `google-analytics.com/g/collect` (Google may batch events in the POST body). A successful request verifies transport, while DebugView/Realtime verifies property ingestion. Reload and navigate away/back to ensure counts make sense. Block Google requests and confirm outbound navigation still works. Decline or withdraw consent and confirm subsequent events stop.
6. Set debug back to false and rebuild before launch. GA4 property access is required to confirm its console settings, reports, and ingestion; no console configuration is performed by this repository.

Implementation follows Google's [page-view measurement](https://developers.google.com/analytics/devguides/collection/ga4/views), [Google tag API](https://developers.google.com/tag-platform/gtagjs/reference), and [consent guidance](https://developers.google.com/tag-platform/security/guides/consent).

## Campaign link generator

From the repository root:

```sh
npm --prefix portal run campaign -- --source youtube --campaign launch --content king_vs_10000_03
```

Output:

```text
https://michicho.com/theking?utm_source=youtube&utm_medium=organic_social&utm_campaign=launch&utm_content=king_vs_10000_03
```

Use `tiktok`, `youtube`, `instagram`, or `reddit` consistently for source, and one unique content ID per video. Medium defaults to `organic_social`; pass `--medium paid_social` for paid campaigns. Use letters, digits, underscores, and hyphens; labels normalize to lowercase. The script is developer-only and is not exposed in the page.

## Reporting: channels, videos, clicks, and conversion

In GA4 Admin → Custom definitions, create **event-scoped** dimensions with these exact event parameter mappings:

| Display name | Event parameter |
| --- | --- |
| King campaign source | `utm_source` |
| King campaign medium | `utm_medium` |
| King campaign | `utm_campaign` |
| King creative | `utm_content` |
| King destination | `platform` |
| King device | `device_type` |

For page filters, use GA4's built-in **Page path and screen class** dimension; `page_path` is sent as a native page parameter and does not need a custom definition. Use **King destination**, not GA4's built-in Platform dimension (which describes the stream and will say Web). These event-scoped campaign labels describe this implementation's latest tagged campaign in the tab. They are distinct from GA4's native session/first-user acquisition scopes. Registration is not retroactive; allow processing time before expecting ordinary reports. See Google's [custom dimensions guide](https://support.google.com/analytics/answer/14240153) and [traffic-source scopes](https://support.google.com/analytics/answer/11080067).

Create and save these explorations:

1. **Traffic by channel/video:** Reports → Acquisition → Traffic acquisition: use Session source/medium and filter landing page to `/theking` (including `/theking/`). For individual videos, use Session manual ad content, or a Free form exploration filtered to `event_name = landing_page_view`, rows King campaign source / King campaign / King creative, and values Event count and Total users.
2. **Store click performance:** Free form → rows King campaign source, King campaign, King creative; columns King destination; values Event count and Total users; filters Event name exactly `platform_click` and Page path and screen class matching `^/theking/?$`. Duplicate with King device as a row to compare mobile and desktop. This answers which channels/videos and stores get clicks.
3. **Visitor click conversion:** Closed Funnel exploration, step 1 `landing_page_view`, step 2 `platform_click`, indirectly followed by, both scoped to THE KING. Use a practical window such as 30 minutes and break down by King device or King campaign source. Completion rate is users progressing to a click, not installs. Use Total users with each event filter if calculating manually: distinct users who clicked / distinct landing users × 100. Event-count clicks / page views is a click-per-view ratio and can exceed 100%; do not call it visitor conversion. A user may click more than one store.

Optionally mark `platform_click` as a key event named “store click” for acquisition reporting. Do not name it an install or automatically attach monetary value. Exclude the clearly labeled `implementation_qa` campaign from production analysis. Consent refusals, blockers, and closed browsers create undercounting; reports represent measured visitors, not every visitor.

## Actual installs

Store-click tracking cannot observe what happens after leaving the website. For install measurement, integrate game-side analytics (for example Firebase `first_open`) and platform-supported attribution: Google Play Install Referrer with campaign/referrer propagation on Android; App Store Connect campaign links/analytics and Apple's supported attribution mechanisms on iOS. For cross-channel install attribution, assess an attribution provider and integrate its SDK/link handling with the game. This requires separate Android/iOS work and store configuration; respect platform consent and attribution limits. Do not match visitors using fingerprints. `first_open` measures an initial launch, which is distinct from a download.

## Checks

`npm --prefix portal test` covers consent gating, attribution continuity/replacement, clean page URLs, StrictMode view deduplication, device ordering including iPad, disabled platforms, callback/timeout navigation, and campaign-link generation. Browser QA uses the already installed local browser tooling without adding project dependencies. Run the repository's `npm run build` before committing the generated `docs/` output for GitHub Pages.

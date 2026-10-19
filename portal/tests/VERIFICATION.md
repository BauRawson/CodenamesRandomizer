# THE KING verification — 2026-10-19

- Full repository `npm run build` (portal, prerender, games, existing game-copy postbuild).
- `npm --prefix portal test`: seven passing tests.
- `git diff --check`.
- Headless Microsoft Edge, using already installed Playwright tooling without adding dependencies: inspected screenshots at 1440×1000, Android 390×844, iPhone 375×812, and 320×740. Inspected initial consent presentation as well as the page after a choice. No horizontal overflow, broken images, or page errors.
- Fixed mobile whitespace/line wrapping, removed artwork overlap, and moved the landing privacy control into the footer after inspecting the screenshots.
- Verified Android/iOS placeholder ordering and hidden Poki. Temporarily enabled fixture destinations in browser memory only to verify all available options and desktop Web-first ordering. Shipped configuration remains disabled with empty URLs.
- No Google analytics script or collection requests before consent. Choosing Allow loads the existing GA4 stream.
- Observed real `www.google-analytics.com/g/collect` requests carrying `page_view`, `landing_page_view`, and the actual button's `platform_click`, with `platform=android`, `utm_source=implementation_qa`, and the other configured campaign labels. Google batches some events in POST bodies; the assertion inspected the body as well as the URL.
- Same-tab navigation lost the platform event during QA. Native new-tab store links kept the page alive and passed the actual outbound-click delivery assertion without adding a visitor delay.
- Existing GA4 enhanced measurement also produced automatic `scroll` and `click` events. Disable unwanted enhanced measurements in the property for a lean setup, and disable history-based page views to avoid duplicating the app's manual route views.

Network transmission was verified; GA4 account access was not available to inspect DebugView/Realtime ingestion, register custom dimensions, change the stream settings, or save explorations. Those exact owner steps are in `../THEKING.md`. QA campaigns are labeled `implementation_qa`; filter them out of marketing reports. Some additional diagnostic events used `king_qa_probe` while investigating batching; they are not part of the shipped implementation.

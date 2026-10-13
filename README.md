# pingme.design

Design workspace for **PingMe**, a mobile app where vendors keep their clients posted on every service order. Customers and vendors use the same app and account; it runs in Customer mode or Vendor mode, and Profile switches between them.

## What's here

| Path | What it is |
|---|---|
| `index.html` + `app/` | Prototype site (replaces Figma): the app's screen flow as a tree on the left, phone preview in the centre, screen description on the right. |
| `screens/` | Redesigned app screens as HTML: `screens/auth/` (Onboarding & Auth), `screens/customer/` (Customer Home, Order Tracking, Shop Profile), `screens/vendor/` (Vendor Dashboard, Order Management, Revenue, Shop Settings) and `screens/shared/` (Notifications, Account). They share the UI kit in `screens/kit.css` and `screens/kit.js`; app screens also load `screens/app.css` (tab bar, cards, lists, sheets) and the sample orders in `screens/data.js`; vendor screens add `screens/vendor.js` (the shop's orders, kept for the browser session, plus the Update Status and Notify sheets). |
| `app/screens.js` | Screen registry and flow tree. The one place to update a screen's status, description, reference images and where it sits in the flow. |
| `docs/requirements/` | Requirements: [overview](docs/requirements/00-overview.md), one doc per module, and the [screen tracker](docs/requirements/README.md). |
| `design reference/` | Reference sketches the redesign starts from. |
| `scripts/build-tracker.mjs` | Regenerates the tracker and module screen sections from `app/screens.js`. |

## Run the prototype

Any static server works:

```sh
npx serve .        # or: python3 -m http.server
```

Then open the printed URL. Each screen has its own link (e.g. `/#VORD-04`); screens shared by both modes add the mode (e.g. `/#NOTI-01@vendor`). Use ↑/↓ to step through the flow in tree order, the carets to fold branches, and **Dev mode** for acceptance criteria and file paths.

On a phone the site shows only the app screen, full-screen, so it feels like the real app. Swipe left or right to move between screens, or open a screen link directly.

## Track progress

1. Set the screen's `status` in `app/screens.js` (`todo`, `reference`, `design`, `done`).
2. When a redesigned screen exists as HTML, set its `html` path; the phone shows it instead of the reference image.
3. Run `node scripts/build-tracker.mjs` and commit.

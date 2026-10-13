# PingMe: product overview

## The idea

PingMe is a mobile app that lets a service vendor keep their clients informed. A laundry, tailor, repair shop or on-site technician logs each job in PingMe, and every time the job moves forward the client gets a ping: a push notification in the app, or an SMS with a tracking link if they don't have it installed. Clients stop calling to ask "is it ready yet?", and vendors stop answering that question.

## One app, two modes

Customers and vendors download the **same PingMe app** and sign up with the **same form**. The app then runs in one of two modes:

| Mode | Who | What they do |
|---|---|---|
| **Customer mode** | Everyone | Sees all their orders across vendors, follows each one live, gets notified, shows a QR at pickup, rates the vendor. |
| **Vendor mode** | Accounts that own (or staff) a shop | Creates orders, captures proof photos, moves orders through statuses, messages clients, hands over at pickup, watches revenue. |
| **Guest customer** | No app | Follows an order through the SMS tracking link (web page). |

- Every account can be a customer. Adding a shop (at sign-up, or later from Profile) turns on Vendor mode for that account.
- Sign In opens the mode used last. Profile switches modes: Switch to Vendor in Customer mode, Switch to Customer in Vendor mode (Shop tab › Account).
- Notifications, Profile, Help and Shop Profile are shared screens: each shows the version for the mode it was opened from.
- The full screen flow is the tree in the prototype's left panel and in the [tracker](README.md#app-flow).

## Core flow

```
Vendor creates order ──► customer gets SMS link / push
        │
        ▼
Created ──► In Progress ──► Ready for Pickup ──► Completed (picked up)
   │             │                 │                    │
   └── each step pings the customer, with an optional vendor note ──┘
```

On-site services (e.g. HVAC) use the same lifecycle with an extra QC step and an assigned technician: `Received → In Progress → QC → Done`.

## Order statuses

| Status | Set by | Customer sees |
|---|---|---|
| Draft | Vendor saves without generating QR | Nothing |
| Created | Vendor generates the order QR | "Order created" with tracking link |
| In Progress | Vendor taps Start Work | "Your order is being processed" + note |
| Ready | Vendor taps Mark Ready | "Ready for pickup" + pickup QR |
| Completed | Vendor scans pickup QR or taps Mark as Picked Up | Receipt + rating prompt |
| Cancelled | Vendor, or customer before In Progress | Cancellation notice |

## Notification channels

1. **Push** when the customer has the app and has claimed the order.
2. **SMS** with a tracking link when they don't (or as a fallback the vendor turns on).
3. **In-app inbox** keeps every ping for both roles.

## Modules

Requirements are split into modules so each can be designed and built on its own. Screen IDs (e.g. `VORD-04`) are used in the docs, the prototype site and commits.

| # | Module | Role | Doc |
|---|---|---|---|
| 1 | Onboarding & Auth (`AUTH`) | Get started | [01-onboarding-auth.md](01-onboarding-auth.md) |
| 2 | Customer Home (`CHOME`) | Customer mode | [02-customer-home.md](02-customer-home.md) |
| 3 | Order Tracking (`CTRK`) | Customer mode (+ web link) | [03-customer-order-tracking.md](03-customer-order-tracking.md) |
| 4 | Shop Profile (`SHOP`) | Both modes (owner view in Vendor mode) | [04-shop-profile.md](04-shop-profile.md) |
| 5 | Notifications (`NOTI`) | Both modes | [05-notifications.md](05-notifications.md) |
| 6 | Vendor Dashboard (`VHOME`) | Vendor mode | [06-vendor-dashboard.md](06-vendor-dashboard.md) |
| 7 | Order Management (`VORD`) | Vendor mode | [07-vendor-orders.md](07-vendor-orders.md) |
| 8 | Revenue & Analytics (`VREV`) | Vendor mode | [08-vendor-revenue.md](08-vendor-revenue.md) |
| 9 | Shop Settings (`VSHOP`) | Vendor mode | [09-vendor-shop-settings.md](09-vendor-shop-settings.md) |
| 10 | Account (`ACCT`) | Both modes | [10-account.md](10-account.md) |

Screen-by-screen status lives in the [tracker](README.md).

## Suggested build order

1. **MVP:** AUTH, VORD (create, list, status, details), CTRK-01 and CTRK-05 (tracking + SMS link), CHOME-01, NOTI-01.
2. **Next:** VHOME, SHOP, CTRK-04 ratings, VSHOP-02 Customer Messaging, VORD-06 pickup scan.
3. **Later:** VREV analytics, on-site service flow (CTRK-02, VSHOP-03 technicians), ACCT-02 support.

## Notes on the references

- The screenshots in `design reference/` are sketches from different tools and styles (two vendor dashboards, several sign-in variants). They are the starting point for a redesign, not final designs.
- Brand colour in the references is teal; the prototype site uses the same accent.
- `design reference/Screenshot 2026-10-13 135519.png` (Vestech) is the layout reference for the prototype website, not an app screen.
- `design reference/Customer/Screenshot 2026-10-11 110557.png` (Canva "Animate" panel) is treated as a reference for the splash/intro animation (AUTH-01).

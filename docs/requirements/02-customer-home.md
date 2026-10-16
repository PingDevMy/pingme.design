# 02 · Customer Home (`CHOME`)

**Role:** Customer · **Goal:** one place to see every order the customer has with any vendor and how far along each one is.

## Requirements

- **CHOME-R1** Home lists all orders linked to the customer's phone number, across all vendors.
- **CHOME-R2** Orders are split into Pending (Created, In Progress, Ready) and Completed (Completed, Cancelled).
- **CHOME-R3** Each card shows vendor, service, status, step X of Y and percent complete, updated live.
- **CHOME-R4** "Track Your Order Now" opens the most recently updated active order.
- **CHOME-R5** A customer can claim an order by scanning the vendor's QR or typing its code, for orders created without their phone number.

## Open questions

- ~~Should the centre bottom-nav button be Scan, or a shortcut to the notification inbox?~~ Decided: the tab bar matches Vendor mode's five slots (Home, Orders, Scan in the raised centre, Inbox, Profile).

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `CHOME-01` Home · 🔵 In design

Customer landing screen: a greeting, how many orders are active, and each order's progress.

- Greeting 'Hi {name}' and 'Manage your active service order here'
- Active tracking card: count of active orders
- Track Your Order Now (opens the most recent active order)
- Your Order list with Pending / Completed tabs
- Each order card: vendor, service, status pill, step X of Y, % complete, order number, date, Details
- Bottom tab bar (same layout as Vendor mode): Home, Orders, Scan (raised centre), Inbox, Profile

**Pings:**

- Card updates live when the vendor changes status

**Acceptance:**

- [ ] Empty state explains that orders appear when a vendor adds your phone number
- [ ] Pull to refresh

> Tap a card or Track Your Order Now to open tracking. A few seconds after opening, The Tailor Studio starts an order to show a live update. Pull down to refresh; the link under the list previews the empty state.

Reference: [1](../../design%20reference/Customer/Screenshot%202026-10-13%20134146.png)

### `CHOME-02` Scan Order QR · 🔵 In design

Customer scans the QR on a vendor's receipt to claim an order into their app.

- Camera viewfinder with torch toggle
- Manual entry fallback for the order code (e.g. PINGME-1204-X99)
- Success sheet showing the claimed order

**Acceptance:**

- [ ] An order can only be claimed by one customer account

> Tap the viewfinder to simulate a scan. Under Enter order code, any code like PINGME-1204-X99 works; a code ending in TAKEN shows the already-claimed error.

<!-- screens:end -->

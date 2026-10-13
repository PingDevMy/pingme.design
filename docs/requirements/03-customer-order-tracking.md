# 03 · Order Tracking (`CTRK`)

**Role:** Customer (and guests via web link) · **Goal:** the customer always knows where their order is and what happens next, without calling the vendor.

## Requirements

- **CTRK-R1** Tracking shows the full status timeline with a timestamp per step and the vendor's latest note.
- **CTRK-R2** Drop-off orders show the vendor's location with Navigate (opens maps), call and chat.
- **CTRK-R3** When the order is Ready, the screen shows the pickup QR the vendor will scan.
- **CTRK-R4** On-site services show the assigned technician, an ETA/countdown and a recent-updates feed.
- **CTRK-R5** Customer can reschedule or cancel an on-site service until it is In Progress.
- **CTRK-R6** After completion the customer is asked once to rate the vendor.
- **CTRK-R7** The SMS link opens a public web page with the same timeline, no login required. The link token is unguessable and expires 30 days after completion.

## Open questions

- Is in-app chat in scope for MVP, or do call and SMS cover it?
- Payment: is "Paid" only recorded by the vendor, or will customers pay in-app?

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `CTRK-01` Order Tracking (drop-off) · 🟠 Reference only

Live status of a drop-off order such as laundry or tailoring.

- Estimated ready time
- Vendor card: name, address, call and chat buttons, Navigate, View Shop
- Order lifecycle: Order Created, Processing Service, Ready for Pickup, Order Completed with timestamps
- Vendor's latest note, e.g. 'You will be notified once ready for pickup'
- Pickup QR to show at the counter once status is Ready

**Pings:**

- Push on every status change
- Push when the order is Ready for Pickup

**Acceptance:**

- [ ] Timeline matches the vendor's status history exactly

Reference: [1](../../design%20reference/Customer/Screenshot%202026-10-13%20134157.png)

### `CTRK-02` Service Status (on-site) · 🟠 Reference only

Live status of an on-site service, such as an HVAC repair, with the assigned technician.

- Stepper: Received, In Progress, QC, Done
- Estimated completion countdown
- Technician card with rating, chat and call
- Recent updates feed with times
- Service information: vendor, service type, location
- 'Need to change?' Manage (reschedule or cancel)
- Tabs: Status, History, Support

**Pings:**

- Push when a technician is assigned, on the way, and on arrival

**Acceptance:**

- [ ] Cancel is only allowed before In Progress

Reference: [1](../../design%20reference/Customer/Screenshot%202026-10-13%20134224.png)

### `CTRK-03` Order History · ⚪ Not started

All past orders, searchable, with re-order and rating.

- List grouped by month with vendor, service, amount and final status
- Search by vendor or order number
- Rate the vendor on completed orders that are not yet rated

### `CTRK-04` Rate & Review · ⚪ Not started

Customer rates a completed order and leaves feedback for the vendor.

- Star rating, optional text, optional photo
- Prompted once after the order is completed

**Acceptance:**

- [ ] One review per order; editable for 7 days

### `CTRK-05` Public Tracking Link (web) · ⚪ Not started

Web page the SMS link opens, so customers without the app can still follow an order.

- Order number, vendor, current status and timeline
- Banner inviting the customer to install PingMe

**Acceptance:**

- [ ] Link is unguessable and stops working 30 days after completion

<!-- screens:end -->

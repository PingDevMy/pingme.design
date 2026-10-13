# 07 · Order Management (`VORD`)

**Role:** Vendor · **Goal:** log a job in seconds, move it through its steps with one tap, and let PingMe tell the customer.

## Requirements

- **VORD-R1** Creating an order needs a title, service category and either a customer phone number or nothing (customer claims by QR later).
- **VORD-R2** Generating the order creates a unique order number, a QR code and a short code (e.g. `PINGME-1204-X99`).
- **VORD-R3** Proof photos can be attached at drop-off and during service; each photo stores its capture time.
- **VORD-R4** The list filters by status and shows the next action for each order (Start Work, Mark Ready, Complete).
- **VORD-R5** Any status change can carry a note; the customer receives status and note together.
- **VORD-R6** Notify sends a message without changing status, from a template or free text.
- **VORD-R7** Pickup is confirmed by scanning the customer's QR or tapping Mark as Picked Up; both move the order to Completed.
- **VORD-R8** Every action (status, message, photo, payment) is written to the order's activity log.
- **VORD-R9** Drafts are visible only to the vendor and never notify.

## Data

Order: id, number, shop id, title, category, customer name, customer phone, customer user id (once claimed), items/quantity, unit price, total, paid amount, status, status history [status, note, by, at], photos [url, captured at], QR token, created at.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `VORD-01` Order List · 🔵 In design

Every order the vendor is handling, filtered by status, with one-tap actions.

- Filter chips: All, Created, In Progress, Ready, Completed
- Total count and sort by date
- Order card: number, item, category tag, customer, status pill
- Notify button (send a message to the customer)
- Next-step button that changes with status: Start Work, Mark Ready, Complete
- Search and floating + Create Order

**Pings:**

- Start Work, Mark Ready and Complete each send the customer a push or SMS

**Acceptance:**

- [ ] The next-step button moves the order forward one step and updates the card in place

> Start Work, Mark Ready and Complete move the order one step and update the card in place. Notify opens the Notify Customer sheet. Search is behind the magnifier; changes carry over to the dashboard and order details.

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134456.png)

### `VORD-02` Update Status Sheet · 🔵 In design

Bottom sheet to set any status and attach a note the customer will see.

- Status options: Received, In Progress, Ready to Collect, each with a short explanation
- Optional status note, e.g. 'Technician started the diagnostic process'
- Update Status and Cancel

**Pings:**

- Customer gets the new status and the note

> Opens over the current order. The same sheet is used from Order Details (Update Status).

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134505.png)

### `VORD-03` Notify Customer Sheet · 🔵 In design

Send a free-text or template message to the customer without changing status.

- Templates from Customer Messaging (e.g. 'Running 30 min late')
- Channel shown: push if the customer has the app, SMS otherwise
- Message preview before sending

**Pings:**

- The message itself

**Acceptance:**

- [ ] Sent messages appear in the order's activity log

> Opens over the current order. Pick a quick reply or type; the channel line says Push or SMS. Sent messages land in the activity log. The same sheet is used from the order list and details.

### `VORD-04` Create New Order · 🔵 In design

Vendor logs a new job, captures proof photos and generates the order QR.

- Order title
- Customer details: full name and phone number
- Service category: Laundry, Tailoring, Repair (mandatory)
- Quantity and unit price
- Upload item proof: photo of the item's condition at drop-off
- Generate Order QR, Save as Draft

**Pings:**

- Customer gets an SMS tracking link when a phone number is given

**Acceptance:**

- [ ] Generating creates a unique order number and QR code
- [ ] Drafts do not notify the customer

> Title and category are required; customer details are optional (the customer can claim by QR). Add photo opens the camera or a file picker. Generate QR shows the new code; Save as Draft notifies nobody.

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134432.png)

### `VORD-05` Order Details · 🔵 In design

Everything about one order: customer, payment, pickup QR, proof photo and activity.

- Header card: service, category, status, customer, items and weight, paid amount, date
- Pickup QR code and code text, Share Link
- Mark as Picked Up
- Service proof image with capture time
- Activity log of every status change and message

**Acceptance:**

- [ ] Mark as Picked Up is only available when status is Ready

> Mark as Picked Up is enabled only when the order is Ready. Try the sample orders from the list: Wash & press (Ready), Silk suit (In Progress), Baju Melayu (Draft).

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134450.png)

### `VORD-06` Scan Pickup QR · 🔵 In design

Vendor scans the customer's QR at the counter to confirm handover.

- Camera viewfinder, manual code entry
- Confirms the order and marks it Picked Up

**Pings:**

- Customer gets an 'Order collected' receipt

**Acceptance:**

- [ ] Scanning a QR from another shop shows an error

> Tap the viewfinder to scan the first Ready order's pass. Enter pickup code accepts e.g. PINGME-1198-X99; the link at the bottom shows the other-shop error.

<!-- screens:end -->

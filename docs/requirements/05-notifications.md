# 05 · Notifications (`NOTI`)

**Role:** Both modes · **Goal:** the "ping" in PingMe. Every meaningful change reaches the right person on the right channel, and nothing is lost.

## Events

| Event | Customer | Vendor |
|---|---|---|
| Order created | SMS link / push | – |
| Status changed (+ note) | Push / SMS | – |
| Ready for pickup | Push / SMS (cannot be muted entirely) | – |
| Vendor message (Notify) | Push / SMS | – |
| Order completed / picked up | Push receipt + rating prompt | – |
| Order claimed by customer | – | In-app |
| Customer reply | – | Push (cannot be muted entirely) |
| Payment settled | – | Email |
| New review | – | Push |
| Customer cancelled / rescheduled | – | Push |

## Requirements

- **NOTI-R1** Push is used when the customer has the app and owns the order; otherwise SMS with the tracking link.
- **NOTI-R2** Every notification is also stored in the in-app inbox and the order's activity log.
- **NOTI-R3** Message text comes from the vendor's Customer Messaging templates (VSHOP-02), with PingMe defaults.
- **NOTI-R4** Users can set channels per event and quiet hours; Ready for pickup (customer) and customer replies (vendor) always keep at least one channel.
- **NOTI-R6** The inbox and preferences are one pair of screens shared by both modes. Each mode shows its own events: a shop owner's own orders from other shops stay in Customer mode, their shop's pings in Vendor mode.
- **NOTI-R5** SMS sending is rate-limited per order to avoid spamming customers.

## Open questions

- SMS provider and who pays for SMS (vendor credits? plan limit?).
- WhatsApp as a channel?

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `NOTI-01` Notification Inbox · 🔵 In design

Every ping a user has received, newest first, with unread markers.

- Customer mode: the Inbox tab. Vendor mode: opened from the bell on the dashboard, with a back button
- Grouped Today / Earlier, unread dot, mark all as read
- Tapping opens the related order
- Customer mode: status changes and shop messages. Vendor mode: customer replies, claimed orders, payments, new reviews

**Acceptance:**

- [ ] Bell icon badge equals unread count
- [ ] Each mode shows only its own pings; back returns to that mode's home

> Shows the inbox of the mode it was opened from. Customer: a ping opens its order and the rating ping opens Rate & Review. Vendor: a ping opens the order, the payment or the reviews.

### `NOTI-02` Notification Preferences · 🔵 In design

User chooses which pings arrive by push, SMS or email.

- Per-event toggles for push, SMS and email, with events for the current mode
- Quiet hours

**Acceptance:**

- [ ] Order-ready pings (customer) and customer replies (vendor) cannot be fully turned off (at least one channel)

> Customer mode is opened from Profile, Vendor mode from the Shop tab. Try turning off both channels for Ready for pickup.

<!-- screens:end -->

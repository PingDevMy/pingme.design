# 05 · Notifications (`NOTI`)

**Role:** Shared · **Goal:** the "ping" in PingMe. Every meaningful change reaches the right person on the right channel, and nothing is lost.

## Events

| Event | Customer | Vendor |
|---|---|---|
| Order created | SMS link / push | – |
| Status changed (+ note) | Push / SMS | – |
| Ready for pickup | Push / SMS (cannot be muted entirely) | – |
| Vendor message (Notify) | Push / SMS | – |
| Order completed / picked up | Push receipt + rating prompt | – |
| Order claimed by customer | – | In-app |
| New review | – | Push |
| Customer cancelled / rescheduled | – | Push |

## Requirements

- **NOTI-R1** Push is used when the customer has the app and owns the order; otherwise SMS with the tracking link.
- **NOTI-R2** Every notification is also stored in the in-app inbox and the order's activity log.
- **NOTI-R3** Message text comes from the vendor's Customer Messaging templates (VSHOP-02), with PingMe defaults.
- **NOTI-R4** Users can set channels per event and quiet hours; Ready for pickup always keeps at least one channel.
- **NOTI-R5** SMS sending is rate-limited per order to avoid spamming customers.

## Open questions

- SMS provider and who pays for SMS (vendor credits? plan limit?).
- WhatsApp as a channel?

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `NOTI-01` Notification Inbox · 🔵 In design

Every ping a user has received, newest first, with unread markers.

- Grouped Today / Earlier, unread dot, mark all as read
- Tapping opens the related order
- Customer: status changes and vendor messages. Vendor: new reviews, claimed orders, customer replies

**Acceptance:**

- [ ] Bell icon badge equals unread count

> Customer view. Tapping a ping opens its order; the rating ping opens Rate & Review. The unread count matches the bell badge on Home.

### `NOTI-02` Notification Preferences · 🔵 In design

User chooses which pings arrive by push, SMS or email.

- Per-event toggles for push, SMS and email
- Quiet hours

**Acceptance:**

- [ ] Order-ready pings cannot be fully turned off (at least one channel)

> Customer view. Try turning off both channels for Ready for pickup.

<!-- screens:end -->

# 10 · Account (`ACCT`)

**Role:** Both modes · **Goal:** manage personal details, switch between Customer and Vendor mode and get help.

## Requirements

- **ACCT-R1** Edit name, photo and email; changing phone requires a new security code.
- **ACCT-R2** Profile is the one place to switch modes: Switch to Vendor (Customer mode) or Switch to Customer (Vendor mode). Switching keeps the user signed in and opens that mode's home.
- **ACCT-R5** An account without a shop sees "Run a shop?" instead of the switch, which opens Set Up Your Shop (AUTH-07).
- **ACCT-R6** In Customer mode Profile is a tab. In Vendor mode it opens from the Shop tab as Account, keeping the vendor tab bar.
- **ACCT-R3** Sign out, and delete account with confirmation plus security code.
- **ACCT-R4** Help & Support has an FAQ and a contact form that can reference an order.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `ACCT-01` Profile · 🔵 In design

User's own details and entry point to settings.

- Photo, name, phone, email, edit
- Mode badge and a switch card: Switch to Vendor, Switch to Customer, or Run a shop? when the account has no shop yet
- Customer mode: it's the Profile tab. Vendor mode: opened from the Shop tab as Account, with the vendor tab bar
- Links: Order history (Customer mode), Notifications, Notification preferences, Help & Support, Privacy, Terms
- Sign out, delete account

**Acceptance:**

- [ ] Delete account asks for confirmation and a security code
- [ ] Switching mode keeps the user signed in and opens that mode's home

> Shows the mode it was opened from. After signing up without a shop, the card offers Run a shop? instead. Delete account asks for confirmation, then a security code (000000 is treated as wrong).

### `ACCT-02` Help & Support · 🔵 In design

FAQ and a way to contact PingMe support.

- Searchable FAQ, including how to switch modes
- Contact form with order picker (your orders in Customer mode, your shop's orders in Vendor mode)

> Search filters the FAQ. The order picker hides for topics that aren't about an order.

<!-- screens:end -->

# 10 · Account (`ACCT`)

**Role:** Shared · **Goal:** manage personal details, switch roles and get help.

## Requirements

- **ACCT-R1** Edit name, photo and email; changing phone requires a new security code.
- **ACCT-R2** Accounts with both roles can switch between Customer and Vendor from Profile.
- **ACCT-R3** Sign out, and delete account with confirmation plus security code.
- **ACCT-R4** Help & Support has an FAQ and a contact form that can reference an order.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `ACCT-01` Profile · 🔵 In design

User's own details and entry point to settings.

- Photo, name, phone, email, edit
- Switch to Vendor / Customer when the account has both roles
- Links: Notification preferences, Help & Support, Privacy, Terms
- Sign out, delete account

**Acceptance:**

- [ ] Delete account asks for confirmation and a security code

> Customer view. Delete account asks for confirmation, then a security code (000000 is treated as wrong).

### `ACCT-02` Help & Support · 🔵 In design

FAQ and a way to contact PingMe support.

- Searchable FAQ
- Contact form with order picker

> Search filters the FAQ. The order picker hides for topics that aren't about an order.

<!-- screens:end -->

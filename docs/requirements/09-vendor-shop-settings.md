# 09 · Shop Settings (`VSHOP`)

**Role:** Vendor · **Goal:** control what customers see and what PingMe says on the vendor's behalf.

## Requirements

- **VSHOP-R1** Vendor edits logo, name, category, description, address, opening hours and services with default prices.
- **VSHOP-R2** Customer Messaging holds one auto-message per status and a list of quick-reply templates, with placeholders `{customer}`, `{order}`, `{shop}`, `{eta}`.
- **VSHOP-R3** Vendor can turn the SMS fallback on or off.
- **VSHOP-R4** Vendor can invite staff and technicians; technicians can be assigned to on-site orders and update their status.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `VSHOP-01` Edit Shop Profile · 🔵 In design

Vendor edits what customers see on the Shop Profile.

- Logo, cover, name, category, description
- Address with map pin, opening hours per day
- Services offered with default prices

**Acceptance:**

- [ ] Changes show on the public Shop Profile immediately

> This is the Shop tab. Edits enable Save; Preview opens the public Shop Profile. Settings links to Customer Messaging, Staff, Notification preferences and Account (where you switch to Customer mode).

### `VSHOP-02` Customer Messaging · 🔵 In design

Vendor sets the automatic messages sent at each status change, plus quick-reply templates.

- One message per status (Created, In Progress, Ready, Completed) with placeholders like {customer} and {order}
- Toggle SMS fallback for customers without the app
- Quick-reply templates used by the Notify sheet

**Acceptance:**

- [ ] Preview shows the message as the customer will see it

> Pick a status to edit its message; placeholder chips insert at the cursor and the preview fills them in. Quick replies here are the ones offered in the Notify sheet.

### `VSHOP-03` Staff & Technicians · 🔵 In design

Vendor invites staff and assigns technicians to on-site jobs.

- Invite by phone, role (Admin, Staff, Technician), remove

> Invite by phone with a role. Tap a member to change role or remove them; the owner row is fixed.

<!-- screens:end -->

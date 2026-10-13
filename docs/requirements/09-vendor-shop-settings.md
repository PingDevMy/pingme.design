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

### `VSHOP-01` Edit Shop Profile · ⚪ Not started

Vendor edits what customers see on the Shop Profile.

- Logo, cover, name, category, description
- Address with map pin, opening hours per day
- Services offered with default prices

**Acceptance:**

- [ ] Changes show on the public Shop Profile immediately

### `VSHOP-02` Customer Messaging · ⚪ Not started

Vendor sets the automatic messages sent at each status change, plus quick-reply templates.

- One message per status (Created, In Progress, Ready, Completed) with placeholders like {customer} and {order}
- Toggle SMS fallback for customers without the app
- Quick-reply templates used by the Notify sheet

**Acceptance:**

- [ ] Preview shows the message as the customer will see it

### `VSHOP-03` Staff & Technicians · ⚪ Not started

Vendor invites staff and assigns technicians to on-site jobs.

- Invite by phone, role (Admin, Staff, Technician), remove

<!-- screens:end -->

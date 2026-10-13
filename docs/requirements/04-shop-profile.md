# 04 · Shop Profile (`SHOP`)

**Role:** Customer view, with an owner view for the vendor · **Goal:** build trust in the vendor through location, hours and reviews.

## Requirements

- **SHOP-R1** Shows logo, name, category, open/closed state (from opening hours), address and hours.
- **SHOP-R2** Shows average rating, review count and a 5-to-1 star breakdown.
- **SHOP-R3** Only customers with a completed order at the shop can review it.
- **SHOP-R4** The vendor sees the same page plus edit, Manage All Reviews and Customer Messaging.
- **SHOP-R5** Vendors can reply publicly to reviews, but cannot delete them.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `SHOP-01` Shop Profile · 🔵 In design

Public page for a vendor: who they are, where they are, and what customers say.

- Logo, shop name, category, Open now / Closed badge
- Address and opening hours
- Social proof: average rating, review count, 5-to-1 star breakdown
- Recent feedback with name, rating, text, time and Helpful
- Owner view adds edit, Manage All Reviews and Customer Messaging

**Acceptance:**

- [ ] Customer sees the same page without the owner controls

> Shows the shop of the picked order. Open / Closed follows the real time of day against opening hours. The link at the bottom shows the owner view.

Reference: [1](../../design%20reference/Customer/Screenshot%202026-10-13%20134211.png)

### `SHOP-02` All Reviews · 🔵 In design

Full list of reviews with filters by star rating.

- Filter chips: All, 5, 4, 3, 2, 1, With photos
- Vendor can reply publicly to a review (owner view)

> The link at the bottom shows the owner view, where unanswered reviews get a public Reply.

<!-- screens:end -->

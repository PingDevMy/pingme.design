# 06 · Vendor Dashboard (`VHOME`)

**Role:** Vendor · **Goal:** at a glance, how is the business doing today and what needs attention.

## Requirements

- **VHOME-R1** Shows this month's revenue and change versus last month.
- **VHOME-R2** Shows counters for Active Orders and Ready for Pickup; each opens Order Management filtered.
- **VHOME-R3** Lists the most recent orders with status and amount; Manage opens the order.
- **VHOME-R4** A floating + button creates a new order from anywhere on the dashboard.

## Open questions

- Two references exist (The Iron Press, ServiceHub). Which direction should the redesign follow? ServiceHub adds rating and a weekly sales chart.
  - Current design (VHOME-01) merges them: The Iron Press layout with ServiceHub's rating and a 7-day sales chart added. Confirm before marking Done.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `VHOME-01` Dashboard · 🔵 In design

Vendor landing screen: revenue this month, workload, and the latest orders.

- Shop name and rating header, with pickup scan and notifications
- Monthly revenue with change versus last month
- Counters: Active Orders, Ready for Pickup
- Recent orders: customer, order number, service, items, status pill, amount, Manage
- Raised + button in the tab bar to Create New Order
- Rating and sales over the last 7 days (from the ServiceHub sketch)
- Bottom tab bar (same layout as Customer mode): Home, Orders, New (raised centre), Revenue, Shop

**Acceptance:**

- [ ] Counters tap through to Order Management with the matching filter

> The redesign merges both sketches: The Iron Press layout (revenue, two counters, recent orders) plus ServiceHub's rating and a 7-day sales chart. Counters and View all open Orders pre-filtered; tap a bar for that day's sales. The raised + in the tab bar creates an order from any tab.

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134513.png) · [2](../../design%20reference/vendor/Screenshot%202026-10-13%20134527.png)

<!-- screens:end -->

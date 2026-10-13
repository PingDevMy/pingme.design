# 06 · Vendor Dashboard (`VHOME`)

**Role:** Vendor · **Goal:** at a glance, how is the business doing today and what needs attention.

## Requirements

- **VHOME-R1** Shows this month's revenue and change versus last month.
- **VHOME-R2** Shows counters for Active Orders and Ready for Pickup; each opens Order Management filtered.
- **VHOME-R3** Lists the most recent orders with status and amount; Manage opens the order.
- **VHOME-R4** A floating + button creates a new order from anywhere on the dashboard.

## Open questions

- Two references exist (The Iron Press, ServiceHub). Which direction should the redesign follow? ServiceHub adds rating and a weekly sales chart.

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `VHOME-01` Dashboard · 🟠 Reference only

Vendor landing screen: revenue this month, workload, and the latest orders.

- Shop name header with settings
- Monthly revenue with change versus last month
- Counters: Active Orders, Ready for Pickup
- Recent orders: customer, order number, service, items, status pill, amount, Manage
- Floating + button to Create New Order
- Bottom nav: Dash, Orders, Shop

**Acceptance:**

- [ ] Counters tap through to Order Management with the matching filter

> Two dashboard sketches exist (The Iron Press and ServiceHub). The redesign should merge them into one.

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134513.png) · [2](../../design%20reference/vendor/Screenshot%202026-10-13%20134527.png)

<!-- screens:end -->

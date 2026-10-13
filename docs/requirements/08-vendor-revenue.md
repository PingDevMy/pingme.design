# 08 · Revenue & Analytics (`VREV`)

**Role:** Vendor · **Goal:** see what the shop earns and export it.

## Requirements

- **VREV-R1** Range selector: Today, 7 days, 30 days, All time.
- **VREV-R2** Totals: revenue, net earnings, total orders, average order value, fees and taxes, with change versus the previous period.
- **VREV-R3** Daily revenue chart for the selected range.
- **VREV-R4** Transactions list with status (Settled, Processing) linking to the order.
- **VREV-R5** Download Report exports the selected range as CSV.

## Open questions

- Where do fees and taxes come from if payment happens outside the app?

## Screens

<!-- screens:start -->
<!-- Generated from app/screens.js by scripts/build-tracker.mjs -->

### `VREV-01` Revenue Analytics · 🔵 In design

How much the shop earned and from which orders.

- Range chips: Today, 7D, 30D, All Time
- Download Report
- Total revenue with change versus previous period
- Daily revenue bar chart
- Tiles: Net Earnings, Total Orders, Avg. Value, Fees & Taxes
- Recent transactions with status (Settled, Processing) and See All

**Acceptance:**

- [ ] Report downloads as CSV for the selected range

> Range chips change every figure. Hover or tap a bar for its value; Show as table lists the same numbers. Download Report saves a CSV of the selected range.

Reference: [1](../../design%20reference/vendor/Screenshot%202026-10-13%20134521.png)

### `VREV-02` Transactions · 🔵 In design

Full list of payments with search and filters.

- Filter by status and date
- Tap opens the related order

> Filter by status and date or search. Tap a payment to open its order.

<!-- screens:end -->

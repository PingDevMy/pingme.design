/*
 * Sample data for the app screens, so Home, Tracking, History and the inbox
 * show the same orders. PM.data.order(id) finds one; PM.data.current() is the
 * order picked on Home (or the most recently updated active one).
 *
 * Drop-off orders move Created → In Progress → Ready → Completed;
 * on-site services move Received → In Progress → QC → Done.
 */
(function () {
  const DROP = ["Order Created", "Processing Service", "Ready for Pickup", "Order Completed"];
  const ONSITE = ["Received", "In Progress", "QC", "Done"];

  const shops = {
    luxe: { id: "luxe", name: "Luxe Laundry Hub", category: "Laundry", icon: "shirt", tone: "", address: "12 Jalan SS2/24, Petaling Jaya", phone: "+60 3-7865 1204", rating: 4.7, reviews: 214 },
    sunshine: { id: "sunshine", name: "Sunshine Dry Cleaners", category: "Dry cleaning", icon: "sparkle", tone: "amber", address: "Lot 3, Damansara Uptown", phone: "+60 3-7726 9930", rating: 4.5, reviews: 98 },
    tailor: { id: "tailor", name: "The Tailor Studio", category: "Tailoring", icon: "scissors", tone: "violet", address: "27 Jalan Telawi 3, Bangsar", phone: "+60 3-2283 4410", rating: 4.9, reviews: 156 },
    aquapure: { id: "aquapure", name: "AquaPure Services", category: "HVAC", icon: "snow", tone: "sky", address: "On-site service", phone: "+60 3-5631 7788", rating: 4.8, reviews: 342 },
    pingclean: { id: "pingclean", name: "PingClean Express", category: "Laundry & Dry Cleaning", icon: "shirt", tone: "", address: "123 Business Bay, Downtown PJ", phone: "+60 3-7960 2211", rating: 4.8, reviews: 1240 },
    fixit: { id: "fixit", name: "Fix-It Phone Repair", category: "Repair", icon: "wrench", tone: "rose", address: "G-08 SS15 Courtyard, Subang", phone: "+60 3-5612 0099", rating: 4.4, reviews: 77 },
  };

  // status: created | progress | ready | completed | cancelled
  const orders = [
    {
      id: "ORD-0921", shop: "luxe", service: "Wash & Press · 6 kg", type: "drop", status: "progress", step: 2,
      created: "Today, 10:30 AM", updated: "10:45 AM", eta: "Today, 5:00 PM", amount: 28,
      times: ["10:30 AM, Today", "Started at 10:45 AM", "Waiting for completion", "Pending"],
      note: "Your clothes are being cleaned and pressed. We'll ping you as soon as they're ready for pickup.",
    },
    {
      id: "ORD-1204", shop: "sunshine", service: "Dry clean · 2 suits", type: "drop", status: "ready", step: 3,
      created: "Yesterday, 4:12 PM", updated: "9:02 AM", eta: "Ready now", amount: 46,
      times: ["4:12 PM, Yesterday", "Started at 6:30 PM", "Ready at 9:02 AM, Today", "Pending"],
      note: "All done! Show the pickup QR at the counter. We're open until 9 PM.",
    },
    {
      id: "SVC-88201", shop: "aquapure", service: "Aircond servicing · 2 units", type: "onsite", status: "progress", step: 2,
      created: "Today, 8:15 AM", updated: "11:02 AM", eta: "18 min", amount: 180, tech: { name: "Marcus Chen", role: "Lead Technician", rating: 4.9, initials: "MC" },
      location: "B-12-3, Residensi Vista, Petaling Jaya", when: "Today, 10:30 AM – 12:30 PM",
      feed: [
        { t: "Technician started the diagnostic", d: "Full system scan to find the root cause of the warm air.", at: "2m ago" },
        { t: "Arrived at your location", at: "15m ago" },
        { t: "Technician on the way", at: "40m ago" },
        { t: "Service request confirmed", at: "2h ago" },
      ],
    },
    {
      id: "ORD-0877", shop: "tailor", service: "Jeans hemming · 2 pairs", type: "drop", status: "created", step: 1,
      created: "Today, 9:40 AM", updated: "9:40 AM", eta: "Fri, 17 Oct", amount: 30,
      times: ["9:40 AM, Today", "Not started", "Waiting for completion", "Pending"],
      note: "Order received. We'll start on your jeans tomorrow morning.",
    },
    { id: "ORD-0712", shop: "pingclean", service: "Laundry · 8 kg", type: "drop", status: "completed", step: 4, created: "2 Oct", updated: "4 Oct", amount: 24, rated: false, month: "October 2026" },
    { id: "ORD-0650", shop: "fixit", service: "Screen replacement", type: "drop", status: "completed", step: 4, created: "28 Sep", updated: "30 Sep", amount: 320, rated: 5, month: "September 2026" },
    { id: "ORD-0601", shop: "tailor", service: "Baju kurung alteration", type: "drop", status: "cancelled", step: 1, created: "19 Sep", updated: "19 Sep", amount: 45, month: "September 2026" },
    { id: "ORD-0544", shop: "luxe", service: "Duvet wash", type: "drop", status: "completed", step: 4, created: "6 Sep", updated: "8 Sep", amount: 35, rated: 4, month: "September 2026" },
    { id: "ORD-0433", shop: "pingclean", service: "Laundry · 5 kg", type: "drop", status: "completed", step: 4, created: "22 Aug", updated: "23 Aug", amount: 18, rated: 5, month: "August 2026" },
  ];

  const statusLabel = { created: "Created", progress: "In Progress", ready: "Ready", completed: "Completed", cancelled: "Cancelled" };
  const pillClass = { created: "", progress: "progress live", ready: "ready", completed: "done", cancelled: "cancelled" };
  const active = (o) => ["created", "progress", "ready"].includes(o.status);

  function order(id) { return orders.find((o) => o.id === id); }
  function current() {
    const picked = order(window.PM && PM.store.get("order"));
    return picked || orders.find(active);
  }
  function steps(o) { return o.type === "onsite" ? ONSITE : DROP; }
  function percent(o) { return o.status === "cancelled" ? 0 : Math.round((o.step / 4) * 100); }
  function money(n) { return "RM " + n.toFixed(2); }
  function pill(o) { return `<span class="pill ${pillClass[o.status]}">${statusLabel[o.status]}</span>`; }
  function stepbar(o) {
    const cls = o.status === "ready" ? " ready" : "";
    return `<div class="stepbar${cls}" aria-hidden="true">${[1, 2, 3, 4].map((n) => `<span class="${n <= o.step && o.status !== "cancelled" ? "on" : ""}"></span>`).join("")}</div>`;
  }
  function tile(shop, size = "") { return `<span class="tile ${shop.tone} ${size}"><svg class="i" data-icon="${shop.icon}"></svg></span>`; }
  function stars(n, total = 5) {
    return `<span class="stars" aria-label="${n} out of ${total} stars">${Array.from({ length: total }, (_, i) => `<svg class="i${i < Math.round(n) ? "" : " off"}" data-icon="star"></svg>`).join("")}</span>`;
  }

  // Decorative QR-style pattern (not a scannable code) for pickup passes and receipts.
  function qr(seedText, color = "#0f172a") {
    let seed = [...seedText].reduce((a, c) => a + c.charCodeAt(0), 0);
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const eye = (x, y) => `<path d="M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z M${x + 2} ${y + 2}h3v3h-3z" fill-rule="evenodd"/>`;
    let cells = "";
    for (let y = 0; y < 25; y++) for (let x = 0; x < 25; x++) {
      const inEye = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
      if (!inEye && rnd() > 0.5) cells += `M${x} ${y}h1v1h-1z`;
    }
    return `<svg viewBox="0 0 25 25" shape-rendering="crispEdges" aria-hidden="true"><g fill="${color}">${eye(0, 0)}${eye(18, 0)}${eye(0, 18)}<path d="${cells}"/></g></svg>`;
  }

  window.PM = window.PM || {};
  PM.data = { qr, shops, orders, order, current, steps, percent, money, pill, stepbar, tile, stars, active, statusLabel, user: { name: "Alex Tan", first: "Alex", initials: "AT", phone: "+60 12-345 4291", email: "alex.tan@email.com" } };
})();

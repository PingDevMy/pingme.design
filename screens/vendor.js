/*
 * Vendor app helpers, loaded after kit.js and data.js.
 *  - PM.V.orders: the shop's sample orders. Changes made on one screen (status,
 *    messages, new orders) are kept for the browser session so the dashboard,
 *    list and details agree. PM.V.reset() restores the samples.
 *  - PM.V.statusSheet(order, done) and PM.V.notifySheet(order, done) are the
 *    Update Status (VORD-02) and Notify Customer (VORD-03) bottom sheets,
 *    shared by the order list, order details and their own screens.
 *
 * Vendor statuses: draft → created → progress → ready → completed (or cancelled).
 */
(function () {
  const D = PM.data;
  const KEY = "pingme.vendor.v1";

  const shop = {
    name: "Alex's Laundry Corner", short: "Laundry Corner", category: "Laundry, Tailoring & Repair",
    address: "18 Jalan SS2/55, Petaling Jaya", rating: 4.8, reviews: 126, owner: "Alex Tan",
  };

  const cats = {
    Laundry: { icon: "shirt", tone: "" },
    Tailoring: { icon: "scissors", tone: "violet" },
    Repair: { icon: "wrench", tone: "rose" },
  };

  const sample = () => [
    {
      id: "ORD-1206", title: "Curtain dry clean", category: "Laundry", customer: { name: "Nurul Aina", phone: "+60 17-882 3104", app: true },
      qty: 4, unit: "panels", price: 15, paid: 30, status: "progress", created: "Today, 11:20 AM", eta: "Tomorrow, 5:00 PM",
      log: [
        { kind: "status", status: "progress", text: "Work started", note: "Panels are soaking now.", at: "Today, 12:05 PM" },
        { kind: "photo", text: "Proof photo added at drop-off", at: "Today, 11:21 AM" },
        { kind: "status", status: "created", text: "Order created", at: "Today, 11:20 AM" },
      ],
    },
    {
      id: "ORD-1205", title: "King size comforter", category: "Laundry", customer: { name: "Michael Chen", phone: "+60 12-771 0932", app: false },
      qty: 1, unit: "piece", price: 35, paid: 0, status: "created", created: "Today, 10:02 AM", eta: "Fri, 16 Oct",
      log: [{ kind: "status", status: "created", text: "Order created", note: "SMS tracking link sent.", at: "Today, 10:02 AM" }],
    },
    {
      id: "ORD-1204", title: "Silk suit alteration", category: "Tailoring", customer: { name: "Sarah Jenkins", phone: "+60 11-2045 8890", app: true },
      qty: 1, unit: "suit", price: 45, paid: 45, status: "progress", created: "Yesterday, 4:40 PM", eta: "Today, 6:00 PM",
      log: [
        { kind: "message", text: "Message sent", note: "Hi Sarah, the jacket sleeves are done, trousers next.", at: "Today, 9:15 AM" },
        { kind: "status", status: "progress", text: "Work started", note: "Measurements checked, cutting today.", at: "Yesterday, 6:10 PM" },
        { kind: "payment", text: "Paid RM 45.00 in cash", at: "Yesterday, 4:41 PM" },
        { kind: "status", status: "created", text: "Order created", at: "Yesterday, 4:40 PM" },
      ],
    },
    {
      id: "ORD-1201", title: "Wash & press · 6 kg", category: "Laundry", customer: { name: "Alex Johnson", phone: "+60 16-330 2271", app: true },
      qty: 6, unit: "kg", price: 7, paid: 42, status: "ready", created: "Yesterday, 9:30 AM", eta: "Ready now",
      log: [
        { kind: "status", status: "ready", text: "Marked ready", note: "Folded and bagged. Open until 9 PM.", at: "Today, 8:50 AM" },
        { kind: "status", status: "progress", text: "Work started", at: "Yesterday, 11:00 AM" },
        { kind: "status", status: "created", text: "Order created", at: "Yesterday, 9:30 AM" },
      ],
    },
    {
      id: "ORD-1198", title: "Leather boot heel repair", category: "Repair", customer: { name: "Emma Wilson", phone: "+60 19-554 1200", app: false },
      qty: 1, unit: "pair", price: 25, paid: 0, status: "ready", created: "Mon, 12 Oct", eta: "Ready now",
      log: [
        { kind: "status", status: "ready", text: "Marked ready", at: "Today, 10:40 AM" },
        { kind: "status", status: "progress", text: "Work started", at: "Mon, 2:15 PM" },
        { kind: "status", status: "created", text: "Order created", at: "Mon, 1:05 PM" },
      ],
    },
    {
      id: "ORD-1207", title: "Baju Melayu hemming", category: "Tailoring", customer: { name: "", phone: "", app: false },
      qty: 2, unit: "pieces", price: 12, paid: 0, status: "draft", created: "Today, 12:30 PM",
      log: [{ kind: "status", status: "draft", text: "Saved as draft", at: "Today, 12:30 PM" }],
    },
    {
      id: "ORD-1190", title: "Duvet wash", category: "Laundry", customer: { name: "Elena Rodriguez", phone: "+60 13-208 7781", app: true },
      qty: 1, unit: "piece", price: 25, paid: 25, status: "completed", created: "Fri, 9 Oct",
      log: [{ kind: "status", status: "completed", text: "Picked up", at: "Sat, 10 Oct" }, { kind: "status", status: "created", text: "Order created", at: "Fri, 9 Oct" }],
    },
    {
      id: "ORD-1187", title: "Batik shirts press", category: "Laundry", customer: { name: "Hafiz Rahman", phone: "+60 12-660 4419", app: true },
      qty: 5, unit: "shirts", price: 4, paid: 20, status: "completed", created: "Thu, 8 Oct",
      log: [{ kind: "status", status: "completed", text: "Picked up", at: "Fri, 9 Oct" }, { kind: "status", status: "created", text: "Order created", at: "Thu, 8 Oct" }],
    },
    {
      id: "ORD-1181", title: "Zip replacement", category: "Repair", customer: { name: "Priya Nair", phone: "+60 11-3390 1278", app: false },
      qty: 1, unit: "jacket", price: 18, paid: 0, status: "cancelled", created: "Wed, 7 Oct",
      log: [{ kind: "status", status: "cancelled", text: "Cancelled", note: "Customer took the jacket back.", at: "Wed, 7 Oct" }],
    },
  ];

  // Payments (VREV): newest first. Processing = card / e-wallet not yet paid out.
  const transactions = [
    { id: "TXN-30418", order: "ORD-1204", who: "Sarah Jenkins", what: "Silk suit alteration", cat: "Tailoring", amount: 45, method: "DuitNow QR", status: "processing", at: "Today, 9:20 AM", day: 0 },
    { id: "TXN-30417", order: "ORD-1206", who: "Nurul Aina", what: "Curtain dry clean", cat: "Laundry", amount: 30, method: "Cash", status: "settled", at: "Today, 11:21 AM", day: 0 },
    { id: "TXN-30412", order: "ORD-1201", who: "Alex Johnson", what: "Wash & press · 6 kg", cat: "Laundry", amount: 42, method: "Card", status: "processing", at: "Yesterday, 9:31 AM", day: 1 },
    { id: "TXN-30405", order: "ORD-1190", who: "Elena Rodriguez", what: "Duvet wash", cat: "Laundry", amount: 25, method: "Cash", status: "settled", at: "Sun, 11 Oct", day: 2 },
    { id: "TXN-30399", order: "ORD-1187", who: "Hafiz Rahman", what: "Batik shirts press", cat: "Laundry", amount: 20, method: "DuitNow QR", status: "settled", at: "Sat, 10 Oct", day: 3 },
    { id: "TXN-30391", order: "ORD-1183", who: "Mei Ling Wong", what: "Wedding gown steam", cat: "Laundry", amount: 120, method: "Card", status: "settled", at: "Fri, 9 Oct", day: 4 },
    { id: "TXN-30386", order: "ORD-1182", who: "Daniel Lee", what: "Trouser hemming · 3", cat: "Tailoring", amount: 36, method: "Cash", status: "settled", at: "Thu, 8 Oct", day: 5 },
    { id: "TXN-30380", order: "ORD-1181", who: "Priya Nair", what: "Zip replacement", cat: "Repair", amount: -18, method: "Cash", status: "refunded", at: "Wed, 7 Oct", day: 6 },
    { id: "TXN-30377", order: "ORD-1179", who: "Kumar Selvam", what: "Sneaker deep clean", cat: "Repair", amount: 55, method: "Card", status: "settled", at: "Wed, 7 Oct", day: 6 },
    { id: "TXN-30361", order: "ORD-1170", who: "Aisyah Rahim", what: "Baju kurung alteration", cat: "Tailoring", amount: 60, method: "DuitNow QR", status: "settled", at: "Sat, 3 Oct", day: 10 },
    { id: "TXN-30344", order: "ORD-1162", who: "Jason Ong", what: "Laundry · 8 kg", cat: "Laundry", amount: 56, method: "Cash", status: "settled", at: "29 Sep", day: 14 },
    { id: "TXN-30320", order: "ORD-1150", who: "Farah Idris", what: "Leather bag repair", cat: "Repair", amount: 85, method: "Card", status: "settled", at: "22 Sep", day: 21 },
  ];
  const txStatus = { settled: ["Settled", "ready"], processing: ["Processing", "warn"], refunded: ["Refunded", "cancelled"] };

  const templates0 = [
    "Running about 30 min late, sorry {customer}!",
    "Quick question about your order {order}, please call us.",
    "We're closed today for a public holiday, back tomorrow.",
    "Your items need an extra day. New pickup time: {eta}.",
  ];

  function load() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY));
      if (saved && saved.orders) return saved;
    } catch { /* storage unavailable */ }
    return { orders: sample(), templates: templates0.slice(), seq: 1208 };
  }
  const state = load();
  function save() {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  }
  function reset() {
    try { sessionStorage.removeItem(KEY); } catch { /* storage unavailable */ }
    Object.assign(state, { orders: sample(), templates: templates0.slice(), seq: 1208 });
  }

  const label = { draft: "Draft", created: "Created", progress: "In Progress", ready: "Ready", completed: "Completed", cancelled: "Cancelled" };
  const pillCls = { draft: "warn", created: "", progress: "progress", ready: "ready", completed: "done", cancelled: "cancelled" };
  // The one-tap next step on each order card (VORD-R4).
  const next = {
    created: { to: "progress", label: "Start Work", icon: "arrow", text: "Work started" },
    progress: { to: "ready", label: "Mark Ready", icon: "check", text: "Marked ready" },
    ready: { to: "completed", label: "Complete", icon: "checkcircle", text: "Picked up" },
  };
  // What the customer is told at each status (mirrors Customer Messaging, VSHOP-02).
  const auto = {
    created: "Hi {customer}, {shop} has logged your order {order}. Track it here: pingme.my/t/{order}",
    progress: "Good news {customer}! We've started on your order {order}.",
    ready: "{customer}, your order {order} is ready for pickup at {shop}. Show your QR at the counter.",
    completed: "Thanks {customer}! Order {order} has been picked up. How did we do?",
  };

  const order = (id) => state.orders.find((o) => o.id === id);
  const active = (o) => ["created", "progress", "ready"].includes(o.status);
  const total = (o) => o.qty * o.price;
  const code = (o) => o.id.replace("ORD", "PINGME") + "-X99";
  const pill = (o) => `<span class="pill ${pillCls[o.status]}${o.status === "progress" ? " live" : ""}">${label[o.status]}</span>`;
  const initials = (name) => (name || "?").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const catTile = (c, size = "") => `<span class="tile ${cats[c].tone} ${size}"><svg class="i" data-icon="${cats[c].icon}"></svg></span>`;
  const channel = (o) => (o.customer.app ? "Push" : "SMS");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function fill(text, o) {
    return text
      .replace(/\{customer\}/g, (o.customer.name || "there").split(" ")[0])
      .replace(/\{order\}/g, o.id)
      .replace(/\{shop\}/g, shop.name)
      .replace(/\{eta\}/g, o.eta || "soon");
  }

  // Moves an order to a status and logs it; the customer is pinged unless it's a draft.
  function setStatus(o, to, note) {
    const text = { created: "Order created", progress: "Work started", ready: "Marked ready", completed: "Picked up", cancelled: "Cancelled" }[to];
    o.status = to;
    if (to === "ready") o.eta = "Ready now";
    if (to === "completed" && o.paid < total(o)) {
      o.log.unshift({ kind: "payment", text: `Paid ${D.money(total(o) - o.paid)} at pickup`, at: "Just now" });
      o.paid = total(o);
    }
    o.log.unshift({ kind: "status", status: to, text, note: note || "", at: "Just now" });
    save();
  }
  function message(o, text) {
    o.log.unshift({ kind: "message", text: `${channel(o)} message sent`, note: text, at: "Just now" });
    save();
  }
  function create(fields) {
    const o = Object.assign({ id: "ORD-" + state.seq++, paid: 0, created: "Just now", eta: "Sat, 17 Oct", log: [] }, fields);
    o.log.unshift({ kind: "status", status: o.status, text: o.status === "draft" ? "Saved as draft" : "Order created", note: o.status === "created" && o.customer.phone ? "SMS tracking link sent." : "", at: "Just now" });
    if (o.photos && o.photos.length) o.log.unshift({ kind: "photo", text: "Proof photo added at drop-off", at: "Just now" });
    state.orders.unshift(o);
    save();
    return o;
  }

  // ---- Bottom sheets -------------------------------------------------------
  let bg, sheet, onClose;
  function mount() {
    if (sheet) return;
    bg = document.createElement("div");
    bg.className = "sheet-bg";
    sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-modal", "true");
    document.body.append(bg, sheet);
    bg.addEventListener("click", close);
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  }
  function open(html, labelText) {
    mount();
    sheet.setAttribute("aria-label", labelText);
    sheet.innerHTML = `<div class="grab"></div>${html}`;
    PM.hydrateIcons(sheet);
    sheet.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));
    document.body.classList.add("open");
  }
  function close() {
    document.body.classList.remove("open");
    const cb = onClose;
    onClose = null;
    cb && cb();
  }

  // VORD-02: pick a status and add a note the customer sees with it.
  const statusOpts = [
    ["created", "Received", "Order logged at the counter. The customer gets the tracking link."],
    ["progress", "In Progress", "Work has started. Add what's happening in the note."],
    ["ready", "Ready to Collect", "Done and waiting. The customer gets their pickup QR."],
  ];
  function statusSheet(o, done) {
    let pick = o.status === "draft" ? "created" : ["created", "progress", "ready"].includes(o.status) ? o.status : "ready";
    open(`
      <h3>Update status</h3>
      <p class="lead small">${esc(o.title)} · ${o.id}. ${o.customer.name ? `${esc(o.customer.name.split(" ")[0])} gets the new status and your note by ${channel(o)}.` : "No customer yet, so nobody is notified."}</p>
      <div class="choices" role="radiogroup" aria-label="Status">
        ${statusOpts.map(([k, name, help]) => `
          <label class="choice">
            <input type="radio" name="st" value="${k}"${k === pick ? " checked" : ""} />
            <span class="grow"><b>${name}</b><small>${help}</small></span>
            ${k === o.status ? '<span class="pill plain">Current</span>' : ""}
          </label>`).join("")}
      </div>
      <div class="field">
        <div class="field-head"><label class="label" for="st-note">Status note <span class="opt">(optional)</span></label><span class="meta" id="st-n">0/160</span></div>
        <div class="control area"><textarea id="st-note" maxlength="160" placeholder="e.g. Technician started the diagnostic process"></textarea></div>
      </div>
      <div class="actions">
        <button class="btn primary" type="button" id="st-go">Update Status</button>
        <button class="btn ghost" type="button" data-close>Cancel</button>
      </div>`, "Update status");
    const note = sheet.querySelector("#st-note");
    const go = sheet.querySelector("#st-go");
    const sync = () => {
      pick = sheet.querySelector("input[name=st]:checked").value;
      go.disabled = pick === o.status && !note.value.trim();
      sheet.querySelector("#st-n").textContent = `${note.value.length}/160`;
    };
    sheet.querySelectorAll("input[name=st]").forEach((r) => r.addEventListener("change", sync));
    note.addEventListener("input", sync);
    sync();
    go.addEventListener("click", () => {
      const changed = pick !== o.status;
      if (changed) setStatus(o, pick, note.value.trim());
      else message(o, note.value.trim());
      onClose = null;
      close();
      PM.toast(changed ? `${o.id} is now ${label[pick]}${o.customer.name ? ". Customer notified" : ""}` : "Note sent to the customer");
      done && done(o);
    });
  }

  // VORD-03: send a template or free-text message without changing status.
  function notifySheet(o, done) {
    const first = (o.customer.name || "").split(" ")[0];
    open(`
      <h3>Notify ${esc(first || "customer")}</h3>
      <div class="chan">
        <span class="tile sm"><svg class="i" data-icon="${o.customer.app ? "bell" : "message"}"></svg></span>
        <span class="grow"><b>${o.customer.app ? "Push notification" : "SMS"}</b><small>${o.customer.app ? `${esc(first)} has the PingMe app` : `${esc(first)} doesn't have the app yet, so this goes by SMS to ${esc(o.customer.phone)}`}</small></span>
      </div>
      <div class="label" style="margin-top: 16px">Quick replies</div>
      <div class="tpl" id="tpl">${state.templates.map((t, i) => `<button type="button" class="chip" data-t="${i}">${esc(fill(t, o))}</button>`).join("")}</div>
      <div class="field">
        <div class="field-head"><label class="label" for="nt-msg">Message</label><span class="meta" id="nt-n">0/160</span></div>
        <div class="control area"><textarea id="nt-msg" maxlength="160" placeholder="Write a message to ${esc(first || "the customer")}"></textarea></div>
      </div>
      <div class="label" style="margin-top: 16px">Preview</div>
      <div class="preview" id="nt-prev">
        <span class="mark sm"><svg class="i" data-icon="bolt"></svg></span>
        <div class="grow"><b>${esc(shop.name)}</b><span id="nt-text" class="ph">Your message shows here</span></div>
        <time>now</time>
      </div>
      <div class="actions">
        <button class="btn primary" type="button" id="nt-go" disabled><svg class="i" data-icon="send"></svg>Send</button>
        <button class="btn ghost" type="button" data-close>Cancel</button>
      </div>`, "Notify customer");
    const msg = sheet.querySelector("#nt-msg");
    const go = sheet.querySelector("#nt-go");
    const sync = () => {
      const v = msg.value.trim();
      const t = sheet.querySelector("#nt-text");
      t.textContent = v || "Your message shows here";
      t.classList.toggle("ph", !v);
      sheet.querySelector("#nt-n").textContent = `${msg.value.length}/160`;
      go.disabled = !v;
      sheet.querySelectorAll("#tpl .chip").forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === msg.value)));
    };
    sheet.querySelectorAll("#tpl .chip").forEach((c) => c.addEventListener("click", () => { msg.value = c.textContent; sync(); }));
    msg.addEventListener("input", sync);
    go.addEventListener("click", () => {
      message(o, msg.value.trim());
      onClose = null;
      close();
      PM.toast(`${channel(o)} sent to ${first}`);
      done && done(o);
    });
  }

  // Activity log entries (VORD-R8) as <li>s for an <ol class="log">.
  const logIcon = { status: "refresh", message: "message", photo: "camera", payment: "receipt" };
  function logHtml(entries) {
    return entries.map((e) => {
      const icon = e.kind === "status" ? { created: "receipt", progress: "refresh", ready: "checkcircle", completed: "package", cancelled: "close", draft: "edit" }[e.status] : logIcon[e.kind];
      return `<li class="${e.kind} ${e.status || ""}"><span class="ic"><svg class="i" data-icon="${icon}"></svg></span><div><b>${esc(e.text)}</b><small>${esc(e.at)}</small>${e.note ? `<q>${esc(e.note)}</q>` : ""}</div></li>`;
    }).join("");
  }

  // Opens the order behind a payment; older ones are rebuilt from the payment.
  function openTx(txOrOrderId) {
    const t = transactions.find((x) => x.order === txOrOrderId) || txOrOrderId;
    if (!order(t.order)) {
      const amt = Math.abs(t.amount);
      state.orders.push({
        id: t.order, title: t.what, category: t.cat, customer: { name: t.who, phone: "", app: true }, qty: 1, unit: "order", price: amt, paid: t.amount < 0 ? 0 : amt,
        status: t.status === "refunded" ? "cancelled" : "completed", created: t.at,
        log: [{ kind: "payment", text: `${t.amount < 0 ? "Refunded" : "Paid"} ${D.money(amt)} by ${t.method}`, at: t.at }, { kind: "status", status: "created", text: "Order created", at: t.at }],
      });
      save();
    }
    PM.store.set("vorder", t.order);
    PM.go("VORD-05");
  }

  function whenClosed(cb) { onClose = cb; }

  PM.V = {
    shop, cats, auto, state, transactions, txStatus, save, reset, order, active, total, code, pill, label, next, initials, catTile, channel, fill, esc,
    get orders() { return state.orders; },
    get templates() { return state.templates; },
    setStatus, message, create, logHtml, openTx, statusSheet, notifySheet, closeSheet: close, whenClosed,
  };
})();

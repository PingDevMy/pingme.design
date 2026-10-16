/*
 * PingMe app UI kit helpers shared by the HTML screens.
 *  - <svg class="i" data-icon="name"></svg> is filled from the icon set below.
 *  - PM.go("AUTH-03") moves the prototype to another screen (keeps the site's
 *    screen list in sync when shown in the phone frame).
 *  - [data-peek] buttons toggle the password field in the same .control.
 *  - PM.store keeps small bits of flow state (mode, phone) between screens.
 *  - PM.mode() is the mode the one app is in: "customer" or "vendor". Screens that
 *    belong to one mode set it with <body data-mode="...">; shared screens
 *    (Notifications, Profile, Shop Profile) read it. PM.hasShop() says whether the
 *    account has a shop, so it can switch to Vendor mode.
 *  - <nav class="tabbar" data-tabbar="home"></nav> is filled with the bottom tab bar
 *    for the current mode (same five-slot layout in both modes); the value
 *    names the current tab, or "customerTab|vendorTab" on shared screens.
 *  - PM.toast("Saved") shows a short message (needs a .toast element, see app.css).
 */
(function () {
  const paths = {
    back: '<path d="m15 18-6-6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    help: '<circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.2a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.6-2.8 2.6M12 17h.01"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    store: '<path d="M3 9.5 4.5 4h15L21 9.5M3 9.5h18M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12.5V20h14v-7.5M10 20v-5h4v5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/>',
    call: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    lock: '<rect x="4" y="10.5" width="16" height="11" rx="3"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M9.9 4.2A10 10 0 0 1 12 4c6.4 0 10 8 10 8a17 17 0 0 1-2.2 3.2M6.6 6.6C3.6 8.6 2 12 2 12s3.6 8 10 8a9.7 9.7 0 0 0 5.4-1.6M3 3l18 18M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    checkcircle: '<circle cx="12" cy="12" r="9.5"/><path d="m8 12.3 2.8 2.8L16.2 9.6"/>',
    alert: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v5.5M12 16.5h.01"/>',
    info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 11v5.5M12 7.5h.01"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.2 2.2 4.2-4.2"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 8.7-8.7M16 7l2.5 2.5M18.5 4.5l2 2"/>',
    send: '<path d="M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8-8-4 19-7Z"/>',
    inbox: '<path d="M22 12.5h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.5L5.5 5Z"/>',
    refresh: '<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6l2.5 2.5M20.5 3.5v5h-5"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.5-4.5L6 21"/>',
    upload: '<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    package: '<path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9M7.8 5.3l8.5 4.6"/>',
    shirt: '<path d="M8 3 3 6l2 5 2.5-1V21h9V10l2.5 1 2-5-5-3a4 4 0 0 1-8 0Z"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5.2 5.2L21 12.6a6 6 0 0 1-7.7 1.6L6 21.5a2.1 2.1 0 0 1-3-3l7.3-7.3A6 6 0 0 1 12 3.5l1.1 1.1-1.4 3.6 2.9-1.9Z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    snow: '<path d="M12 2v20M4.2 6.5l15.6 11M4.2 17.5l15.6-11M9 4l3 2 3-2M9 20l3-2 3 2"/>',
    dots: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
    home: '<path d="M3.5 10.5 12 3.5l8.5 7V19a2 2 0 0 1-2 2h-4v-6h-5v6h-4a2 2 0 0 1-2-2v-8.5Z"/>',
    scan: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    torch: '<path d="M8 3h8v4l-2 3v11h-4V10L8 7V3ZM8 7h8M12 13v2"/>',
    navigate: '<path d="M3 11 21 3l-8 18-2-8-8-2Z"/>',
    camera: '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 3.5h6L16.5 6h2A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-9Z"/><circle cx="12" cy="12.5" r="3.5"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M5.5 7l1 12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2l1-12M9 7V4.5h6V7"/>',
    globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.5 2.6 3.8 5.8 3.8 9.5s-1.3 6.9-3.8 9.5c-2.5-2.6-3.8-5.8-3.8-9.5S9.5 5.1 12 2.5Z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    thumb: '<path d="M7 10v11H4V10h3Zm0 0 4-7a2.5 2.5 0 0 1 2.5 2.8L13 10h5.6a2 2 0 0 1 2 2.4l-1.6 7A2 2 0 0 1 17 21H7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    history: '<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5M3.5 3.5v5h5M12 7.5V12l3 2"/>',
    headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 14h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4ZM17 20c0 1-1.5 1.5-5 1.5"/>',
    receipt: '<path d="M5.5 3h13v18l-3-2-3.5 2-3.5-2-3 2V3ZM9 8h6M9 12h6M9 16h3"/>',
    swap: '<path d="M7 4 3.5 7.5 7 11M3.5 7.5H17M17 13l3.5 3.5L17 20M20.5 16.5H7"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/>',
    download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    filter: '<path d="M3.5 5h17l-6.5 8v6l-4 2v-8L3.5 5Z"/>',
    settings: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    tag: '<path d="M3 12.5V4a1 1 0 0 1 1-1h8.5L21 11.5 12.5 20 3 12.5Z"/><circle cx="8" cy="8" r="1.5"/>',
    message: '<path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12Z"/>',
  };
  const bolt = '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>';
  const google =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8Z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z"/></svg>';
  const apple =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9a4.8 4.8 0 0 0-3.8-2c-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9a5 5 0 0 0-4.2 2.6c-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5a11 11 0 0 0 1.4-2.9 4.5 4.5 0 0 1-2.6-4.1ZM13.9 5c.7-.9 1.2-2 1-3.2a4.6 4.6 0 0 0-3 1.6c-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z"/></svg>';

  function hydrateIcons(root = document) {
    root.querySelectorAll("svg[data-icon]").forEach((el) => {
      const name = el.dataset.icon;
      el.setAttribute("viewBox", "0 0 24 24");
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = name === "bolt" ? bolt : paths[name] || "";
      if (name === "bolt") el.style.cssText += "fill:currentColor;stroke:none";
    });
    root.querySelectorAll("[data-brand]").forEach((el) => {
      el.innerHTML = (el.dataset.brand === "google" ? google : apple) + el.innerHTML;
      el.removeAttribute("data-brand");
    });
  }

  const store = {
    get(k) { try { return sessionStorage.getItem("pingme.flow." + k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem("pingme.flow." + k, v); } catch { /* storage unavailable */ } },
  };

  // In the prototype site the screen lives in an iframe: change the site's
  // screen so its list and description follow. Standalone, open the site there.
  function go(id) {
    try {
      if (window.top !== window && window.top.PINGME) {
        window.top.location.hash = id;
        return;
      }
    } catch { /* cross-origin preview */ }
    location.href = "../../index.html#" + id;
  }

  function wirePeek(root = document) {
    root.querySelectorAll("[data-peek]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.closest(".control").querySelector("input");
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        btn.querySelector("svg").dataset.icon = show ? "eyeoff" : "eye";
        hydrateIcons(btn);
      });
    });
  }

  // Links and buttons with data-go="SCREEN-ID" navigate through PM.go.
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-go]");
    if (!el) return;
    e.preventDefault();
    go(el.dataset.go);
  });

  function shake(el) {
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }

  let toastTimer;
  function toast(text) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.innerHTML = `<svg class="i" data-icon="checkcircle"></svg><span></span>`;
    el.querySelector("span").textContent = text;
    hydrateIcons(el);
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // Customer and vendor share one app and one account; the mode decides which
  // home, tab bar and inbox the user sees. The sample account has both.
  const mode = () => (store.get("role") === "vendor" ? "vendor" : "customer");
  const hasShop = () => store.get("hasShop") !== "0";
  const own = document.body && document.body.dataset.mode;
  if (own) {
    store.set("role", own);
    if (own === "vendor") store.set("hasShop", "1");
  }

  // One bottom tab bar for both modes: four tabs around a raised centre action.
  const tabs = {
    customer: [
      ["home", "Home", "home", "CHOME-01"],
      ["orders", "Orders", "receipt", "CTRK-03"],
      ["scan", "Scan", "scan", "CHOME-02"],
      ["inbox", "Inbox", "bell", "NOTI-01"],
      ["me", "Profile", "user", "ACCT-01"],
    ],
    vendor: [
      ["home", "Home", "home", "VHOME-01"],
      ["orders", "Orders", "receipt", "VORD-01"],
      ["new", "New", "plus", "VORD-04"],
      ["revenue", "Revenue", "chart", "VREV-01"],
      ["shop", "Shop", "store", "VSHOP-01"],
    ],
  };
  // data-tabbar="me|shop" gives the current tab per mode (customer|vendor); an
  // empty value means that mode shows no tab bar on this screen.
  document.querySelectorAll("nav[data-tabbar]").forEach((nav) => {
    const parts = nav.dataset.tabbar.split("|");
    const current = parts.length > 1 ? parts[mode() === "vendor" ? 1 : 0] : parts[0];
    if (!current) {
      nav.closest(".page")?.classList.remove("tabbed");
      return nav.remove();
    }
    nav.setAttribute("aria-label", "Main");
    nav.innerHTML = tabs[mode()].map(([key, label, icon, go], i) => i === 2
      ? `<a href="#" class="center" data-go="${go}" aria-label="${key === "new" ? "Create new order" : "Scan order QR"}"><span class="fab"><svg class="i" data-icon="${icon}"></svg></span>${label}</a>`
      : `<a href="#"${key === current ? ' aria-current="page"' : ` data-go="${go}"`}><svg class="i" data-icon="${icon}"></svg>${label}</a>`).join("");
  });

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRe = /^\+?[\d\s-]{8,15}$/;
  window.PM = { go, store, mode, hasShop, hydrateIcons, wirePeek, shake, toast, emailRe, phoneRe };

  hydrateIcons();
  wirePeek();
})();

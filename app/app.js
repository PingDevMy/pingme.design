(function () {
  const data = window.PINGME;
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const encPath = (p) => p.split("/").map(encodeURIComponent).join("/");

  // Flatten screens, keeping a link back to their module.
  const screens = [];
  for (const m of data.modules) for (const s of m.screens) screens.push({ ...s, module: m });
  const byId = Object.fromEntries(screens.map((s) => [s.id, s]));
  const shared = (id) => byId[id].module.role === "shared";

  // Every screen node in the flow tree is a stop. Shared screens appear once per
  // mode, keyed "ID@mode", so opening one from a branch shows that mode's version.
  const stops = [];
  const byKey = {};
  let uid = 0;
  function index(node, sec) {
    node.uid = "n" + uid++;
    if (node.id) {
      node.key = sec.mode && shared(node.id) ? `${node.id}@${sec.mode}` : node.id;
      node.mode = sec.mode;
      if (!byKey[node.key]) {
        byKey[node.key] = { key: node.key, id: node.id, mode: sec.mode, sec };
        stops.push(byKey[node.key]);
      }
    }
    (node.kids || []).forEach((k) => index(k, sec));
  }
  for (const sec of data.flow) sec.kids.forEach((n) => index(n, sec));

  const store = {
    get(k) { try { return localStorage.getItem("pingme." + k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("pingme." + k, v); } catch { /* storage unavailable */ } },
  };
  // The app screens keep their mode in sessionStorage (screens/kit.js); same origin as the site.
  const appMode = {
    get() { try { return sessionStorage.getItem("pingme.flow.role") === "vendor" ? "vendor" : "customer"; } catch { return "customer"; } },
    set(m) { try { sessionStorage.setItem("pingme.flow.role", m); } catch { /* storage unavailable */ } },
  };

  const state = {
    current: null,
    refIndex: 0,
    filter: "all",
    dev: store.get("dev") === "1",
    closed: new Set(),
  };

  // Header + progress
  $("version").textContent = data.product.version;
  const counts = {};
  for (const s of screens) counts[s.status] = (counts[s.status] || 0) + 1;
  $("progress-text").textContent = `${counts.done || 0} / ${screens.length}`;
  $("progress-bar").innerHTML = Object.keys(data.statuses)
    .filter((k) => k !== "todo")
    .reverse()
    .map((k) => `<span style="width:${((counts[k] || 0) / screens.length) * 100}%;background:var(--st-${k})" title="${esc(data.statuses[k].label)}: ${counts[k] || 0}"></span>`)
    .join("");

  function renderFilters() {
    const opts = [["all", "All", screens.length], ...Object.entries(data.statuses).map(([k, v]) => [k, v.label, counts[k] || 0])];
    $("filters").innerHTML = opts
      .map(([k, label, n]) => `<button class="filter" data-filter="${k}" aria-pressed="${state.filter === k}">${k !== "all" ? `<span class="sdot ${k}"></span>` : ""}${esc(label)} · ${n}</button>`)
      .join("");
  }

  const secIcon = {
    start: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />',
    customer: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    vendor: '<path d="M3 9.5 4.5 4h15L21 9.5M3 9.5h18M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12.5V20h14v-7.5"/>',
    web: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.5 2.6 3.8 5.8 3.8 9.5s-1.3 6.9-3.8 9.5c-2.5-2.6-3.8-5.8-3.8-9.5S9.5 5.1 12 2.5Z"/>',
  };
  const caret = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  const jumpIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function secIds(sec) {
    const ids = new Set();
    const walk = (n) => { if (n.id) ids.add(n.id); (n.kids || []).forEach(walk); };
    sec.kids.forEach(walk);
    return [...ids];
  }

  function nodeHtml(n, sec) {
    if (n.to) {
      const t = byId[n.to];
      const key = Object.values(byKey).find((x) => x.id === n.to && (!shared(n.to) || x.mode === sec.mode))?.key || n.to;
      return `<li class="jump"><div class="node-row"><a class="node" href="#${key}" data-key="${key}" title="Goes to ${esc(t.name)} (${t.id})">
        <span class="via">${esc(n.via)}</span><span class="nm">${jumpIcon}${esc(n.label || t.name)}</span></a><span class="tw" aria-hidden="true"></span></div></li>`;
    }
    const s = byId[n.id];
    const kids = n.kids || [];
    const open = !state.closed.has(n.uid);
    const dim = state.filter !== "all" && s.status !== state.filter;
    const cur = state.current === n.key;
    return `<li class="${kids.length ? "has-kids" : ""}${open ? "" : " closed"}">
      <div class="node-row">
        <a class="node${dim ? " dim" : ""}${shared(n.id) ? " shared" : ""}" href="#${n.key}" data-key="${n.key}"${cur ? ' aria-current="page"' : ""}>
          ${n.via ? `<span class="via">${esc(n.via)}</span>` : ""}
          <span class="line"><span class="nm">${esc(s.name)}</span><span class="nid">${s.id}</span><span class="sdot ${s.status}" title="${esc(data.statuses[s.status].label)}"></span></span>
        </a>
        ${kids.length ? `<button class="tw" data-uid="${n.uid}" aria-expanded="${open}" aria-label="${open ? "Collapse" : "Expand"} ${esc(s.name)}">${caret}<span>${kids.length}</span></button>` : `<span class="tw" aria-hidden="true"></span>`}
      </div>
      ${kids.length ? `<ul class="ft">${kids.map((k) => nodeHtml(k, sec)).join("")}</ul>` : ""}
    </li>`;
  }

  function renderTree() {
    $("nav-tree").innerHTML = data.flow.map((sec) => {
      const ids = secIds(sec);
      const done = ids.filter((id) => byId[id].status === "done").length;
      const open = !state.closed.has(sec.id);
      return `<section class="flow-sec${open ? "" : " closed"}" data-sec="${sec.id}">
        <button class="sec-head" data-uid="${sec.id}" aria-expanded="${open}">
          <span class="sec-ic ${sec.id}"><svg viewBox="0 0 24 24" aria-hidden="true">${secIcon[sec.id] || ""}</svg></span>
          <span class="sec-t"><b>${esc(sec.label)}</b><small>${esc(sec.hint || "")}</small></span>
          <span class="count">${done}/${ids.length}</span>${caret}
        </button>
        <ul class="ft root">${sec.kids.map((n) => nodeHtml(n, sec)).join("")}</ul>
      </section>`;
    }).join("") + `<p class="legend"><span>${jumpIcon} goes to another branch</span><span><i></i> shared by both modes</span></p>`;
  }

  // Resolve a hash ("ID" or "ID@mode") to a stop. A bare ID for a shared screen
  // picks the instance for the app's current mode.
  function resolve(hash) {
    if (byKey[hash]) return byKey[hash];
    const id = hash.split("@")[0];
    if (!byId[id]) return stops[0];
    return byKey[shared(id) ? `${id}@${appMode.get()}` : id] || stops.find((x) => x.id === id);
  }

  function renderPhone(s) {
    const body = $("screen-body");
    body.scrollTop = 0;
    if (s.html) {
      body.innerHTML = `<iframe src="${encPath(s.html)}" title="${esc(s.name)}"></iframe>`;
      fitScreen();
    } else if (s.refs.length) {
      const ref = s.refs[state.refIndex] || s.refs[0];
      body.innerHTML = `<img src="${encPath(ref)}" alt="Reference sketch for ${esc(s.name)}" />`;
    } else {
      body.innerHTML = `<div class="placeholder">
        <div class="ph-tag">${esc(s.module.name)} · not designed yet</div>
        <h2>${esc(s.name)}</h2>
        <p>${esc(s.summary)}</p>
        ${s.points.map((p) => `<div class="ph-block">${esc(p)}</div>`).join("")}
      </div>`;
    }

    const refs = $("refs");
    if (s.html) refs.innerHTML = `<span>Live screen</span>`;
    else if (s.refs.length > 1)
      refs.innerHTML = s.refs
        .map((_, i) => `<button class="ref-btn" data-ref="${i}" aria-pressed="${i === state.refIndex}">Ref ${i + 1}</button>`)
        .join("");
    else if (s.refs.length) refs.innerHTML = `<span>Reference sketch</span>`;
    else refs.innerHTML = `<span>No reference yet</span>`;

    const i = stops.findIndex((x) => x.key === state.current);
    $("prev").disabled = i === 0;
    $("next").disabled = i === stops.length - 1;
  }

  // HTML screens are laid out at the real device width (402 pt) and scaled to
  // the drawn frame, so a smaller frame shrinks the screen instead of reflowing it.
  // On phone widths the screen is the device itself, so it fills it unscaled.
  const DEVICE_W = 402;
  const phoneView = window.matchMedia("(max-width: 760px)");
  function fitScreen() {
    const body = $("screen-body");
    const frame = body.querySelector("iframe");
    body.classList.toggle("has-frame", !!frame);
    if (!frame) return;
    if (phoneView.matches) {
      frame.style.cssText = "";
      return;
    }
    const k = body.clientWidth / DEVICE_W;
    frame.style.cssText = `width:${DEVICE_W}px;height:${body.clientHeight / k}px;transform:scale(${k});transform-origin:0 0`;
  }
  new ResizeObserver(fitScreen).observe($("screen-body"));

  function list(title, items, cls = "") {
    if (!items || !items.length) return "";
    const bell = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`;
    return `<h3>${title}</h3><ul>${items.map((t) => `<li class="${cls}">${cls === "ping" ? bell : ""}${esc(t)}</li>`).join("")}</ul>`;
  }

  function renderInfo(s, stop) {
    const st = data.statuses[s.status];
    $("screen-id").textContent = s.id;
    const where = stop.mode ? `${stop.mode === "vendor" ? "Vendor" : "Customer"} mode` : stop.sec.label;
    $("info").innerHTML = `
      <div class="crumb">${esc(where)} · ${esc(s.module.name)}</div>
      <h1>${esc(s.name)}</h1>
      <span class="status-pill"><span class="sdot ${s.status}"></span>${esc(st.label)}</span>
      <p class="summary">${esc(s.summary)}</p>
      ${list("On this screen", s.points)}
      ${list("Pings sent", s.notify, "ping")}
      ${s.note ? `<div class="note">${esc(s.note)}</div>` : ""}
      <div class="dev">
        ${list("Acceptance criteria", s.criteria, "check")}
        <h3>Requirements</h3>
        <ul><li><a href="${encPath(s.module.doc)}">${esc(s.module.doc)}</a></li></ul>
        ${s.refs.length ? `<h3>Reference files</h3><ul class="paths">${s.refs.map((r) => `<li><a class="path" href="${encPath(r)}" target="_blank" rel="noopener">${esc(r)}</a></li>`).join("")}</ul>` : ""}
        <h3>Tracking</h3>
        <ul><li>Change <code>status</code> for <code>${s.id}</code> in <code>app/screens.js</code>, then run <code>node scripts/build-tracker.mjs</code>.</li></ul>
      </div>`;
    $("info").classList.toggle("dev-on", state.dev);
    $("info").scrollTop = 0;
  }

  function select(hash, { push = true } = {}) {
    const stop = resolve(hash);
    const s = byId[stop.id];
    if (state.current !== stop.key) state.refIndex = 0;
    state.current = stop.key;
    // Shared screens read the mode from the session, so set it before the frame loads.
    if (stop.mode) appMode.set(stop.mode);
    if (push && location.hash.slice(1) !== stop.key) history.replaceState(null, "", "#" + stop.key);
    document.title = `${s.name} · PingMe Prototype`;
    renderTree();
    renderPhone(s);
    renderInfo(s, stop);
    document.querySelector('.tree a[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }

  function step(delta) {
    const i = stops.findIndex((x) => x.key === state.current);
    const next = stops[i + delta];
    if (next) select(next.key);
  }

  // Events
  $("nav-tree").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-key]");
    if (link) {
      e.preventDefault();
      select(link.dataset.key);
      return;
    }
    const tw = e.target.closest("[data-uid]");
    if (tw) {
      const id = tw.dataset.uid;
      state.closed.has(id) ? state.closed.delete(id) : state.closed.add(id);
      renderTree();
    }
  });
  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    state.filter = b.dataset.filter;
    renderFilters();
    renderTree();
  });
  $("refs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-ref]");
    if (!b) return;
    state.refIndex = Number(b.dataset.ref);
    renderPhone(byId[state.current]);
  });
  $("prev").addEventListener("click", () => step(-1));
  $("next").addEventListener("click", () => step(1));
  $("dev-toggle").addEventListener("click", () => {
    state.dev = !state.dev;
    store.set("dev", state.dev ? "1" : "0");
    $("dev-toggle").setAttribute("aria-pressed", String(state.dev));
    $("info").classList.toggle("dev-on", state.dev);
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea")) return;
    if (e.key === "ArrowDown" || e.key === "j") { e.preventDefault(); step(1); }
    if (e.key === "ArrowUp" || e.key === "k") { e.preventDefault(); step(-1); }
  });
  // On phones only the app screen is shown; swipe left/right to change screens.
  let touch = null;
  $("screen-body").addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touch = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  $("screen-body").addEventListener("touchend", (e) => {
    if (!touch) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.x;
    const dy = t.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2) step(dx < 0 ? 1 : -1);
  }, { passive: true });
  window.addEventListener("hashchange", () => select(location.hash.slice(1)));

  $("dev-toggle").setAttribute("aria-pressed", String(state.dev));
  renderFilters();
  select(location.hash.slice(1) || stops[0].key, { push: false });
})();

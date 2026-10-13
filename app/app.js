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

  const store = {
    get(k) { try { return localStorage.getItem("pingme." + k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("pingme." + k, v); } catch { /* storage unavailable */ } },
  };

  const state = {
    current: null,
    refIndex: 0,
    filter: "all",
    dev: store.get("dev") === "1",
    open: new Set(),
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

  function visible(s) {
    return state.filter === "all" || s.status === state.filter;
  }

  function renderTree() {
    let html = "";
    for (const role of data.roles) {
      const mods = data.modules.filter((m) => m.role === role.id && m.screens.some(visible));
      if (!mods.length) continue;
      html += `<div class="role">${esc(role.label)}</div>`;
      for (const m of mods) {
        const open = state.open.has(m.id) || state.filter !== "all";
        const done = m.screens.filter((s) => s.status === "done").length;
        html += `<div class="module${open ? " open" : ""}" data-module="${m.id}">
          <button aria-expanded="${open}"><span>${esc(m.name)}</span><span class="count">${done}/${m.screens.length}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
          <ul>${m.screens
            .filter(visible)
            .map(
              (s) => `<li><a href="#${s.id}" data-id="${s.id}"${state.current === s.id ? ' aria-current="page"' : ""}>
                <span>${esc(s.name)}</span><span class="sdot ${s.status}" title="${esc(data.statuses[s.status].label)}"></span></a></li>`
            )
            .join("")}</ul></div>`;
      }
    }
    $("nav-tree").innerHTML = html || `<div class="empty-filter">No screens with this status yet.</div>`;
  }

  function renderPhone(s) {
    const body = $("screen-body");
    body.scrollTop = 0;
    if (s.html) {
      body.innerHTML = `<iframe src="${encPath(s.html)}" title="${esc(s.name)}"></iframe>`;
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

    const i = screens.indexOf(s);
    $("prev").disabled = i === 0;
    $("next").disabled = i === screens.length - 1;
  }

  function list(title, items, cls = "") {
    if (!items || !items.length) return "";
    const bell = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`;
    return `<h3>${title}</h3><ul>${items.map((t) => `<li class="${cls}">${cls === "ping" ? bell : ""}${esc(t)}</li>`).join("")}</ul>`;
  }

  function renderInfo(s) {
    const st = data.statuses[s.status];
    $("screen-id").textContent = s.id;
    $("info").innerHTML = `
      <div class="crumb">${esc(s.module.name)}</div>
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

  function select(id, { push = true } = {}) {
    const s = byId[id] || screens[0];
    if (state.current !== s.id) state.refIndex = 0;
    state.current = s.id;
    state.open.add(s.module.id);
    if (push && location.hash.slice(1) !== s.id) history.replaceState(null, "", "#" + s.id);
    document.title = `${s.name} · PingMe Prototype`;
    renderTree();
    renderPhone(s);
    renderInfo(s);
    document.querySelector('.tree a[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }

  function step(delta) {
    const i = screens.findIndex((s) => s.id === state.current);
    const next = screens[i + delta];
    if (next) select(next.id);
  }

  // Events
  $("nav-tree").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-id]");
    if (link) {
      e.preventDefault();
      select(link.dataset.id);
      return;
    }
    const head = e.target.closest(".module > button");
    if (head) {
      const id = head.parentElement.dataset.module;
      state.open.has(id) ? state.open.delete(id) : state.open.add(id);
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
  window.addEventListener("hashchange", () => select(location.hash.slice(1), { push: false }));

  $("dev-toggle").setAttribute("aria-pressed", String(state.dev));
  renderFilters();
  select(location.hash.slice(1) || screens[0].id, { push: false });
})();

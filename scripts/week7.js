/* =========================================================
   Week 7: SEO and Accessibility Review
   1. Menu button (keyboard + aria-expanded)
   2. Metadata display
   3. Contrast checker (WCAG relative luminance formula)
   4. Filters with reset and a live status message
   5. Focus order log for keyboard walkthroughs
   6. Reflow readout (viewport width + horizontal scroll)
   7. Automated page audit + manual checklist
   ========================================================= */

// Lets CSS hide the nav behind the menu button only when JS is running.
document.documentElement.classList.add("js");

/* ---------- Shared helpers ---------- */

function collapse(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function truncate(text, max = 50) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

// Simplified accessible-name lookup (aria-labelledby > aria-label > label > content > alt).
function accessibleName(el) {
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    return collapse(
      labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent ?? "")
        .join(" ")
    );
  }

  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return collapse(ariaLabel);

  if (el.labels && el.labels.length > 0) {
    return collapse([...el.labels].map((label) => label.textContent).join(" "));
  }

  if (el.tagName === "IMG") return collapse(el.getAttribute("alt"));

  const text = collapse(el.textContent);
  if (text) return text;

  const imageAlt = collapse(
    [...el.querySelectorAll("img[alt]")].map((img) => img.alt).join(" ")
  );
  return imageAlt || collapse(el.getAttribute("title"));
}

/* =========================================================
   1. Menu button
   ========================================================= */

const menuButton = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");
const wideScreen = window.matchMedia("(min-width: 40em)");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  siteNav.classList.toggle("is-open", open);
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// Escape closes the menu and returns focus to the button (no keyboard trap).
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || wideScreen.matches) return;
  if (menuButton.getAttribute("aria-expanded") !== "true") return;

  setMenuOpen(false);
  menuButton.focus();
});

// On small screens, close the menu after picking a section link.
siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a") && !wideScreen.matches) {
    setMenuOpen(false);
  }
});

/* =========================================================
   2. Metadata display
   ========================================================= */

function showMetadata() {
  const title = document.title;
  const description =
    document.querySelector('meta[name="description"]')?.content ?? "";

  document.querySelector("#meta-title").textContent =
    `${title} (${title.length} characters)`;

  document.querySelector("#meta-description").textContent = description
    ? `${description} (${description.length} characters)`
    : "No meta description found.";
}

showMetadata();

/* =========================================================
   3. Contrast checker
   ========================================================= */

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

// WCAG 2.x relative luminance.
function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgbA, rgbB) {
  const lumA = relativeLuminance(rgbA);
  const lumB = relativeLuminance(rgbB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

const contrastForm = document.querySelector("#contrast-form");
const fgInput = document.querySelector("#fg-color");
const bgInput = document.querySelector("#bg-color");
const contrastPreview = document.querySelector("#contrast-preview");
const contrastOutput = document.querySelector("#contrast-ratio");
const contrastResults = document.querySelector("#contrast-results");

const contrastLevels = [
  { label: "AA normal text", min: 4.5 },
  { label: "AA large text (24px, or 18.66px bold)", min: 3 },
  { label: "AA user interface components", min: 3 },
  { label: "AAA normal text", min: 7 },
];

function updateContrast() {
  const fg = fgInput.value;
  const bg = bgInput.value;
  const ratio = contrastRatio(hexToRgb(fg), hexToRgb(bg));

  contrastPreview.style.color = fg;
  contrastPreview.style.backgroundColor = bg;
  contrastOutput.textContent = `${ratio.toFixed(2)}:1`;

  contrastResults.replaceChildren(
    ...contrastLevels.map(({ label, min }) => {
      const passes = ratio >= min;
      const item = document.createElement("li");
      const result = document.createElement("span");
      result.className = passes ? "pass" : "fail";
      result.textContent = passes ? "Pass" : "Fail";
      item.append(result, ` ${label} (needs ${min}:1)`);
      return item;
    })
  );
}

contrastForm.addEventListener("input", updateContrast);
updateContrast();

/* =========================================================
   4. Filters with reset and live status
   ========================================================= */

const filterForm = document.querySelector("#filter-form");
const filterReset = document.querySelector("#filter-reset");
const filterStatus = document.querySelector("#filter-status");
const filterItems = [...document.querySelectorAll("#filter-items > li")];
const categoryBoxes = [...filterForm.querySelectorAll('input[name="category"]')];

function applyFilters(prefix = "") {
  const active = categoryBoxes.filter((box) => box.checked).map((box) => box.value);
  let shown = 0;

  filterItems.forEach((item) => {
    const visible = active.includes(item.dataset.category);
    item.hidden = !visible;
    if (visible) shown += 1;
  });

  const summary =
    shown === 0
      ? "No items match. Select a category or reset the filters."
      : `Showing ${shown} of ${filterItems.length} items.`;

  filterStatus.textContent = `${prefix}${summary}`;
}

filterForm.addEventListener("change", () => applyFilters());

filterReset.addEventListener("click", () => {
  categoryBoxes.forEach((box) => {
    box.checked = true;
  });
  applyFilters("Filters reset. ");
});

/* =========================================================
   5. Focus order log
   ========================================================= */

const focusRecord = document.querySelector("#focus-record");
const focusClear = document.querySelector("#focus-clear");
const focusLog = document.querySelector("#focus-log");
const MAX_LOG_ENTRIES = 40;

function describeElement(el) {
  const tag = el.tagName.toLowerCase();
  let kind = el.getAttribute("role") || tag;

  if (tag === "a") kind = "link";
  if (tag === "input") kind = `${el.type} input`;

  const name = truncate(accessibleName(el) || "(no accessible name)");
  return `${kind}: ${name}`;
}

function onFocusIn(event) {
  const entry = document.createElement("li");
  entry.textContent = describeElement(event.target);
  focusLog.append(entry);

  while (focusLog.children.length > MAX_LOG_ENTRIES) {
    focusLog.firstElementChild.remove();
  }
}

focusRecord.addEventListener("click", () => {
  const recording = focusRecord.getAttribute("aria-pressed") !== "true";
  focusRecord.setAttribute("aria-pressed", String(recording));

  if (recording) {
    document.addEventListener("focusin", onFocusIn);
  } else {
    document.removeEventListener("focusin", onFocusIn);
  }
});

focusClear.addEventListener("click", () => {
  focusLog.replaceChildren();
});

/* =========================================================
   6. Reflow readout
   ========================================================= */

const viewportWidth = document.querySelector("#viewport-width");
const horizontalScroll = document.querySelector("#horizontal-scroll");
let reflowFrame = 0;

function updateReflow() {
  const width = document.documentElement.clientWidth;
  const scrolls =
    document.documentElement.scrollWidth > document.documentElement.clientWidth;

  viewportWidth.textContent =
    `${width} CSS pixels${width <= 320 ? " (at or below the 320px reflow target)" : ""}`;
  horizontalScroll.textContent = scrolls ? "Detected" : "None detected";
}

window.addEventListener("resize", () => {
  cancelAnimationFrame(reflowFrame);
  reflowFrame = requestAnimationFrame(updateReflow);
});

updateReflow();

/* =========================================================
   7. Automated audit
   ========================================================= */

const GENERIC_LINK_TEXT = ["click here", "here", "read more", "more", "learn more", "link"];

function result(name, pass, details) {
  return { name, pass, details };
}

function checkLanguage() {
  const lang = document.documentElement.lang;
  return result("Page language", Boolean(lang), lang ? `lang="${lang}"` : "Missing lang attribute on <html>.");
}

function checkTitle() {
  const length = document.title.trim().length;
  const pass = length >= 10 && length <= 60;
  return result("Page title", pass, `${length} characters (aim for 10-60).`);
}

function checkDescription() {
  const content = document.querySelector('meta[name="description"]')?.content.trim() ?? "";
  const pass = content.length >= 50 && content.length <= 160;
  return result(
    "Meta description",
    pass,
    content ? `${content.length} characters (aim for 50-160).` : "No meta description found."
  );
}

function checkSingleH1() {
  const count = document.querySelectorAll("h1").length;
  return result("One h1", count === 1, `Found ${count} h1 element${count === 1 ? "" : "s"}.`);
}

function checkHeadingOrder() {
  const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  const skips = [];
  let previous = 0;

  headings.forEach((heading) => {
    const level = Number(heading.tagName[1]);
    if (previous && level > previous + 1) {
      skips.push(`h${previous} to h${level} ("${truncate(collapse(heading.textContent), 30)}")`);
    }
    previous = level;
  });

  return result(
    "Heading order",
    skips.length === 0,
    skips.length ? `Skipped levels: ${skips.join("; ")}.` : `${headings.length} headings, no skipped levels.`
  );
}

function checkLandmarks() {
  const required = ["header", "nav", "main", "footer"];
  const missing = required.filter((tag) => !document.querySelector(tag));
  const mainCount = document.querySelectorAll("main").length;
  const pass = missing.length === 0 && mainCount === 1;

  let details = "header, nav, main, and footer are present.";
  if (missing.length) details = `Missing: ${missing.join(", ")}.`;
  else if (mainCount !== 1) details = `Found ${mainCount} main elements (expected 1).`;

  return result("Landmarks", pass, details);
}

function checkImages() {
  const images = [...document.querySelectorAll("img")];
  const missing = images.filter((img) => !img.hasAttribute("alt"));
  const decorative = images.filter((img) => img.getAttribute("alt") === "").length;
  const informative = images.length - missing.length - decorative;

  return result(
    "Image alt text",
    missing.length === 0,
    `${informative} informative, ${decorative} decorative (alt=""), ${missing.length} missing alt.`
  );
}

function checkLinks() {
  const links = [...document.querySelectorAll("a[href]")];
  const problems = links
    .map((link) => accessibleName(link))
    .filter((name) => !name || GENERIC_LINK_TEXT.includes(name.toLowerCase()));

  return result(
    "Link text",
    problems.length === 0,
    problems.length
      ? `${problems.length} empty or vague link${problems.length === 1 ? "" : "s"}: ${problems.map((p) => `"${p}"`).join(", ")}.`
      : `${links.length} links, all with descriptive text.`
  );
}

function checkFormLabels() {
  const controls = [...document.querySelectorAll("input:not([type='hidden']), select, textarea")];
  const unlabeled = controls.filter((control) => !accessibleName(control));

  return result(
    "Form labels",
    unlabeled.length === 0,
    `${controls.length - unlabeled.length} of ${controls.length} controls have a label.`
  );
}

function checkButtonNames() {
  const buttons = [...document.querySelectorAll("button")];
  const unnamed = buttons.filter((button) => !accessibleName(button));

  return result(
    "Button names",
    unnamed.length === 0,
    `${buttons.length - unnamed.length} of ${buttons.length} buttons have an accessible name.`
  );
}

function checkDuplicateIds() {
  const seen = new Set();
  const duplicates = new Set();

  document.querySelectorAll("[id]").forEach((el) => {
    if (seen.has(el.id)) duplicates.add(el.id);
    seen.add(el.id);
  });

  return result(
    "Unique IDs",
    duplicates.size === 0,
    duplicates.size ? `Duplicates: ${[...duplicates].join(", ")}.` : `${seen.size} IDs, all unique.`
  );
}

/* ---- Text contrast audit ---- */

function parseColor(value) {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const [r, g, b, a = 1] = match[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return { rgb: [r, g, b], alpha: a };
}

// Walks up the tree to find the first non-transparent background.
function effectiveBackground(el) {
  for (let node = el; node && node.nodeType === Node.ELEMENT_NODE; node = node.parentElement) {
    const color = parseColor(getComputedStyle(node).backgroundColor);
    if (color && color.alpha > 0) return color.rgb;
  }
  return [255, 255, 255];
}

function hasOwnText(el) {
  return [...el.childNodes].some(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
  );
}

function checkTextContrast() {
  const elements = [...document.body.querySelectorAll("*")].filter(
    (el) =>
      hasOwnText(el) &&
      !el.closest("[data-audit-ignore], script, style") &&
      el.getClientRects().length > 0
  );

  let lowest = Infinity;
  const failures = [];

  elements.forEach((el) => {
    const style = getComputedStyle(el);
    const fg = parseColor(style.color);
    if (!fg) return;

    const ratio = contrastRatio(fg.rgb, effectiveBackground(el));
    const size = parseFloat(style.fontSize);
    const bold = Number(style.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const required = large ? 3 : 4.5;

    lowest = Math.min(lowest, ratio);
    if (ratio < required) {
      failures.push(`<${el.tagName.toLowerCase()}> ${ratio.toFixed(2)}:1`);
    }
  });

  return result(
    "Text contrast (AA)",
    failures.length === 0,
    failures.length
      ? `${failures.length} below AA: ${failures.slice(0, 5).join(", ")}.`
      : `${elements.length} text elements checked; lowest ratio ${lowest.toFixed(2)}:1.`
  );
}

/* ---- Run and render ---- */

const runAuditButton = document.querySelector("#run-audit");
const auditBody = document.querySelector("#audit-body");
const auditStatus = document.querySelector("#audit-status");

function runAudit() {
  const results = [
    checkLanguage(),
    checkTitle(),
    checkDescription(),
    checkSingleH1(),
    checkHeadingOrder(),
    checkLandmarks(),
    checkImages(),
    checkLinks(),
    checkFormLabels(),
    checkButtonNames(),
    checkDuplicateIds(),
    checkTextContrast(),
  ];

  auditBody.replaceChildren(
    ...results.map(({ name, pass, details }) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("th");
      nameCell.scope = "row";
      nameCell.textContent = name;

      const resultCell = document.createElement("td");
      const label = document.createElement("span");
      label.className = pass ? "pass" : "fail";
      label.textContent = pass ? "Pass" : "Fail";
      resultCell.append(label);

      const detailsCell = document.createElement("td");
      detailsCell.textContent = details;

      row.append(nameCell, resultCell, detailsCell);
      return row;
    })
  );

  const passed = results.filter((r) => r.pass).length;
  const time = new Date().toLocaleTimeString();
  auditStatus.textContent = `Audit complete at ${time}: ${passed} of ${results.length} checks passed.`;
}

runAuditButton.addEventListener("click", runAudit);

/* ---- Manual checklist ---- */

const manualForm = document.querySelector("#manual-form");
const manualStatus = document.querySelector("#manual-status");
const manualBoxes = [...manualForm.querySelectorAll('input[type="checkbox"]')];

manualForm.addEventListener("change", () => {
  const done = manualBoxes.filter((box) => box.checked).length;
  manualStatus.textContent = `${done} of ${manualBoxes.length} manual checks complete.`;
});

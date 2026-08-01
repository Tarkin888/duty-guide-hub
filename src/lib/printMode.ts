/**
 * Print mode: makes "Print Module" produce a complete, A4-friendly document.
 *
 * Every print button in the app calls window.print(). Rather than editing each
 * call site, we wrap window.print() once so that before the print dialog opens
 * we:
 *   1. flag the document as printing (so all tab panels force-mount and print)
 *   2. inject a print header (module title + date) and footer
 *   3. wait two animation frames so React can flush the newly mounted panels
 */

let printing = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeToPrintMode(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPrintModeSnapshot() {
  return printing;
}

function formatPrintDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getDocumentTitleText() {
  const heading =
    document.querySelector("main h1") ?? document.querySelector("h1");
  const text = heading?.textContent?.trim();
  return text && text.length > 0 ? text : "Consumer Duty Playbook";
}

function ensureElement(id: string, className: string) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
  el.className = className;
  el.setAttribute("aria-hidden", "true");
  return el;
}

function mountPrintFurniture() {
  const title = getDocumentTitleText();
  const date = formatPrintDate(new Date());

  const header = ensureElement("print-header", "print-furniture print-furniture--header");
  header.innerHTML = "";

  const titleEl = document.createElement("span");
  titleEl.className = "print-furniture__title";
  titleEl.textContent = title;

  const dateEl = document.createElement("span");
  dateEl.className = "print-furniture__meta";
  dateEl.textContent = `Consumer Duty Playbook — printed ${date}`;

  header.append(titleEl, dateEl);

  const footer = ensureElement("print-footer", "print-furniture print-furniture--footer");
  footer.innerHTML = "";
  const footerText = document.createElement("span");
  footerText.className = "print-furniture__meta";
  footerText.textContent = `${title} — ${date}`;
  const pageNo = document.createElement("span");
  pageNo.className = "print-furniture__page";
  footer.append(footerText, pageNo);
}

function setPrinting(next: boolean) {
  if (printing === next) return;
  printing = next;
  document.documentElement.classList.toggle("is-printing", next);
  emit();
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

let installed = false;

export function installPrintMode() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const nativePrint = window.print.bind(window);

  const patched = async () => {
    setPrinting(true);
    mountPrintFurniture();
    // Two frames: one for React to render force-mounted panels, one for layout.
    await nextFrame();
    await nextFrame();
    try {
      nativePrint();
    } finally {
      // Leave print mode once the dialog has closed (afterprint also fires).
      window.setTimeout(() => setPrinting(false), 500);
    }
  };

  window.print = (() => {
    void patched();
  }) as typeof window.print;

  window.addEventListener("afterprint", () => setPrinting(false));
}

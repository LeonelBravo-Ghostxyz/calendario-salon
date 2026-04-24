import { c as createComponent } from './astro-component_DkfE1_Jy.mjs';
import { l as createRenderInstruction, h as addAttribute, n as renderHead, r as renderTemplate, o as renderSlot, m as maybeRenderHead, p as renderComponent } from './entrypoint_K_eWHUp6.mjs';
import { c as clientPromise } from './database_AVDriSRJ.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { backgroundUrl } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Calendario de Reservas</title>${renderHead()}</head> <body> ${backgroundUrl && renderTemplate`<div class="custom-bg"${addAttribute(`background-image: url('${backgroundUrl}');`, "style")}></div>`} ${renderSlot($$result, $$slots["default"])} <button id="themeToggle" class="theme-btn" title="Cambiar Tema"> <span class="icon-sun">☀️</span> <span class="icon-moon">🌙</span> </button> ${renderScript($$result, "/home/leonel/Documents/Dev/web/calendario-salon/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/leonel/Documents/Dev/web/calendario-salon/src/layouts/Layout.astro", void 0);

const $$NavBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/home/leonel/Documents/Dev/web/calendario-salon/src/components/NavBar.astro", void 0);

const $$Calendario = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="calendar-panel glass-container" data-astro-cid-i6vfiiou> <header class="calendar-header" data-astro-cid-i6vfiiou> <button id="prevMonth" class="nav-btn" data-astro-cid-i6vfiiou>&lt;</button> <div style="display:flex; align-items:center; gap:0.8rem;" data-astro-cid-i6vfiiou> <h2 id="monthYearTitle" class="calendar-title" title="Buscar mes" data-astro-cid-i6vfiiou>Cargando...</h2> <button id="btnUnlock" class="nav-btn" style="background:transparent; border: 1px solid rgba(255,255,255,0.2); padding: 0.3rem 0.6rem;" title="Ingresar como Administrador" data-astro-cid-i6vfiiou>🔒</button> </div> <button id="nextMonth" class="nav-btn" data-astro-cid-i6vfiiou>&gt;</button> </header> <div class="calendar-grid days-of-week" data-astro-cid-i6vfiiou> <span data-astro-cid-i6vfiiou>Dom</span><span data-astro-cid-i6vfiiou>Lun</span><span data-astro-cid-i6vfiiou>Mar</span><span data-astro-cid-i6vfiiou>Mié</span><span data-astro-cid-i6vfiiou>Jue</span><span data-astro-cid-i6vfiiou>Vie</span><span data-astro-cid-i6vfiiou>Sáb</span> </div> <div id="calendarGrid" class="calendar-grid days-grid" data-astro-cid-i6vfiiou></div> </div> <div id="toastOverlay" class="toast-overlay hidden" data-astro-cid-i6vfiiou> <div class="glass-popover" id="toastBox" data-astro-cid-i6vfiiou></div> </div>  ${renderScript($$result, "/home/leonel/Documents/Dev/web/calendario-salon/src/components/Calendario.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/leonel/Documents/Dev/web/calendario-salon/src/components/Calendario.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let backgroundUrl = null;
  try {
    const client = await clientPromise;
    const db = client.db("salonDB");
    const config = await db.collection("config").findOne({ key: "settings" });
    if (config && config.bgUrl) {
      backgroundUrl = config.bgUrl;
    }
  } catch (error) {
    console.error("No se pudo obtener el fondo de la BD:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "backgroundUrl": backgroundUrl }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, {})} ${maybeRenderHead()}<main style="padding: 2rem;"> ${renderComponent($$result2, "Calendario", $$Calendario, {})} </main> ` })}`;
}, "/home/leonel/Documents/Dev/web/calendario-salon/src/pages/index.astro", void 0);

const $$file = "/home/leonel/Documents/Dev/web/calendario-salon/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

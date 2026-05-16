import { computed, ref, watch, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { u as usePage, a as useForm, h as head_default } from "../ssr.js";
import draggable from "vuedraggable";
import MenuItem from "./MenuItem-BUeunemV.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const locales = computed(
      () => page.props.config?.supportedLocales || { uk: "Українська" }
    );
    const selectedMenuIndex = ref(0);
    const activeAccordion = ref("custom");
    const showCreateMenuModal = ref(false);
    const activeMenu = computed(
      () => props.data.menus[selectedMenuIndex.value] || null
    );
    const customLink = ref({
      label: {},
      url: ""
    });
    const initLabels = () => {
      const labels = {};
      const keys = Object.keys(locales.value);
      if (keys.length > 0) {
        keys.forEach((lang) => {
          labels[lang] = "";
        });
      } else {
        labels["uk"] = "";
      }
      customLink.value.label = labels;
    };
    watch(locales, () => initLabels(), { immediate: true });
    const newMenuForm = useForm({
      name: "",
      slug: ""
    });
    const structureForm = useForm({
      menus: props.data.menus
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), { title: "Конструктор меню" }, null, _parent));
      _push(`<div class="p-6 max-w-[1600px] mx-auto antialiased font-sans text-slate-900 bg-slate-50/30 min-h-screen"><div class="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm"><div class="flex items-center gap-4"><div class="p-2.5 bg-slate-900 rounded shadow-lg text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></div><div><h1 class="text-xl font-extrabold tracking-tight text-slate-800"> Навігація </h1><p class="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold leading-none mt-1"> Керування структурою сайту </p></div></div><div class="flex items-center gap-3">`);
      if (unref(structureForm).recentlySuccessful) {
        _push(`<div class="text-xs text-emerald-600 font-bold animate-fade-out"> ✓ ЗМІНИ ЗБЕРЕЖЕНО </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(unref(structureForm).processing) ? " disabled" : ""} class="bg-slate-900 hover:bg-black text-white px-8 py-2.5 rounded text-xs font-bold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50">`);
      if (unref(structureForm).processing) {
        _push(`<span class="animate-spin text-sm">◌</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ЗБЕРЕГТИ ВСЕ </button></div></div><div class="flex gap-6"><div class="w-80 shrink-0 space-y-4"><div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"><div class="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center"><h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest"> Групи меню </h3><button class="text-[10px] bg-white border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-50 font-bold shadow-sm transition-all"> + СТВОРИТИ </button></div><div class="p-2 space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar"><!--[-->`);
      ssrRenderList(__props.data.menus, (menu, idx) => {
        _push(`<div class="${ssrRenderClass([
          "group flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition-all border",
          selectedMenuIndex.value === idx ? "bg-slate-900 border-slate-900 text-white shadow-md" : "border-transparent text-slate-600 hover:bg-slate-100 hover:border-slate-200"
        ])}"><div class="flex flex-col"><span class="text-xs font-bold truncate">${ssrInterpolate(menu.name)}</span><span class="text-[9px] font-mono opacity-50 uppercase">${ssrInterpolate(menu.slug)}</span></div>`);
        if (selectedMenuIndex.value === idx) {
          _push(`<div class="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"><button class="${ssrRenderClass([{
        "bg-slate-50/50 border-b border-slate-100": activeAccordion.value === "custom"
      }, "w-full flex justify-between items-center p-3 hover:bg-slate-50 transition-colors"])}"><span class="text-[10px] font-black uppercase tracking-widest text-slate-600">Своє посилання</span><span class="text-slate-400 font-mono text-xs">${ssrInterpolate(activeAccordion.value === "custom" ? "−" : "+")}</span></button><div class="p-4 space-y-4" style="${ssrRenderStyle(activeAccordion.value === "custom" ? null : { display: "none" })}"><div class="grid grid-cols-2 gap-2"><button class="bg-slate-100 text-slate-600 py-1.5 rounded text-[9px] font-black hover:bg-slate-200 transition-colors uppercase tracking-tighter"> Головна </button><button class="bg-slate-100 text-slate-600 py-1.5 rounded text-[9px] font-black hover:bg-slate-200 transition-colors uppercase tracking-tighter"> Заглушка # </button></div><div class="space-y-3"><!--[-->`);
      ssrRenderList(locales.value, (langName, langCode) => {
        _push(`<div><label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block ml-1">Назва (${ssrInterpolate(langCode)})</label><input${ssrRenderAttr("value", customLink.value.label[langCode])} type="text" class="w-full text-xs border-slate-200 rounded p-2 focus:ring-1 focus:ring-slate-400 bg-slate-50/50 font-semibold"></div>`);
      });
      _push(`<!--]--><div><label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block ml-1">URL / Шлях</label><input${ssrRenderAttr("value", customLink.value.url)} type="text" class="w-full text-xs border-slate-200 rounded p-2 focus:ring-1 focus:ring-slate-400 bg-slate-50/50 font-mono"></div></div><button class="w-full bg-slate-800 text-white text-[10px] py-3 rounded hover:bg-black transition-all font-bold uppercase tracking-widest"> Додати в список </button></div></div><div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"><button class="w-full flex justify-between items-center p-3 hover:bg-slate-50 transition-colors"><span class="text-[10px] font-black uppercase tracking-widest text-slate-600">Сторінки</span><span class="text-slate-400 text-xs">${ssrInterpolate(activeAccordion.value === "pages" ? "−" : "+")}</span></button><div class="max-h-64 overflow-y-auto custom-scrollbar border-t border-slate-100" style="${ssrRenderStyle(activeAccordion.value === "pages" ? null : { display: "none" })}"><!--[-->`);
      ssrRenderList(__props.data.availablePages, (page2) => {
        _push(`<div class="flex justify-between items-center p-2.5 px-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"><span class="text-xs font-semibold text-slate-600 truncate mr-2">${ssrInterpolate(page2.title)}</span><button class="text-xs font-bold text-slate-300 hover:text-slate-900 transition-colors"> + </button></div>`);
      });
      _push(`<!--]--></div></div></div><div class="flex-1 min-w-0"><div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 min-h-[calc(100vh-180px)] flex flex-col relative overflow-hidden">`);
      if (activeMenu.value) {
        _push(`<div class="flex-1 flex flex-col"><div class="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4"><div class="h-2 w-2 rounded-full bg-slate-900"></div><h2 class="text-sm font-black uppercase tracking-widest text-slate-800"> Редагування: ${ssrInterpolate(activeMenu.value.name)}</h2><span class="ml-auto text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">ID: ${ssrInterpolate(activeMenu.value.slug)}</span></div><div class="bg-slate-50/30 rounded-lg p-4 border border-slate-100 flex-1 overflow-y-auto custom-scrollbar">`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: activeMenu.value.items,
          "onUpdate:modelValue": ($event) => activeMenu.value.items = $event,
          "item-key": "id",
          group: "menuItems",
          animation: 200,
          "ghost-class": "ghost-item",
          class: "space-y-2 pb-20"
        }, {
          item: withCtx(({ element, index }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(MenuItem, {
                item: element,
                index,
                list: activeMenu.value.items
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(MenuItem, {
                  item: element,
                  index,
                  list: activeMenu.value.items
                }, null, 8, ["item", "index", "list"])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (activeMenu.value.items.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center py-32 text-slate-300"><p class="text-xs font-bold uppercase tracking-widest"> Меню порожнє </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="flex-1 flex items-center justify-center bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest"> Оберіть меню для роботи </div>`);
      }
      _push(`</div></div></div>`);
      if (showCreateMenuModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div><div class="bg-white p-8 rounded-lg w-full max-w-sm shadow-2xl relative border border-slate-200"><h2 class="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight"> Нова група </h2><form class="space-y-5"><div><label class="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-wider">Назва</label><input${ssrRenderAttr("value", unref(newMenuForm).name)} type="text" class="w-full border-slate-200 rounded p-3 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-slate-900 outline-none" required></div><div><label class="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-wider">Системний ID</label><input${ssrRenderAttr("value", unref(newMenuForm).slug)} type="text" class="w-full border-slate-200 rounded p-3 text-xs font-mono bg-slate-50 focus:ring-2 focus:ring-slate-900 outline-none" required></div><div class="flex gap-2 pt-2"><button type="button" class="flex-1 px-4 py-3 rounded text-xs font-bold text-slate-500 hover:bg-slate-50 uppercase"> Скасувати </button><button type="submit" class="flex-1 bg-slate-900 text-white py-3 rounded text-xs font-bold hover:bg-black uppercase tracking-widest"> Створити </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Menus/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

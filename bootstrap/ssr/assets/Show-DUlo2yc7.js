import { computed, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { l as link_default } from "../ssr.js";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-CIgX8a9s.js";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { IconEdit, IconMapPin, IconCheck, IconCopy, IconExternalLink, IconPhone, IconClock } from "@tabler/icons-vue";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-BnllGgH-.js";
import "./Breadcrumbs-BaC6CclY.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-ClfPV3Yy.js";
import "./VarDump-DqvrPBoK.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    auth: { type: Object }
    // Передаємо дані авторизації для перевірки прав (опціонально)
  },
  setup(__props) {
    const props = __props;
    const warehouse = computed(
      () => props.data?.warehouse?.data || props.data?.warehouse || props.data || {}
    );
    const isCopied = ref(false);
    const isCurrentlyOpen = computed(() => {
      if (!warehouse.value.working_hours) return null;
      const now = /* @__PURE__ */ new Date();
      const currentHour = now.getHours();
      const hoursMatch = warehouse.value.working_hours.match(
        /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
      );
      if (!hoursMatch) return null;
      const startHour = parseInt(hoursMatch[1], 10);
      const endHour = parseInt(hoursMatch[3], 10);
      return currentHour >= startHour && currentHour < endHour;
    });
    const embedMapUrl = computed(() => {
      if (!warehouse.value.address) return null;
      const fullAddress = `${warehouse.value.city || ""} ${warehouse.value.address}`;
      return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto px-4 py-6 space-y-8" }, _attrs))}><div class="relative h-[280px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group"><div class="absolute inset-0 w-full h-full">`);
      if (warehouse.value.image) {
        _push(ssrRenderComponent(ImageDataView, {
          src: warehouse.value.image,
          configs: { width: "100%", height: "100%" },
          class: "w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-700"
        }, null, _parent));
      } else {
        _push(`<div class="w-full h-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 opacity-95"></div>`);
      }
      _push(`</div><div class="absolute top-4 right-4 z-10 flex items-center space-x-2">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: _ctx.route("admin.settings.commerce.warehouses.edit", {
          id: warehouse.value.id
        }),
        class: "inline-flex items-center space-x-1.5 px-4 py-2 bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 text-xs font-bold rounded-xl shadow-sm transition transform active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconEdit), {
              size: "14",
              class: "text-slate-600"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Редагувати склад</span>`);
          } else {
            return [
              createVNode(unref(IconEdit), {
                size: "14",
                class: "text-slate-600"
              }),
              createVNode("span", null, "Редагувати склад")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div><div class="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-2 text-white">`);
      if (warehouse.value.city) {
        _push(`<div class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/20 backdrop-blur-md text-white uppercase tracking-wider">${ssrInterpolate(warehouse.value.city)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm">${ssrInterpolate(warehouse.value.title)}</h1></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4"><div class="space-y-3"><div class="flex items-center justify-between text-slate-900"><div class="flex items-center space-x-2"><div class="p-2 bg-slate-50 rounded-xl text-slate-600">`);
      _push(ssrRenderComponent(unref(IconMapPin), { size: "20" }, null, _parent));
      _push(`</div><h3 class="font-bold text-base"> Адреса та локація </h3></div>`);
      if (warehouse.value.address) {
        _push(`<button class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition" title="Копіювати адресу">`);
        if (isCopied.value) {
          _push(ssrRenderComponent(unref(IconCheck), {
            size: "16",
            class: "text-green-600"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(IconCopy), { size: "16" }, null, _parent));
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-sm text-slate-600 leading-relaxed pt-1">${ssrInterpolate(warehouse.value.address || "Адресу не вказано")}</p></div>`);
      if (warehouse.value.map_link) {
        _push(`<div class="pt-2"><a${ssrRenderAttr("href", warehouse.value.map_link)} target="_blank" class="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition group/link"><span>Пряме посилання на Google Maps</span>`);
        _push(ssrRenderComponent(unref(IconExternalLink), {
          size: "14",
          class: "transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition duration-200"
        }, null, _parent));
        _push(`</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3"><div class="flex items-center space-x-2 text-slate-900"><div class="p-2 bg-slate-50 rounded-xl text-slate-600">`);
      _push(ssrRenderComponent(unref(IconPhone), { size: "20" }, null, _parent));
      _push(`</div><h3 class="font-bold text-base">Зв&#39;язок з філіалом</h3></div><div class="space-y-1 pt-1">`);
      if (warehouse.value.phone) {
        _push(`<div><a${ssrRenderAttr("href", `tel:${warehouse.value.phone.replace(/\s+/g, "")}`)} class="text-lg font-extrabold text-slate-900 hover:text-blue-600 transition tracking-tight block">${ssrInterpolate(warehouse.value.phone)}</a><span class="text-[11px] text-slate-400 block mt-0.5">Клікніть для швидкого дзвінка</span></div>`);
      } else {
        _push(`<p class="text-sm font-medium text-slate-500">—</p>`);
      }
      _push(`</div></div><div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3"><div class="flex items-center justify-between"><div class="flex items-center space-x-2 text-slate-900"><div class="p-2 bg-slate-50 rounded-xl text-slate-600">`);
      _push(ssrRenderComponent(unref(IconClock), { size: "20" }, null, _parent));
      _push(`</div><h3 class="font-bold text-base">Графік роботи</h3></div>`);
      if (isCurrentlyOpen.value !== null) {
        _push(`<div>`);
        if (isCurrentlyOpen.value) {
          _push(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200"> Відкрито </span>`);
        } else {
          _push(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200"> Зачинено </span>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line pt-1">${ssrInterpolate(warehouse.value.working_hours || "Інформація тимчасово відсутня")}</p></div></div>`);
      if (embedMapUrl.value) {
        _push(`<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-2"><div class="w-full h-[380px] rounded-xl overflow-hidden bg-slate-50"><iframe width="100%" height="100%" frameborder="0" style="${ssrRenderStyle({ "border": "0" })}"${ssrRenderAttr("src", embedMapUrl.value)} allowfullscreen loading="lazy"></iframe></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Settings/Warehouses/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { IconRocket, IconCircleCheck, IconCircleDashed, IconLock, IconCalendar, IconUsers, IconPackage, IconAlertTriangle, IconCurrencyDollar } from "@tabler/icons-vue";
import { _ as _sfc_main$2 } from "./DashboardAdminLayout-BkxoySxl.js";
import "./AdminLayout-Dz4Fusn0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useLocales-Cm2D8rND.js";
const _sfc_main$1 = {
  __name: "VersionsTimeline",
  __ssrInlineRender: true,
  props: {
    versions: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const processedVersions = computed(() => {
      return [...props.versions].map((v) => {
        const total = v.items_count ?? v.items?.length ?? 0;
        const completed = v.completed_items_count ?? v.items?.filter((i) => i.is_completed).length ?? 0;
        const percent = total > 0 ? Math.round(completed / total * 100) : 0;
        return { ...v, progress_percent: percent };
      }).sort((a, b) => {
        if (a.status !== "completed" && b.status === "completed") return -1;
        if (a.status === "completed" && b.status !== "completed") return 1;
        return b.version.localeCompare(a.version, void 0, {
          numeric: true
        });
      });
    });
    const getItemColor = (type) => {
      const colors = {
        feature: "text-emerald-500",
        fix: "text-rose-500",
        improvement: "text-blue-500"
      };
      return colors[type] || "text-slate-400";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border rounded-lg shadow-sm overflow-hidden text-slate-900" }, _attrs))}><div class="bg-slate-50 border-b p-3 flex justify-between items-center"><h3 class="text-xs uppercase font-bold text-slate-600 tracking-wider">${ssrInterpolate(_ctx.$t("Latest Updates"))}</h3>`);
      _push(ssrRenderComponent(unref(IconRocket), {
        size: "16",
        class: "text-indigo-500"
      }, null, _parent));
      _push(`</div><div class="p-4 relative">`);
      if (processedVersions.value.length > 0) {
        _push(`<div class="space-y-6 relative"><div class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div><!--[-->`);
        ssrRenderList(processedVersions.value, (version) => {
          _push(`<div class="relative pl-8"><div class="${ssrRenderClass([{
            "bg-emerald-500": version.status === "completed",
            "bg-amber-400": version.status === "active",
            "bg-slate-300": version.status === "draft"
          }, "absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-colors"])}">`);
          if (version.status === "completed") {
            _push(ssrRenderComponent(unref(IconCircleCheck), {
              size: "12",
              class: "text-white"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(IconCircleDashed), {
              size: "12",
              class: ["text-white", {
                "animate-spin-slow": version.status === "active"
              }]
            }, null, _parent));
          }
          _push(`</div><div class="flex flex-col gap-1"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="font-mono font-bold text-sm text-indigo-600">v${ssrInterpolate(version.version)}</span>`);
          if (version.status === "completed") {
            _push(ssrRenderComponent(unref(IconLock), {
              size: "12",
              class: "text-slate-300"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (version.status === "completed") {
            _push(`<span class="text-[10px] text-slate-400 flex items-center gap-1">`);
            _push(ssrRenderComponent(unref(IconCalendar), { size: "12" }, null, _parent));
            _push(` ${ssrInterpolate(version.released_at_human)}</span>`);
          } else {
            _push(`<span class="${ssrRenderClass([
              version.status === "active" ? "text-amber-500" : "text-slate-400",
              "text-[10px] font-bold uppercase tracking-tighter"
            ])}">${ssrInterpolate(version.status === "active" ? _ctx.$t("In Progress") : _ctx.$t("Draft"))}</span>`);
          }
          _push(`</div><div class="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden"><div class="${ssrRenderClass([
            version.status === "completed" ? "bg-emerald-400" : "bg-indigo-500",
            "h-full transition-all duration-1000 ease-out"
          ])}" style="${ssrRenderStyle({
            width: `${version.progress_percent}%`
          })}"></div></div>`);
          if (version.items?.length) {
            _push(`<ul class="mt-2 space-y-1.5 text-[11px]"><!--[-->`);
            ssrRenderList(version.items.slice(0, 5), (item) => {
              _push(`<li class="flex items-start gap-2"><span class="${ssrRenderClass([getItemColor(item.type), "mt-0.5 flex-shrink-0"])}">`);
              if (item.is_completed) {
                _push(ssrRenderComponent(unref(IconCircleCheck), { size: "10" }, null, _parent));
              } else {
                _push(`<span class="px-1 text-[8px]">●</span>`);
              }
              _push(`</span><span class="${ssrRenderClass([
                item.is_completed ? "text-slate-400 line-through" : "text-slate-700",
                "line-clamp-2"
              ])}">${ssrInterpolate(item.content)}</span></li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/VersionsTimeline.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$2 }, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    versions: Array,
    stats: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(`<div class="space-y-6"><section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-white border rounded-xl p-5 shadow-sm"><div class="flex items-center justify-between"><span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">${ssrInterpolate(_ctx.$t("Users"))}</span><div class="p-2 bg-indigo-50 rounded-lg text-indigo-500">`);
      _push(ssrRenderComponent(unref(IconUsers), { size: "18" }, null, _parent));
      _push(`</div></div><div class="mt-2 flex items-baseline gap-2"><span class="text-2xl font-black text-slate-800">${ssrInterpolate(__props.stats.users.total)}</span><span class="text-[10px] font-bold text-emerald-500">+${ssrInterpolate(__props.stats.users.new_this_month)}</span></div><div class="text-[10px] text-slate-400 mt-1 italic">${ssrInterpolate(_ctx.$t("active this month"))}</div></div><div class="bg-white border rounded-xl p-5 shadow-sm"><div class="flex items-center justify-between"><span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">${ssrInterpolate(_ctx.$t("Items"))}</span><div class="p-2 bg-emerald-50 rounded-lg text-emerald-500">`);
      _push(ssrRenderComponent(unref(IconPackage), { size: "18" }, null, _parent));
      _push(`</div></div><div class="mt-2 flex items-baseline gap-2"><span class="text-2xl font-black text-slate-800">${ssrInterpolate(__props.stats.items.total)}</span><span class="text-[10px] font-bold text-slate-400">${ssrInterpolate(__props.stats.items.active)} ${ssrInterpolate(_ctx.$t("public"))}</span></div><div class="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden"><div class="bg-emerald-500 h-full" style="${ssrRenderStyle({
        width: __props.stats.items.active / __props.stats.items.total * 100 + "%"
      })}"></div></div></div><div class="bg-white border rounded-xl p-5 shadow-sm"><div class="flex items-center justify-between"><span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">${ssrInterpolate(_ctx.$t("Stock Alert"))}</span><div class="p-2 bg-rose-50 rounded-lg text-rose-500">`);
      _push(ssrRenderComponent(unref(IconAlertTriangle), { size: "18" }, null, _parent));
      _push(`</div></div><div class="mt-2"><span class="${ssrRenderClass([
        __props.stats.items.out_of_stock > 0 ? "text-rose-600" : "text-slate-800",
        "text-2xl font-black"
      ])}">${ssrInterpolate(__props.stats.items.out_of_stock)}</span><span class="ml-2 text-[10px] font-bold text-slate-400 uppercase">${ssrInterpolate(_ctx.$t("Out of stock"))}</span></div></div><div class="bg-white border rounded-xl p-5 shadow-sm"><div class="flex items-center justify-between"><span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">${ssrInterpolate(_ctx.$t("Inventory Value"))}</span><div class="p-2 bg-amber-50 rounded-lg text-amber-500">`);
      _push(ssrRenderComponent(unref(IconCurrencyDollar), { size: "18" }, null, _parent));
      _push(`</div></div><div class="mt-2"><span class="text-2xl font-black text-slate-800">${ssrInterpolate(new Intl.NumberFormat("uk-UA").format(
        __props.stats.ecommerce.total_value
      ))}</span><span class="ml-1 text-xs font-bold text-slate-400">₴</span></div></div></section><section class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white border rounded-xl shadow-sm overflow-hidden h-[400px] flex flex-col"><div class="p-4 border-b bg-slate-50/50 flex justify-between items-center"><h3 class="text-xs uppercase font-bold text-slate-500 tracking-widest">${ssrInterpolate(_ctx.$t("Inventory Overview"))}</h3><div class="flex gap-2"><div class="w-3 h-3 rounded-full bg-indigo-500"></div><span class="text-[10px] text-slate-500">Sales</span></div></div><div class="flex-grow flex items-center justify-center italic text-slate-300 text-sm"> [ Тут буде Chart.js графік ] </div></div></div><div class="lg:col-span-1">`);
      _push(ssrRenderComponent(_sfc_main$1, { versions: __props.versions }, null, _parent));
      _push(`</div></section></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

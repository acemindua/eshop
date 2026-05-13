import { computed, reactive, onMounted, watch, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { h as head_default } from "../ssr.js";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-mzHE5KVK.js";
import { IconCheck, IconTrash, IconEdit, IconX, IconLock, IconSend } from "@tabler/icons-vue";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-DtLa9qLf.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-DA__G0nP.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const versionsList = computed(() => {
      const raw = props.data?.versions || props.data?.data?.versions || [];
      return Array.isArray(raw) ? raw : Object.values(raw);
    });
    const quickForm = reactive({});
    const initForms = () => {
      versionsList.value.forEach((v) => {
        if (v?.id && !quickForm[v.id]) {
          quickForm[v.id] = {
            content: "",
            type: "feature",
            category: "changelog"
          };
        }
      });
    };
    onMounted(initForms);
    watch(() => versionsList.value, initForms, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), { title: "Roadmap & Versions" }, null, _parent));
      _push(`<div class="p-6 space-y-6 max-w-5xl mx-auto"><div class="flex justify-between items-end"><div><h2 class="text-2xl font-black text-slate-800 uppercase tracking-tighter"> Roadmap </h2><p class="text-slate-500 text-sm"> Управління версіями та завданнями eShop </p></div><button class="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-sm"> + Нова версія </button></div>`);
      if (versionsList.value.length > 0) {
        _push(`<div class="grid gap-6"><!--[-->`);
        ssrRenderList(versionsList.value, (version) => {
          _push(`<div class="${ssrRenderClass([{
            "ring-2 ring-emerald-500/20 bg-emerald-50/10": version.status === "completed",
            "opacity-90": version.status === "completed"
          }, "bg-white border rounded-3xl shadow-sm border-slate-200 overflow-hidden transition-all"])}"><div class="${ssrRenderClass([
            version.status === "completed" ? "bg-emerald-50/50" : "bg-slate-50/50",
            "p-5 border-b border-slate-100 flex justify-between items-center"
          ])}"><div class="flex items-center gap-3"><span class="${ssrRenderClass([
            version.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700",
            "px-3 py-1 rounded-lg font-mono font-bold text-sm"
          ])}"> v${ssrInterpolate(version.version)}</span>`);
          if (version.status === "completed") {
            _push(`<span class="text-[10px] px-2 py-0.5 bg-emerald-600 text-white rounded-full font-black uppercase tracking-wider flex items-center gap-1">`);
            _push(ssrRenderComponent(unref(IconCheck), { size: "12" }, null, _parent));
            _push(` Released </span>`);
          } else {
            _push(`<!---->`);
          }
          if (version.released_at) {
            _push(`<span class="text-xs text-slate-400 font-medium">${ssrInterpolate(version.released_at)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex gap-2"><button class="p-2 text-slate-400 hover:text-rose-600 transition-colors">`);
          _push(ssrRenderComponent(unref(IconTrash), { size: "18" }, null, _parent));
          _push(`</button></div></div><div class="p-2"><!--[-->`);
          ssrRenderList(version.items, (item) => {
            _push(`<div class="group flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-all"><input type="checkbox"${ssrIncludeBooleanAttr(!!item.is_completed) ? " checked" : ""} class="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"><div class="flex-grow"><span class="${ssrRenderClass([{
              "line-through text-slate-400 font-normal": item.is_completed,
              "text-slate-700 font-medium": !item.is_completed
            }, "text-[15px]"])}">${ssrInterpolate(item.content)}</span></div><div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><select class="text-[10px] py-1 border-slate-200 rounded-lg focus:ring-0 cursor-pointer"><option value="" disabled selected> Перенести... </option><!--[-->`);
            ssrRenderList(versionsList.value.filter(
              (v) => v.id !== version.id && v.status !== "completed"
            ), (v) => {
              _push(`<option${ssrRenderAttr("value", v.id)}> в v${ssrInterpolate(v.version)}</option>`);
            });
            _push(`<!--]--></select><button class="p-1.5 text-slate-400 hover:text-indigo-600">`);
            _push(ssrRenderComponent(unref(IconEdit), { size: "16" }, null, _parent));
            _push(`</button><button class="p-1.5 text-slate-400 hover:text-rose-600">`);
            _push(ssrRenderComponent(unref(IconX), { size: "16" }, null, _parent));
            _push(`</button></div></div>`);
          });
          _push(`<!--]--></div><div class="p-4 bg-slate-50/30 border-t border-slate-100">`);
          if (version.status === "completed") {
            _push(`<div class="flex items-center justify-center gap-2 py-2 text-slate-400 italic text-sm">`);
            _push(ssrRenderComponent(unref(IconLock), { size: "14" }, null, _parent));
            _push(` Версія випущена. Для редагування зніміть відмітку з будь-якого завдання. </div>`);
          } else if (quickForm[version.id]) {
            _push(`<div class="flex gap-2"><input${ssrRenderAttr("value", quickForm[version.id].content)} type="text" class="flex-grow bg-white border-slate-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="Що зроблено або планується?"><button class="p-2.5 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white shadow-sm transition-all">`);
            _push(ssrRenderComponent(unref(IconSend), { size: "18" }, null, _parent));
            _push(`</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 border-slate-200"><p class="text-lg font-medium">Версії ще не створені</p><p class="text-sm">Натисніть кнопку &quot;+ Нова версія&quot;, щоб почати</p></div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Versions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from "vue/server-renderer";
import { b as usePage, u as useForm } from "../ssr.js";
import { IconBinaryTree, IconPlus, IconCalendar, IconPencil, IconTrash, IconCircleCheck, IconInfoCircle, IconCircle, IconCheck, IconX, IconArrowRight, IconAlertCircle } from "@tabler/icons-vue";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-DbXCnn_e.js";
import "./InputSearch-CL2slP12.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-RqDMSvDq.js";
import "./Breadcrumbs-DKsddhuk.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./VarDump-DqvrPBoK.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({ versions: [], filters: {} })
    }
  },
  setup(__props) {
    const props = __props;
    usePage();
    const activeVersionId = ref(props.data.versions[0]?.id || null);
    ref(props.data.filters.search || "");
    const isVersionModalOpen = ref(false);
    const editingVersion = ref(null);
    const editingItem = ref(null);
    const movingItem = ref(null);
    const versionForm = useForm({
      version: "",
      description: ""
    });
    const itemForm = useForm({
      content: "",
      type: "feature",
      category: "changelog"
    });
    const editItemForm = useForm({
      content: ""
    });
    const moveItemForm = useForm({
      app_version_id: ""
    });
    const activeVersion = computed(
      () => props.data.versions.find((v) => v.id === activeVersionId.value)
    );
    const typeColors = {
      feature: "bg-emerald-50 text-emerald-700 border-emerald-200",
      fix: "bg-rose-50 text-rose-700 border-rose-200",
      improvement: "bg-blue-50 text-blue-700 border-blue-200",
      other: "bg-slate-50 text-slate-700 border-slate-200"
    };
    const statusColors = {
      draft: "bg-slate-100 text-slate-700 border-slate-200",
      active: "bg-amber-100 text-amber-700 border-amber-200",
      completed: "bg-emerald-100 text-emerald-700 border-emerald-200"
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" data-v-8b9c6507><aside class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4" data-v-8b9c6507><div class="flex items-center justify-between" data-v-8b9c6507><h2 class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2" data-v-8b9c6507>`);
      _push(ssrRenderComponent(unref(IconBinaryTree), {
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("App Versions"))}</h2><button type="button" class="p-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold" data-v-8b9c6507>`);
      _push(ssrRenderComponent(unref(IconPlus), { size: "14" }, null, _parent));
      _push(`<span data-v-8b9c6507>${ssrInterpolate(_ctx.$t("New"))}</span></button></div><div class="space-y-2 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin" data-v-8b9c6507><!--[-->`);
      ssrRenderList(props.data.versions, (version) => {
        _push(`<div class="${ssrRenderClass([[
          activeVersionId.value === version.id ? "border-slate-900 bg-slate-50/80 ring-1 ring-slate-900" : "border-slate-200 hover:bg-slate-50/50 bg-white"
        ], "p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 relative group"])}" data-v-8b9c6507><div class="flex items-center justify-between" data-v-8b9c6507><span class="font-mono font-bold text-slate-900 text-sm" data-v-8b9c6507> v${ssrInterpolate(version.version)}</span><span class="${ssrRenderClass([statusColors[version.status], "text-[10px] px-2 py-0.5 font-bold uppercase rounded border tracking-wider"])}" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(version.status))}</span></div>`);
        if (version.description) {
          _push(`<p class="text-xs text-slate-500 line-clamp-1 pr-12" data-v-8b9c6507>${ssrInterpolate(version.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center justify-between mt-1 pt-1.5 border-t border-slate-100/60 text-[11px] text-slate-400" data-v-8b9c6507><span class="inline-flex items-center gap-1" data-v-8b9c6507>`);
        _push(ssrRenderComponent(unref(IconCalendar), { size: "12" }, null, _parent));
        _push(` ${ssrInterpolate(version.released_at ? formatDate(version.released_at) : _ctx.$t("In progress"))}</span><span class="font-medium text-slate-500" data-v-8b9c6507>${ssrInterpolate(version.items?.length || 0)} ${ssrInterpolate(_ctx.$t("tasks"))}</span></div><div class="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-sm" data-v-8b9c6507><button type="button" class="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded" data-v-8b9c6507>`);
        _push(ssrRenderComponent(unref(IconPencil), { size: "12" }, null, _parent));
        _push(`</button><button type="button" class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded" data-v-8b9c6507>`);
        _push(ssrRenderComponent(unref(IconTrash), { size: "12" }, null, _parent));
        _push(`</button></div></div>`);
      });
      _push(`<!--]-->`);
      if (props.data.versions.length === 0) {
        _push(`<div class="text-center py-8 text-slate-400 text-xs" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("No versions created yet."))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><main class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 minimum-h-[50vh]" data-v-8b9c6507>`);
      if (activeVersion.value) {
        _push(`<div class="space-y-5" data-v-8b9c6507><div class="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-3" data-v-8b9c6507><div data-v-8b9c6507><div class="flex items-center gap-3" data-v-8b9c6507><h1 class="text-xl font-black font-mono text-slate-900" data-v-8b9c6507> v${ssrInterpolate(activeVersion.value.version)}</h1><span class="${ssrRenderClass([statusColors[activeVersion.value.status], "text-xs font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full"])}" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(activeVersion.value.status))}</span></div>`);
        if (activeVersion.value.description) {
          _push(`<p class="text-xs text-slate-500 mt-1" data-v-8b9c6507>${ssrInterpolate(activeVersion.value.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (activeVersion.value.released_at) {
          _push(`<div class="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl" data-v-8b9c6507>`);
          _push(ssrRenderComponent(unref(IconCircleCheck), {
            size: "14",
            class: "text-emerald-500"
          }, null, _parent));
          _push(`<span data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Released on"))}: <b data-v-8b9c6507>${ssrInterpolate(formatDate(activeVersion.value.released_at))}</b></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (activeVersion.value.status === "completed") {
          _push(`<div class="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-2.5 text-xs" data-v-8b9c6507>`);
          _push(ssrRenderComponent(unref(IconInfoCircle), {
            size: "16",
            class: "mt-0.5 flex-shrink-0 text-amber-600"
          }, null, _parent));
          _push(`<div data-v-8b9c6507><span class="font-bold" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Version closed."))}</span> ${ssrInterpolate(_ctx.$t(
            "To append or reorder tasks, dynamically change this version attributes or pull back a task status."
          ))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeVersion.value.status !== "completed") {
          _push(`<form class="bg-slate-50/50 border border-slate-200/80 rounded-xl p-3.5 space-y-3" data-v-8b9c6507><div class="flex gap-2" data-v-8b9c6507><input${ssrRenderAttr("value", unref(itemForm).content)} type="text" required maxlength="500"${ssrRenderAttr("placeholder", _ctx.$t("What was implemented or fixed?"))} class="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 focus:ring-0 bg-white" data-v-8b9c6507><button type="submit"${ssrIncludeBooleanAttr(unref(itemForm).processing) ? " disabled" : ""} class="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-1" data-v-8b9c6507>`);
          _push(ssrRenderComponent(unref(IconPlus), { size: "16" }, null, _parent));
          _push(`<span data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Add"))}</span></button></div><div class="flex flex-wrap items-center gap-4 text-xs" data-v-8b9c6507><div class="flex items-center gap-2" data-v-8b9c6507><span class="text-slate-400 font-medium" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Type"))}:</span><div class="flex gap-1.5" data-v-8b9c6507><!--[-->`);
          ssrRenderList([
            "feature",
            "fix",
            "improvement",
            "other"
          ], (t) => {
            _push(`<label class="cursor-pointer select-none" data-v-8b9c6507><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(itemForm).type, t)) ? " checked" : ""}${ssrRenderAttr("value", t)} class="sr-only peer" data-v-8b9c6507><span class="px-2 py-1 border border-slate-200 rounded-md text-[11px] font-bold uppercase tracking-wider peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 transition-all block" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(t))}</span></label>`);
          });
          _push(`<!--]--></div></div><div class="flex items-center gap-2 border-l border-slate-200 pl-4" data-v-8b9c6507><span class="text-slate-400 font-medium" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Target"))}:</span><div class="flex gap-1.5" data-v-8b9c6507><!--[-->`);
          ssrRenderList(["changelog", "roadmap"], (c) => {
            _push(`<label class="cursor-pointer select-none" data-v-8b9c6507><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(itemForm).category, c)) ? " checked" : ""}${ssrRenderAttr("value", c)} class="sr-only peer" data-v-8b9c6507><span class="px-2 py-1 border border-slate-200 rounded-md text-[11px] font-bold uppercase tracking-wider peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 transition-all block" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(c))}</span></label>`);
          });
          _push(`<!--]--></div></div></div></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(["changelog", "roadmap"], (cat) => {
          _push(`<div class="space-y-2" data-v-8b9c6507><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 px-1 pt-1" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(cat))}</h3><div class="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white" data-v-8b9c6507><!--[-->`);
          ssrRenderList(activeVersion.value.items?.filter(
            (i) => i.category === cat
          ), (item) => {
            _push(`<div class="${ssrRenderClass([[item.is_completed ? "bg-slate-50/20" : ""], "p-3 flex items-start gap-3 hover:bg-slate-50/40 group/item transition-colors"])}" data-v-8b9c6507><button type="button" class="mt-0.5 text-slate-400 hover:text-slate-900 transition-colors flex-shrink-0" data-v-8b9c6507>`);
            if (item.is_completed) {
              _push(ssrRenderComponent(unref(IconCircleCheck), {
                size: "18",
                class: "text-emerald-500 fill-emerald-50"
              }, null, _parent));
            } else {
              _push(ssrRenderComponent(unref(IconCircle), { size: "18" }, null, _parent));
            }
            _push(`</button><div class="flex-1 text-sm min-w-0" data-v-8b9c6507>`);
            if (editingItem.value?.id === item.id) {
              _push(`<div class="flex gap-2 items-center" data-v-8b9c6507><input${ssrRenderAttr("value", unref(editItemForm).content)} type="text" class="flex-1 text-sm px-2 py-1 border border-slate-300 rounded focus:outline-none focus:border-slate-500" data-v-8b9c6507><button class="p-1 text-green-600 hover:bg-green-50 rounded" data-v-8b9c6507>`);
              _push(ssrRenderComponent(unref(IconCheck), { size: "14" }, null, _parent));
              _push(`</button><button class="p-1 text-slate-400 hover:bg-slate-50 rounded" data-v-8b9c6507>`);
              _push(ssrRenderComponent(unref(IconX), { size: "14" }, null, _parent));
              _push(`</button></div>`);
            } else {
              _push(`<div class="flex flex-wrap items-baseline gap-2" data-v-8b9c6507><span class="${ssrRenderClass([typeColors[item.type], "text-[10px] px-1.5 py-0.5 font-bold uppercase rounded border tracking-wide flex-shrink-0"])}" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(item.type))}</span><p class="${ssrRenderClass([[
                item.is_completed ? "line-through text-slate-400" : ""
              ], "text-slate-700 leading-relaxed"])}" data-v-8b9c6507>${ssrInterpolate(item.content)}</p></div>`);
            }
            _push(`</div><div class="opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 flex items-center gap-1 flex-shrink-0 transition-opacity select-none" data-v-8b9c6507>`);
            if (!item.is_completed) {
              _push(`<button type="button" class="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"${ssrRenderAttr("title", _ctx.$t("Move to another version"))} data-v-8b9c6507>`);
              _push(ssrRenderComponent(unref(IconArrowRight), { size: "14" }, null, _parent));
              _push(`</button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<button type="button" class="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded" data-v-8b9c6507>`);
            _push(ssrRenderComponent(unref(IconPencil), { size: "14" }, null, _parent));
            _push(`</button><button type="button" class="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded" data-v-8b9c6507>`);
            _push(ssrRenderComponent(unref(IconTrash), { size: "14" }, null, _parent));
            _push(`</button></div></div>`);
          });
          _push(`<!--]-->`);
          if (!activeVersion.value.items?.some(
            (i) => i.category === cat
          )) {
            _push(`<div class="p-4 text-center text-xs text-slate-400 bg-slate-50/20" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("No records under this pipeline."))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center text-center py-20 text-slate-400 gap-2" data-v-8b9c6507>`);
        _push(ssrRenderComponent(unref(IconAlertCircle), {
          size: "32",
          class: "text-slate-300"
        }, null, _parent));
        _push(`<span class="font-bold text-slate-700 text-sm" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("No version selected"))}</span><p class="text-xs max-w-xs" data-v-8b9c6507>${ssrInterpolate(_ctx.$t(
          "Select an active deployment version from the left panel or seed a new branch to begin tracking changes."
        ))}</p></div>`);
      }
      _push(`</main></div>`);
      if (isVersionModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" data-v-8b9c6507><div class="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-5 shadow-xl space-y-4" data-v-8b9c6507><div class="flex items-center justify-between border-b border-slate-100 pb-2" data-v-8b9c6507><h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide" data-v-8b9c6507>${ssrInterpolate(editingVersion.value ? _ctx.$t("Modify Version Attributes") : _ctx.$t("Initialize Target Version"))}</h3><button type="button" class="p-1 text-slate-400 hover:text-slate-600 rounded" data-v-8b9c6507>`);
        _push(ssrRenderComponent(unref(IconX), { size: "16" }, null, _parent));
        _push(`</button></div><form class="space-y-4" data-v-8b9c6507><div class="space-y-1" data-v-8b9c6507><label class="text-xs font-bold text-slate-500 uppercase tracking-wider" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Version tag"))} (e.g. 1.0.4)</label><input${ssrRenderAttr("value", unref(versionForm).version)} type="text" required placeholder="1.0.0" class="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500" data-v-8b9c6507></div><div class="space-y-1" data-v-8b9c6507><label class="text-xs font-bold text-slate-500 uppercase tracking-wider" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Short scope summary"))}</label><textarea rows="2" placeholder="..." class="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 resize-none" data-v-8b9c6507>${ssrInterpolate(unref(versionForm).description)}</textarea></div><div class="flex justify-end gap-2 pt-2 border-t border-slate-100" data-v-8b9c6507><button type="button" class="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Cancel"))}</button><button type="submit"${ssrIncludeBooleanAttr(unref(versionForm).processing) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Commit"))}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (movingItem.value) {
        _push(`<div class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" data-v-8b9c6507><div class="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-5 shadow-xl space-y-4" data-v-8b9c6507><div class="flex items-center justify-between border-b border-slate-100 pb-2" data-v-8b9c6507><h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Relocate Task"))}</h3><button type="button" class="p-1 text-slate-400 hover:text-slate-600 rounded" data-v-8b9c6507>`);
        _push(ssrRenderComponent(unref(IconX), { size: "16" }, null, _parent));
        _push(`</button></div><p class="text-xs text-slate-500 italic" data-v-8b9c6507> &quot;${ssrInterpolate(movingItem.value.content)}&quot; </p><form class="space-y-4" data-v-8b9c6507><div class="space-y-1" data-v-8b9c6507><label class="text-xs font-bold text-slate-500 uppercase tracking-wider" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Target Milestone / Release"))}</label><select required class="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-slate-500" data-v-8b9c6507><option value="" disabled data-v-8b9c6507${ssrIncludeBooleanAttr(Array.isArray(unref(moveItemForm).app_version_id) ? ssrLooseContain(unref(moveItemForm).app_version_id, "") : ssrLooseEqual(unref(moveItemForm).app_version_id, "")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Select version..."))}</option><!--[-->`);
        ssrRenderList(props.data.versions.filter(
          (v) => v.id !== activeVersionId.value && v.status !== "completed"
        ), (v) => {
          _push(`<option${ssrRenderAttr("value", v.id)} data-v-8b9c6507${ssrIncludeBooleanAttr(Array.isArray(unref(moveItemForm).app_version_id) ? ssrLooseContain(unref(moveItemForm).app_version_id, v.id) : ssrLooseEqual(unref(moveItemForm).app_version_id, v.id)) ? " selected" : ""}> v${ssrInterpolate(v.version)} (${ssrInterpolate(_ctx.$t(v.status))}) </option>`);
        });
        _push(`<!--]--></select></div><div class="flex justify-end gap-2 pt-2 border-t border-slate-100" data-v-8b9c6507><button type="button" class="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Cancel"))}</button><button type="submit"${ssrIncludeBooleanAttr(unref(moveItemForm).processing) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors" data-v-8b9c6507>${ssrInterpolate(_ctx.$t("Transfer"))}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Versions/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b9c6507"]]);
export {
  Form as default
};

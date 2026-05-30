import { computed, ref, watch, nextTick, onMounted, resolveComponent, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderAttr } from "vue/server-renderer";
import { c as usePage, u as useForm } from "../ssr.js";
import { IconEye, IconFilter, IconFolder, IconCheck, IconCopy, IconX, IconAlertTriangle } from "@tabler/icons-vue";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-CIgX8a9s.js";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-BnllGgH-.js";
import "./Breadcrumbs-BaC6CclY.js";
import "./ApplicationLogo-ClfPV3Yy.js";
import "./VarDump-DqvrPBoK.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    translations: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const locales = computed(() => page.props.config.supportedLocales || {});
    const localesKeys = computed(() => Object.keys(locales.value));
    const globalLocale = ref(localesKeys.value[0] || "uk");
    const form = useForm({ items: props.translations });
    const searchText = ref("");
    const copiedKey = ref(null);
    const isSyncing = ref(false);
    const filterStatus = ref("all");
    watch(
      () => props.translations,
      (newTranslations) => {
        form.items = newTranslations;
        nextTick(() => autoResizeAll());
      },
      { deep: true }
    );
    const emptyCounts = computed(() => {
      const counts = {};
      localesKeys.value.forEach((locale) => {
        counts[locale] = form.items.filter(
          (item) => !item.values[locale] || String(item.values[locale]).trim() === ""
        ).length;
      });
      return counts;
    });
    const getGroup = (key) => {
      if (!key) return "general";
      const parts = key.split(".");
      return parts.length > 1 ? parts[0] : "general";
    };
    const filteredItems = computed(() => {
      let items = form.items;
      if (filterStatus.value === "empty") {
        items = items.filter(
          (item) => !item.values[globalLocale.value] || String(item.values[globalLocale.value]).trim() === ""
        );
      }
      if (searchText.value) {
        const query = searchText.value.toLowerCase().trim();
        items = items.filter((i) => {
          if (i.key && i.key.toLowerCase().includes(query)) return true;
          if (i.values && typeof i.values === "object") {
            return Object.values(i.values).some(
              (v) => v && String(v).toLowerCase().includes(query)
            );
          }
          return false;
        });
      }
      return items;
    });
    const groupedItems = computed(() => {
      const groups = {};
      filteredItems.value.forEach((item) => {
        const g = getGroup(item.key);
        if (!groups[g]) groups[g] = [];
        groups[g].push(item);
      });
      return groups;
    });
    const getCountryCode = (r) => r && r.includes("_") ? r.split("_")[1].toLowerCase() : "ua";
    const isFieldEmpty = (item, lang) => !item.values[lang] || String(item.values[lang]).trim() === "";
    const adjustHeight = (e) => {
      const element = e?.target || e;
      if (!element) return;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + 2 + "px";
    };
    const autoResizeAll = () => {
      nextTick(() => {
        const textareas = document.querySelectorAll(".translation-textarea");
        textareas.forEach((el) => adjustHeight(el));
      });
    };
    watch(globalLocale, () => autoResizeAll());
    watch(filteredItems, () => autoResizeAll(), { deep: false });
    onMounted(() => autoResizeAll());
    const handleSync = () => {
      isSyncing.value = true;
      router.post(
        route("admin.settings.translations.sync"),
        {},
        {
          preserveScroll: true,
          preserveState: false,
          onFinish: () => {
            isSyncing.value = false;
          }
        }
      );
    };
    const submit = () => {
      form.post(route("admin.settings.translations.update-all"), {
        preserveScroll: true,
        onSuccess: () => autoResizeAll()
      });
    };
    const actionButtons = computed(() => [
      {
        label: "Оновити ключі",
        action: handleSync,
        type: "secondary",
        icon: "IconRefresh",
        disabled: isSyncing.value || form.processing
      },
      {
        label: "Зберегти зміни",
        action: submit,
        type: "primary",
        icon: "IconDeviceFloppy",
        disabled: isSyncing.value || form.processing
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_flag = resolveComponent("flag");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))} data-v-8d671890><section class="flex flex-wrap items-center justify-between gap-4" data-v-8d671890><div class="flex flex-wrap items-center gap-3" data-v-8d671890>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event,
        class: "w-64",
        placeholder: "Пошук перекладів..."
      }, null, _parent));
      _push(`<div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-white select-none" data-v-8d671890><button type="button" class="${ssrRenderClass([
        filterStatus.value === "all" ? "bg-slate-100 text-slate-800 font-semibold" : "text-slate-500 hover:text-slate-800",
        "px-3 py-1.5 rounded-md text-xs font-medium transition-all inline-flex items-center gap-1.5"
      ])}" data-v-8d671890>`);
      _push(ssrRenderComponent(unref(IconEye), { size: "14" }, null, _parent));
      _push(`<span data-v-8d671890>Всі</span></button><button type="button" class="${ssrRenderClass([
        filterStatus.value === "empty" ? "bg-amber-50 text-amber-700 font-semibold border-amber-100" : "text-slate-500 hover:text-slate-800",
        "px-3 py-1.5 rounded-md text-xs font-medium transition-all inline-flex items-center gap-1.5"
      ])}" data-v-8d671890>`);
      _push(ssrRenderComponent(unref(IconFilter), { size: "14" }, null, _parent));
      _push(`<span data-v-8d671890>Порожні</span></button></div><div class="flex items-center gap-1 border-l border-slate-200 pl-3 select-none" data-v-8d671890><!--[-->`);
      ssrRenderList(locales.value, (locale, code) => {
        _push(`<button type="button" class="${ssrRenderClass([[
          globalLocale.value === code ? "bg-slate-900 border-slate-900 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
        ], "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-2 border"])}" data-v-8d671890>`);
        if (locale.regional) {
          _push(ssrRenderComponent(_component_flag, {
            iso: getCountryCode(locale.regional),
            class: "rounded-sm text-[10px]"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="uppercase tracking-wider text-[11px]" data-v-8d671890>${ssrInterpolate(code)}</span>`);
        if (emptyCounts.value[code] > 0) {
          _push(`<span class="${ssrRenderClass([
            globalLocale.value === code ? "bg-white/20 text-white" : "bg-red-50 text-red-600",
            "inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-black rounded"
          ])}" data-v-8d671890>${ssrInterpolate(emptyCounts.value[code])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons.value }, null, _parent));
      _push(`</section><section class="space-y-6 overflow-y-auto max-h-[70vh] pr-1 scrollbar-thin" data-v-8d671890><!--[-->`);
      ssrRenderList(groupedItems.value, (groupItems, groupName) => {
        _push(`<div class="space-y-3" data-v-8d671890><div class="flex items-center gap-2 px-1 pt-2" data-v-8d671890><div class="p-1 rounded bg-slate-100 text-slate-600 border border-slate-200/60" data-v-8d671890>`);
        _push(ssrRenderComponent(unref(IconFolder), { size: "14" }, null, _parent));
        _push(`</div><span class="text-xs font-bold uppercase tracking-widest text-slate-400" data-v-8d671890>${ssrInterpolate(groupName)}</span><div class="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1 ml-2" data-v-8d671890></div></div><div class="grid grid-cols-1 xl:grid-cols-2 gap-3" data-v-8d671890><!--[-->`);
        ssrRenderList(groupItems, (item) => {
          _push(`<div class="${ssrRenderClass([[
            isFieldEmpty(item, globalLocale.value) ? "border-rose-200 bg-rose-50/20" : "border-slate-200 shadow-sm"
          ], "bg-white border rounded-xl p-3 flex flex-col justify-between transition-all duration-150 group/card relative focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-400"])}" data-v-8d671890><div class="flex items-start justify-between gap-4 mb-2" data-v-8d671890><div class="cursor-pointer max-w-[85%] font-mono text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center gap-1.5 select-none" data-v-8d671890><span class="truncate" data-v-8d671890>${ssrInterpolate(item.key)}</span>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(
            copiedKey.value === item.key ? unref(IconCheck) : unref(IconCopy)
          ), {
            size: "11",
            class: copiedKey.value === item.key ? "text-green-600" : "text-slate-400"
          }, null), _parent);
          _push(`</div><div class="flex items-center gap-1 mt-1" data-v-8d671890><!--[-->`);
          ssrRenderList(localesKeys.value, (lKey) => {
            _push(`<span class="${ssrRenderClass([
              isFieldEmpty(item, lKey) ? "bg-slate-200" : "bg-green-500",
              "w-3 h-1.5 rounded-sm transition-all"
            ])}"${ssrRenderAttr("title", `Мова: ${lKey.toUpperCase()} — ${isFieldEmpty(item, lKey) ? "Пусто" : "Заповнено"}`)} data-v-8d671890></span>`);
          });
          _push(`<!--]--></div></div><div class="relative w-full mt-1 flex items-center" data-v-8d671890><textarea rows="1" class="translation-textarea w-full border border-slate-200 rounded-lg pl-3 pr-14 py-2 text-sm font-medium bg-slate-50/30 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:ring-0 block resize-none transition-all duration-75"${ssrRenderAttr("placeholder", `Текст для [${globalLocale.value}]...`)} data-v-8d671890>${ssrInterpolate(item.values[globalLocale.value])}</textarea><div class="absolute right-2.5 flex items-center space-x-1.5 select-none" data-v-8d671890>`);
          if (item.values[globalLocale.value]) {
            _push(`<button type="button" class="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 opacity-0 group-hover/card:opacity-100 focus:opacity-100 transition-opacity" title="Очистити" data-v-8d671890>`);
            _push(ssrRenderComponent(unref(IconX), { size: "12" }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200" data-v-8d671890>${ssrInterpolate(globalLocale.value)}</span></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
      if (filteredItems.value.length === 0) {
        _push(`<div class="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-1.5 shadow-sm" data-v-8d671890>`);
        _push(ssrRenderComponent(unref(IconAlertTriangle), {
          class: "text-slate-300",
          size: "24"
        }, null, _parent));
        _push(`<span class="font-semibold text-slate-700" data-v-8d671890>Перекладів не знайдено</span><p class="text-xs text-slate-400" data-v-8d671890> Змініть параметри пошуку або перевірте іншу мову. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Translations/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d671890"]]);
export {
  Form as default
};

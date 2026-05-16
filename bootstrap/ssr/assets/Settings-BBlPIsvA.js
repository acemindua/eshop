import { computed, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-CTSEjFiO.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import { a as useForm } from "../ssr.js";
import "./AdminLayout-BRIf9gc0.js";
import "./Breadcrumbs-DA__G0nP.js";
import "@tabler/icons-vue";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "@floating-ui/dom";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Settings",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const initialSettings = computed(() => {
      return props.data?.settings.reduce((acc, option) => {
        acc[option.key] = option;
        return acc;
      }, {}) || {};
    });
    const form = useForm({
      settings: initialSettings.value
      // Заповнюємо форму початковими даними
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, {
        title: _ctx.$t("Settings")
      }, null, _parent));
      _push(`<div class="flex flex-col space-y-2"><form class="space-y-6 bg-white p-6 shadow-md rounded-lg">`);
      if (unref(form).settings && Object.keys(unref(form).settings).length > 0) {
        _push(`<section><!--[-->`);
        ssrRenderList(unref(form).settings, (option, key) => {
          _push(`<div class="border-b border-gray-200 pb-4 mb-4"><label${ssrRenderAttr("for", key)} class="block text-sm font-medium text-gray-700 mb-1">${ssrInterpolate(option.description || key.toUpperCase().replace(/_/g, " "))}</label>`);
          if (option.description) {
            _push(`<p class="text-xs text-gray-500 mb-2"> Ключ: <code>${ssrInterpolate(key)}</code></p>`);
          } else {
            _push(`<!---->`);
          }
          if (option.value && option.value.length > 50) {
            _push(`<textarea${ssrRenderAttr("id", key)} rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">${ssrInterpolate(option.value)}</textarea>`);
          } else {
            _push(`<input${ssrRenderAttr("id", key)} type="text"${ssrRenderAttr("value", option.value)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">`);
          }
          if (unref(form).errors[`settings.${key}.value`]) {
            _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(unref(form).errors[`settings.${key}.value`])}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">${ssrInterpolate(unref(form).processing ? _ctx.$t("Saving...") : _ctx.$t("Save Settings"))}</button></div></form>`);
      if (_ctx.$page.props.app.mode === "local") {
        _push(`<section>`);
        _push(ssrRenderComponent(VarDump, { data: __props.data }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

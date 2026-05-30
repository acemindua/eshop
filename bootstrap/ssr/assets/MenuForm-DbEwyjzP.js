import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useForm } from "../ssr.js";
import { _ as _sfc_main$1 } from "./StickyActions-DFSqE-gR.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./ButtonsGroup-sb8icSMB.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@tabler/icons-vue";
const _sfc_main = {
  __name: "MenuForm",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => ({}) },
    routePrefix: { type: String, default: () => "admin.menus" },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: "",
      slug: "",
      items: []
    });
    const handleSave = () => {
      const url = props.isEditing ? route(`${props.routePrefix}.update`, props.data?.menu?.id) : route(`${props.routePrefix}.store`);
      router.post(
        url,
        { ...form, _method: props.isEditing ? "PUT" : "POST" },
        {
          forceFormData: true,
          preserveState: true
        }
      );
    };
    const actionButtons = computed(() => [
      {
        label: "cancel",
        action: () => router.visit(route(`${props.routePrefix}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing
      },
      {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        buttons: actionButtons.value,
        routePrefix: props.routePrefix,
        title: props.isEditing ? "Edit Menu" : "New Menu Item",
        description: "Menu management."
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Menus/Components/MenuForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

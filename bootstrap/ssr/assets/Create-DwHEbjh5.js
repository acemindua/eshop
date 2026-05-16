import { ref, reactive, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "../ssr.js";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-syA0R-Os.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import { _ as _sfc_main$2 } from "./StickyActions-VokjrCI0.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-BRIf9gc0.js";
import "./Breadcrumbs-DA__G0nP.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./useLocales-V6QHCGCa.js";
import "./ButtonsGroup-CwkMyX54.js";
const model = "users";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const modelId = props.data?.user?.id || null;
    const loading = ref(false);
    const isEditing = ref(!!modelId);
    const form = reactive({
      name: "",
      email: "",
      last_name: "",
      phone: "",
      description: "",
      avatar: null
    });
    const handleCancel = () => {
      router.visit(route(`admin.${model}.index`));
    };
    const handleSave = () => {
      const url = isEditing.value ? route(`admin.${model}.update`, modelId) : route(`admin.${model}.store`);
      router.post(url, form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => loading.value = true,
        onFinish: () => loading.value = false,
        onSuccess: () => {
        }
      });
    };
    const actionButtons = [
      {
        label: "cancel",
        action: handleCancel,
        type: "secondary",
        icon: "IconCancel"
      },
      {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, { buttons: actionButtons }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="min-h-screen"${_scopeId}></section>`);
          } else {
            return [
              createVNode("section", { class: "min-h-screen" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section>`);
      _push(ssrRenderComponent(VarDump, { data: __props.data }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Users/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

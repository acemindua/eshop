import { computed, ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-CTSEjFiO.js";
import _sfc_main$3 from "./DataTable-p9O7Adf-.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import { h as head_default } from "../ssr.js";
import debounce from "lodash.debounce";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { B as ButtonsGroup } from "./ButtonsGroup-CwkMyX54.js";
import { router } from "@inertiajs/core";
import "./AdminLayout-BRIf9gc0.js";
import "./Breadcrumbs-DA__G0nP.js";
import "@tabler/icons-vue";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./Pagination-FQ4yDsyZ.js";
import "./BadgeStatus-BqNBhYGl.js";
import "./Checkbox-86GmRX3v.js";
import "sweetalert2";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "@floating-ui/dom";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object
    },
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const items = computed(() => props.data?.shippings?.data || []);
    const meta = computed(() => props.data?.shippings?.meta || []);
    const searchText = ref(props.filters?.search || "");
    const selectedItems = ref([]);
    watch(
      searchText,
      debounce((value) => {
        router.get(
          route("admin.settings.shippings.index"),
          { search: value },
          { preserveState: true, replace: true }
        );
      }, 500)
    );
    const deletePaymentMethod = (item) => {
      router.delete(route("admin.settings.shippings.destroy", item.id), {
        onBefore: () => confirm($t("Are you sure you want to delete this element?"))
      });
    };
    const handleCreate = () => {
      router.visit(route("admin.settings.shippings.create"));
    };
    const actionButtons = [
      {
        label: "create",
        action: handleCreate,
        type: "primary",
        icon: "IconCirclePlus"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), {
        title: _ctx.$t("Payment Methods")
      }, null, _parent));
      _push(`<div class="flex flex-col space-y-2 w-full"><section class="md:flex items-center justify-between pt-4 gap-4 space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        items: items.value,
        meta: meta.value,
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: deletePaymentMethod,
        model: "settings.shippings"
      }, null, _parent));
      _push(`</section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Shippings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

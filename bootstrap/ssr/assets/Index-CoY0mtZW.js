import { computed, ref, watch, resolveComponent, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CommerceAdminLayout-DZpOlOrD.js";
import _sfc_main$4 from "./DataTable-DOxXcfeu.js";
import { _ as _sfc_main$5 } from "./VarDump-0gz6Mom3.js";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { _ as _sfc_main$3 } from "./ButtonsGroup-3TWHBcQj.js";
import "./AdminLayout-Dz4Fusn0.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./BadgeStatus-CuMJsa-m.js";
import "./Checkbox-BYIkH8i_.js";
import "sweetalert2";
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
    const orders = computed(() => props.data?.orders?.data || []);
    const meta = computed(() => props.data?.items?.meta || []);
    const searchText = ref(props.filters.search);
    const selectedItems = ref([]);
    watch(
      searchText,
      debounce((value) => {
        router.get(
          route("admin.orders.index"),
          { search: value },
          { preserveState: true, replace: true }
        );
      }, 500)
    );
    const deleteValueItem = (item) => {
      router.delete(route("admin.orders.destroy", item.id));
    };
    const handleImport = () => {
      console.log("Importing...");
    };
    const handleCreate = () => {
      router.visit(route("admin.orders.create"));
    };
    const actionButtons = [
      {
        label: "import",
        action: handleImport,
        type: "secondary",
        icon: "IconCloudUpload"
      },
      {
        label: "create",
        loadingLabel: "Saving...",
        action: handleCreate,
        type: "primary",
        icon: "IconCirclePlus"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, {
        title: _ctx.$t("Orders")
      }, null, _parent));
      _push(`<div class="flex flex-col space-y-2"><section class="md:flex items-center justify-between pt-4 gap-4 space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, { buttons: actionButtons }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        items: orders.value,
        meta: meta.value,
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: deleteValueItem,
        model: "orders"
      }, null, _parent));
      _push(`</section>`);
      if (_ctx.$page.props.app.mode === "local") {
        _push(`<section>`);
        _push(ssrRenderComponent(_sfc_main$5, { data: __props.data }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Orders/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

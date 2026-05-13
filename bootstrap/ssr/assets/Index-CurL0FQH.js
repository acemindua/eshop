import { computed, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$5 } from "./VarDump-0gz6Mom3.js";
import _sfc_main$4 from "./DataTable-pSh6dVMx.js";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-BkxoySxl.js";
import { _ as _sfc_main$3 } from "./ButtonsGroup-3TWHBcQj.js";
import "./BadgeStatus-CuMJsa-m.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Checkbox-BYIkH8i_.js";
import "./ImageDataView-C9GsQUU8.js";
import "@tabler/icons-vue";
import "./UserStatus-DfjMQc-4.js";
import "sweetalert2";
import "./AdminLayout-Dz4Fusn0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./useLocales-Cm2D8rND.js";
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
    const items = computed(() => props.data?.users?.data || []);
    const meta = computed(() => props.data?.users?.meta || []);
    const searchText = ref(props.filters?.search || "");
    const selectedItems = ref([]);
    watch(
      searchText,
      debounce((value) => {
        router.get(
          route("admin.users.index"),
          { search: value },
          { preserveState: true, replace: true }
        );
      }, 500)
    );
    const deleteValueItem = (item) => {
      if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
        router.delete(route("admin.users.destroy", item.id));
      }
    };
    const handleImport = () => {
      console.log("Importing...");
    };
    const handleCreate = () => {
      router.visit(route("admin.users.create"));
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4 w-full" }, _attrs))}><section class="md:flex items-center justify-between gap-2 space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, { buttons: actionButtons }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        items: items.value,
        meta: meta.value,
        "selected-items": selectedItems.value,
        model: "users",
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: deleteValueItem
      }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$5, { data: __props.data }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

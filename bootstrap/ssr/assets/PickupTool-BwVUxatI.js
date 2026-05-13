import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { IconMapPin } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "PickupTool",
  __ssrInlineRender: true,
  props: {
    warehouses: Array,
    warehouseName: String,
    // v-model:warehouseName
    errors: Object
  },
  emits: ["update:warehouseName", "update:cityName"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-x border-b border-black p-8 bg-zinc-50 animate-in fade-in duration-300" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(__props.warehouses, (w) => {
        _push(`<div class="${ssrRenderClass([__props.warehouseName === w.address ? "bg-black text-white border-black" : "bg-white border-zinc-200 hover:border-black", "p-6 border transition-all duration-300 cursor-pointer flex items-center justify-between group"])}"><div class="flex flex-col"><span class="text-[10px] font-black uppercase tracking-widest opacity-60">${ssrInterpolate(w.city)}</span><span class="text-[13px] font-bold mt-1 uppercase">${ssrInterpolate(w.address)}</span></div>`);
        _push(ssrRenderComponent(unref(IconMapPin), { size: "20" }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (__props.errors.warehouse) {
        _push(`<p class="text-red-500 text-[10px] font-black uppercase mt-4 tracking-widest">${ssrInterpolate(_ctx.$t(__props.errors.warehouse))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DeliveryTools/PickupTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import ContactInfo from "./ContactInfo-B98ivZl8.js";
import _sfc_main$2 from "./ShippingInfo-kTgVxNJa.js";
import _sfc_main$3 from "./PaymentMethods-BHqJDXf_.js";
import OrderSummary from "./OrderSummary-BmzhllKb.js";
import { _ as _sfc_main$1 } from "./InputError-Cp3nFeNd.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "lodash.debounce";
import "./BaseSelect-BvqgQdVd.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "CheckoutOld",
  __ssrInlineRender: true,
  props: {
    paymentMethods: Array,
    warehouses: Array
    // Твої склади з БД
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const cart = computed(() => page.props.cart);
    const user = page.props.auth.user?.data;
    const form = useForm({
      // Якщо юзер є, підставляємо дані, якщо ні — пустий рядок
      name: user?.name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      delivery_method: "pickup",
      warehouse_id: null,
      payment_method: null,
      city_ref: "",
      city_name: "",
      warehouse_ref: "",
      warehouse_name: ""
    });
    watch(
      () => page.props.auth.user,
      (newUser) => {
        if (newUser) {
          form.first_name = newUser.first_name;
          form.last_name = newUser.last_name;
          form.email = newUser.email;
          form.phone = newUser.phone;
        }
      },
      { deep: true }
    );
    watch(
      () => form.delivery_method,
      (method) => {
        if (method === "pickup") {
          form.city_ref = form.city_name = form.warehouse_ref = form.warehouse_name = "";
          if (props.warehouses?.length > 0)
            form.warehouse_id = props.warehouses[0].id;
        } else {
          form.warehouse_id = null;
        }
      },
      { immediate: true }
    );
    const submitOrder = () => form.post(route("order.store"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto py-12 px-4" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"><div class="lg:col-span-8 space-y-10">`);
      _push(ssrRenderComponent(ContactInfo, {
        name: unref(form).name,
        "onUpdate:name": ($event) => unref(form).name = $event,
        last_name: unref(form).last_name,
        "onUpdate:last_name": ($event) => unref(form).last_name = $event,
        email: unref(form).email,
        "onUpdate:email": ($event) => unref(form).email = $event,
        phone: unref(form).phone,
        "onUpdate:phone": ($event) => unref(form).phone = $event,
        errors: unref(form).errors
      }, null, _parent));
      _push(`<div class="bg-white p-6 border border-gray-200 shadow-sm"><h2 class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black"> 2. Спосіб доставки </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"><button type="button" class="${ssrRenderClass([
        unref(form).delivery_method === "pickup" ? "border-black bg-black text-white" : "border-gray-200 text-gray-400 hover:border-black",
        "border p-5 flex flex-col transition-all"
      ])}"><span class="text-xs font-bold uppercase tracking-widest">Самовивіз</span><span class="text-[10px] mt-1 opacity-70">З нашого складу</span></button><button type="button" class="${ssrRenderClass([
        unref(form).delivery_method === "nova_poshta" ? "border-black bg-black text-white" : "border-gray-200 text-gray-400 hover:border-black",
        "border p-5 flex flex-col transition-all"
      ])}"><span class="text-xs font-bold uppercase tracking-widest">Нова Пошта</span><span class="text-[10px] mt-1 opacity-70">У відділення</span></button></div>`);
      if (unref(form).delivery_method === "pickup") {
        _push(`<div class="space-y-3 animate-in fade-in slide-in-from-top-2"><!--[-->`);
        ssrRenderList(__props.warehouses, (w) => {
          _push(`<div class="${ssrRenderClass([
            unref(form).warehouse_id === w.id ? "border-black ring-1 ring-black" : "border-gray-100 hover:border-gray-300",
            "cursor-pointer border p-4 flex justify-between items-center transition-all"
          ])}"><div><p class="text-sm font-bold text-black uppercase">${ssrInterpolate(w.title)}</p><p class="text-xs text-gray-500">${ssrInterpolate(w.city)}, ${ssrInterpolate(w.address)}</p></div><div class="${ssrRenderClass([
            unref(form).warehouse_id === w.id ? "bg-black border-black" : "border-gray-300",
            "w-4 h-4 rounded-full border flex items-center justify-center"
          ])}">`);
          if (unref(form).warehouse_id === w.id) {
            _push(`<div class="w-1.5 h-1.5 bg-white rounded-full"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form).errors.warehouse_id
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).delivery_method === "nova_poshta") {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          city_ref: unref(form).city_ref,
          "onUpdate:city_ref": ($event) => unref(form).city_ref = $event,
          city_name: unref(form).city_name,
          "onUpdate:city_name": ($event) => unref(form).city_name = $event,
          warehouse_ref: unref(form).warehouse_ref,
          "onUpdate:warehouse_ref": ($event) => unref(form).warehouse_ref = $event,
          warehouse_name: unref(form).warehouse_name,
          "onUpdate:warehouse_name": ($event) => unref(form).warehouse_name = $event,
          errors: unref(form).errors
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white p-6 border border-gray-200 shadow-sm"><h2 class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black"> 3. Спосіб оплати </h2>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        modelValue: unref(form).payment_method,
        "onUpdate:modelValue": ($event) => unref(form).payment_method = $event,
        methods: __props.paymentMethods,
        errors: unref(form).errors
      }, null, _parent));
      _push(`</div></div><aside class="lg:col-span-4">`);
      _push(ssrRenderComponent(OrderSummary, {
        cart: cart.value,
        processing: unref(form).processing,
        onSubmit: submitOrder
      }, null, _parent));
      _push(`</aside></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/CheckoutOld.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { computed, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import _sfc_main$1 from "./ContactInfo-D4O8YCXR.js";
import _sfc_main$2 from "./ShippingInfo-CtXPp1uw.js";
import PaymentMethods from "./PaymentMethods-BcEiRLV7.js";
import OrderSummary from "./OrderSummary-DfYxl1tG.js";
import "axios";
import "lodash.debounce";
import "@headlessui/vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const cart = computed(() => page.props.cart);
    const paymentMethods = [
      {
        code: "card",
        label: "Оплата картою (LiqPay)",
        description: "Миттєва оплата онлайн без комісії"
      },
      {
        code: "cash",
        label: "При отриманні",
        description: "Оплата готівкою або картою у відділенні"
      },
      {
        code: "invoice",
        label: "Безготівковий розрахунок",
        description: "Для юридичних осіб (рахунок-фактура)"
      }
    ];
    const form = useForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      delivery_method: "pickup",
      payment_method: "card",
      // дефолтний метод
      city_ref: "",
      city_name: "",
      warehouse_ref: "",
      warehouse_name: ""
    });
    const isAuthModalOpen = ref(false);
    const syncUserData = (user) => {
      if (user) {
        const data = user.data || user;
        form.first_name = data.first_name || data.name || "";
        form.last_name = data.last_name || "";
        form.email = data.email || "";
        form.phone = data.phone || "";
        form.defaults();
      }
    };
    watch(
      () => page.props.auth.user,
      (newUser) => syncUserData(newUser),
      { immediate: true, deep: true }
    );
    const submitOrder = () => {
      form.post(route("orders.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto py-12 px-4" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"><div class="lg:col-span-8 space-y-10">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        first_name: unref(form).first_name,
        "onUpdate:first_name": ($event) => unref(form).first_name = $event,
        last_name: unref(form).last_name,
        "onUpdate:last_name": ($event) => unref(form).last_name = $event,
        email: unref(form).email,
        "onUpdate:email": ($event) => unref(form).email = $event,
        phone: unref(form).phone,
        "onUpdate:phone": ($event) => unref(form).phone = $event,
        errors: unref(form).errors,
        onOpenAuth: ($event) => isAuthModalOpen.value = true
      }, null, _parent));
      _push(`<div class="bg-white p-6 border border-gray-200 shadow-sm"><h2 class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black"> 2. Спосіб доставки </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><button class="${ssrRenderClass([
        unref(form).delivery_method === "pickup" ? "border-black bg-black text-white" : "border-gray-200 text-gray-400 hover:border-black",
        "border p-5 flex flex-col text-left transition-all"
      ])}"><span class="text-xs font-bold uppercase tracking-widest">Самовивіз</span><span class="text-[10px] mt-1 opacity-70">Львів, вул. Промислова, 5</span></button><button class="${ssrRenderClass([
        unref(form).delivery_method === "nova_poshta" ? "border-black bg-black text-white" : "border-gray-200 text-gray-400 hover:border-black",
        "border p-5 flex flex-col text-left transition-all"
      ])}"><span class="text-xs font-bold uppercase tracking-widest">Нова Пошта</span><span class="text-[10px] mt-1 opacity-70">У відділення</span></button></div>`);
      if (unref(form).delivery_method === "nova_poshta") {
        _push(`<div class="mt-8 pt-8 border-t border-gray-100">`);
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
      _push(ssrRenderComponent(PaymentMethods, {
        modelValue: unref(form).payment_method,
        "onUpdate:modelValue": ($event) => unref(form).payment_method = $event,
        methods: paymentMethods,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

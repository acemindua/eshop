import { ref, computed, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import CheckoutLayout from "./CheckoutLayout-5bcaJWMT.js";
import StepContact from "./StepContact-C5csAHIZ.js";
import StepDelivery from "./StepDelivery-BB3ixLnU.js";
import StepPayment from "./StepPayment-BXktufBp.js";
import OrderSummary from "./OrderSummary-BmzhllKb.js";
import { A as AuthModal } from "./AuthModal-BWQinqw9.js";
import { _ as _sfc_main$1 } from "./VarDump-0gz6Mom3.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = {
  __name: "Checkout",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const isAuthModalOpen = ref(false);
    const authMode = ref("login");
    const openLogin = () => {
      authMode.value = "login";
      isAuthModalOpen.value = true;
    };
    const currentStep = ref(1);
    const page = usePage();
    const user = computed(() => page.props?.auth?.user?.data || {});
    const form = useForm({
      // Використовуємо оператор ?? для гарантії String
      name: user.value?.name ?? "",
      last_name: user.value?.last_name ?? "",
      email: user.value?.email ?? "",
      phone: user.value?.phone ?? "+380",
      password: "",
      different_recipient: false,
      recipient_name: "",
      recipient_last_name: "",
      recipient_phone: "+380",
      delivery_method: null,
      city: null,
      warehouse: null,
      payment_method: null
    });
    const submit = () => {
      form.post(route("checkout.store"));
    };
    watch(
      () => user.value,
      (newUser) => {
        if (newUser && Object.keys(newUser).length > 0) {
          form.name = newUser.name ?? "";
          form.last_name = newUser.last_name ?? "";
          form.email = newUser.email ?? "";
          if (newUser.phone) {
            form.phone = newUser.phone;
          }
        }
      },
      { deep: true }
      // Додаємо deep, якщо об'єкт user може змінюватися всередині
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 py-10" }, _attrs))}><div class="lg:grid lg:grid-cols-12 lg:gap-x-12"><div class="lg:col-span-7 space-y-6">`);
      _push(ssrRenderComponent(CheckoutLayout, { "current-step": currentStep.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentStep.value === 1) {
              _push2(ssrRenderComponent(StepContact, {
                form: unref(form),
                onNext: ($event) => currentStep.value = 2,
                onOpenAuth: openLogin
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 2) {
              _push2(ssrRenderComponent(StepDelivery, {
                form: unref(form),
                "shipping-methods": __props.data?.shippingMethods || {},
                warehouses: __props.data?.warehouses,
                onNext: ($event) => currentStep.value = 3,
                onBack: ($event) => currentStep.value = 1
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 3) {
              _push2(ssrRenderComponent(StepPayment, {
                form: unref(form),
                onBack: ($event) => currentStep.value = 2,
                onSubmit: submit
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentStep.value === 1 ? (openBlock(), createBlock(StepContact, {
                key: 0,
                form: unref(form),
                onNext: ($event) => currentStep.value = 2,
                onOpenAuth: openLogin
              }, null, 8, ["form", "onNext"])) : createCommentVNode("", true),
              currentStep.value === 2 ? (openBlock(), createBlock(StepDelivery, {
                key: 1,
                form: unref(form),
                "shipping-methods": __props.data?.shippingMethods || {},
                warehouses: __props.data?.warehouses,
                onNext: ($event) => currentStep.value = 3,
                onBack: ($event) => currentStep.value = 1
              }, null, 8, ["form", "shipping-methods", "warehouses", "onNext", "onBack"])) : createCommentVNode("", true),
              currentStep.value === 3 ? (openBlock(), createBlock(StepPayment, {
                key: 2,
                form: unref(form),
                onBack: ($event) => currentStep.value = 2,
                onSubmit: submit
              }, null, 8, ["form", "onBack"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AuthModal, {
        "is-open": isAuthModalOpen.value,
        "initial-mode": authMode.value,
        onClose: ($event) => isAuthModalOpen.value = false
      }, null, _parent));
      _push(`<div class="lg:col-span-5 mt-10 lg:mt-0">`);
      _push(ssrRenderComponent(OrderSummary, {
        cart: __props.data?.cart,
        form: unref(form)
      }, null, _parent));
      _push(`</div></div>`);
      if (_ctx.$page.props.app.mode === "local") {
        _push(`<section>`);
        _push(ssrRenderComponent(_sfc_main$1, { data: __props.data }, null, _parent));
        _push(`</section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

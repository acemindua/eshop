import { ref, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { a as useForm } from "../ssr.js";
import Layout from "./DefaultCheckoutLayout-BfVICHWE.js";
import _sfc_main$1 from "./StepContact-LxNsNWtk.js";
import StepDelivery from "./StepDelivery-B5h8bVzP.js";
import _sfc_main$2 from "./StepPayment-EvwzxruV.js";
import _sfc_main$3 from "./OrderSummary-CLW2Cav3.js";
import { A as AuthModal } from "./AuthModal-yb31sphO.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./BaseInput-DUCpCrTs.js";
import "axios";
import "lodash.debounce";
import "./BaseSelect-BvqgQdVd.js";
import "@headlessui/vue";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const currentStep = ref(1);
    const isAuthModalOpen = ref(false);
    const authUser = computed(() => props.data?.authUser?.data || null);
    const cart = computed(() => props.data?.cart || { items: [], total: 0, subtotal: 0 });
    const form = useForm({
      name: authUser.value?.name || "",
      last_name: authUser.value?.last_name || "",
      phone: authUser.value?.phone ? authUser.value.phone.replace(/^380/, "") : "",
      email: authUser.value?.email || "",
      different_recipient: false,
      recipient_name: "",
      recipient_last_name: "",
      recipient_phone: "",
      delivery_method: "",
      city: "",
      address: "",
      payment_method: ""
    });
    const currentShippingPrice = computed(() => {
      const method = props.data?.shippingMethods?.find((m) => m.alias === form.delivery_method);
      return method ? method.price : 0;
    });
    const nextStep = () => currentStep.value++;
    const goToStep = (step) => {
      if (step < currentStep.value) currentStep.value = step;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Layout, mergeProps({
        "current-step": currentStep.value,
        onGoToStep: goToStep
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-12 min-h-screen"${_scopeId}><div class="lg:col-span-7 border-r border-black"${_scopeId}><div class="p-8 md:p-16"${_scopeId}><div class="max-w-xl mx-auto lg:ml-0"${_scopeId}>`);
            if (currentStep.value === 1) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                form: unref(form),
                "auth-user": authUser.value,
                onNext: nextStep,
                onOpenAuth: ($event) => isAuthModalOpen.value = true
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 2) {
              _push2(ssrRenderComponent(StepDelivery, {
                form: unref(form),
                warehouses: __props.data?.warehouses,
                "shipping-methods": __props.data?.shippingMethods,
                onNext: nextStep,
                onBack: ($event) => currentStep.value--
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 3) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                form: unref(form),
                "payment-methods": __props.data?.paymentMethods,
                onBack: ($event) => currentStep.value--
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="lg:col-span-5 bg-zinc-50 relative"${_scopeId}><div class="sticky top-20 p-8 md:p-16"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              items: cart.value.items,
              subtotal: cart.value.subtotal,
              total: Number(cart.value.total) + Number(currentShippingPrice.value),
              "shipping-price": currentShippingPrice.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(AuthModal, {
              "is-open": isAuthModalOpen.value,
              onClose: ($event) => isAuthModalOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-12 min-h-screen" }, [
                createVNode("div", { class: "lg:col-span-7 border-r border-black" }, [
                  createVNode("div", { class: "p-8 md:p-16" }, [
                    createVNode("div", { class: "max-w-xl mx-auto lg:ml-0" }, [
                      currentStep.value === 1 ? (openBlock(), createBlock(_sfc_main$1, {
                        key: 0,
                        form: unref(form),
                        "auth-user": authUser.value,
                        onNext: nextStep,
                        onOpenAuth: ($event) => isAuthModalOpen.value = true
                      }, null, 8, ["form", "auth-user", "onOpenAuth"])) : createCommentVNode("", true),
                      currentStep.value === 2 ? (openBlock(), createBlock(StepDelivery, {
                        key: 1,
                        form: unref(form),
                        warehouses: __props.data?.warehouses,
                        "shipping-methods": __props.data?.shippingMethods,
                        onNext: nextStep,
                        onBack: ($event) => currentStep.value--
                      }, null, 8, ["form", "warehouses", "shipping-methods", "onBack"])) : createCommentVNode("", true),
                      currentStep.value === 3 ? (openBlock(), createBlock(_sfc_main$2, {
                        key: 2,
                        form: unref(form),
                        "payment-methods": __props.data?.paymentMethods,
                        onBack: ($event) => currentStep.value--
                      }, null, 8, ["form", "payment-methods", "onBack"])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "lg:col-span-5 bg-zinc-50 relative" }, [
                  createVNode("div", { class: "sticky top-20 p-8 md:p-16" }, [
                    createVNode(_sfc_main$3, {
                      items: cart.value.items,
                      subtotal: cart.value.subtotal,
                      total: Number(cart.value.total) + Number(currentShippingPrice.value),
                      "shipping-price": currentShippingPrice.value
                    }, null, 8, ["items", "subtotal", "total", "shipping-price"])
                  ])
                ])
              ]),
              createVNode(AuthModal, {
                "is-open": isAuthModalOpen.value,
                onClose: ($event) => isAuthModalOpen.value = false
              }, null, 8, ["is-open", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

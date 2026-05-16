import { resolveDirective, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./BaseInput-DUCpCrTs.js";
import { IconUserCircle, IconFingerprint, IconInfoCircle } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ContactInfo",
  __ssrInlineRender: true,
  props: {
    name: String,
    last_name: String,
    email: String,
    phone: String,
    errors: Object
  },
  emits: [
    "update:name",
    "update:last_name",
    "update:email",
    "update:phone",
    "open-auth",
    "open-register"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 md:p-8 border border-gray-200 shadow-sm rounded-3xl" }, _attrs))} data-v-3334af86><div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-50" data-v-3334af86><div class="flex items-center gap-3" data-v-3334af86><div class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" data-v-3334af86> 1 </div><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-gray-900" data-v-3334af86> Оформлення замовлення </h2></div>`);
      if (_ctx.$page.props.auth.user) {
        _push(`<div class="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full" data-v-3334af86><span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" data-v-3334af86></span><span class="text-[10px] text-green-700 font-bold uppercase tracking-widest" data-v-3334af86> Профіль: ${ssrInterpolate(_ctx.$page.props.auth.user.first_name)}</span></div>`);
      } else {
        _push(`<div class="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold" data-v-3334af86><button type="button" class="text-blue-600 hover:text-blue-800 transition-colors" data-v-3334af86> Увійти </button><span class="text-gray-200" data-v-3334af86>|</span><button type="button" class="text-gray-500 hover:text-black transition-colors" data-v-3334af86> Реєстрація </button></div>`);
      }
      _push(`</div><div class="space-y-10" data-v-3334af86><section data-v-3334af86><div class="flex items-center gap-2 mb-6 text-gray-400" data-v-3334af86>`);
      _push(ssrRenderComponent(unref(IconUserCircle), { size: "18" }, null, _parent));
      _push(`<span class="text-[11px] font-bold uppercase tracking-wider" data-v-3334af86>Персональні дані</span></div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" data-v-3334af86>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Ім'я",
        "model-value": __props.name,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:name", $event),
        error: __props.errors?.name,
        placeholder: "Ваше ім'я"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Прізвище",
        "model-value": __props.last_name,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:last_name", $event),
        error: __props.errors?.last_name,
        placeholder: "Ваше прізвище"
      }, null, _parent));
      _push(`</div></section><section data-v-3334af86><div class="flex items-center gap-2 mb-6 text-gray-400" data-v-3334af86>`);
      _push(ssrRenderComponent(unref(IconFingerprint), { size: "18" }, null, _parent));
      _push(`<span class="text-[11px] font-bold uppercase tracking-wider" data-v-3334af86>Контактна інформація</span></div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" data-v-3334af86>`);
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        label: "Телефон",
        "model-value": __props.phone,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:phone", $event),
        error: __props.errors?.phone,
        placeholder: "+38 0__ ___ ____",
        type: "tel"
      }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ####")), null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Email",
        "model-value": __props.email,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:email", $event),
        error: __props.errors?.email,
        readonly: !!_ctx.$page.props.auth.user,
        class: {
          "bg-gray-50 opacity-70": !!_ctx.$page.props.auth.user
        },
        placeholder: "mail@example.com"
      }, null, _parent));
      _push(`</div></section></div>`);
      if (!_ctx.$page.props.auth.user) {
        _push(`<div class="mt-10 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-3 group hover:bg-blue-50 transition-colors" data-v-3334af86>`);
        _push(ssrRenderComponent(unref(IconInfoCircle), {
          size: "20",
          class: "text-blue-500 shrink-0 mt-0.5"
        }, null, _parent));
        _push(`<div class="space-y-1" data-v-3334af86><p class="text-[12px] font-bold text-blue-900 leading-tight" data-v-3334af86> Smart Checkout включено </p><p class="text-[11px] text-blue-700/80 leading-relaxed" data-v-3334af86> Ми автоматично створимо для вас особистий кабінет. Це дозволить вам <span class="font-bold text-blue-800" data-v-3334af86>відстежувати статус замовлення</span>, зберігати історію покупок та отримувати персональні пропозиції. </p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/ContactInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContactInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3334af86"]]);
export {
  ContactInfo as default
};

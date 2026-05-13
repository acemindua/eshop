import { ref, resolveDirective, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderClass } from "vue/server-renderer";
import { IconCircleCheck, IconArrowRight } from "@tabler/icons-vue";
import { _ as _sfc_main$1 } from "./BaseInput-DUCpCrTs.js";
const _sfc_main = {
  __name: "StepContact",
  __ssrInlineRender: true,
  props: {
    form: Object,
    authUser: Object
  },
  emits: ["next", "open-auth"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const showRecipientFields = ref(props.form.different_recipient);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12 py-4 font-['Exo_2'] animate-in fade-in slide-in-from-bottom-4 duration-700" }, _attrs))}><header class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-8 gap-6"><div class="space-y-2"><h2 class="text-3xl font-black uppercase tracking-tighter italic"> 01. ${ssrInterpolate(_ctx.$t("Contacts"))}</h2><p class="text-gray-500 text-sm tracking-wide uppercase">${ssrInterpolate(__props.authUser ? `` : _ctx.$t("Fill in your details or login"))}</p></div>`);
      if (!__props.authUser) {
        _push(`<button type="button" class="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500"><span>${ssrInterpolate(_ctx.$t("Login"))}</span>`);
        _push(ssrRenderComponent(unref(IconCircleCheck), {
          size: "16",
          class: "text-gray-400 group-hover:text-white transition-colors"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        label: _ctx.$t("Name"),
        modelValue: __props.form.name,
        "onUpdate:modelValue": ($event) => __props.form.name = $event,
        placeholder: _ctx.$t("Enter your name"),
        error: __props.form.errors.name ? _ctx.$t(__props.form.errors.name) : ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: _ctx.$t("LastName"),
        modelValue: __props.form.last_name,
        "onUpdate:modelValue": ($event) => __props.form.last_name = $event,
        placeholder: _ctx.$t("Enter your last name"),
        error: __props.form.errors.last_name ? _ctx.$t(__props.form.errors.last_name) : ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: _ctx.$t("Email"),
        modelValue: __props.form.email,
        "onUpdate:modelValue": ($event) => __props.form.email = $event,
        type: "email",
        placeholder: "example@mail.com",
        error: __props.form.errors.email ? _ctx.$t(__props.form.errors.email) : ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        label: _ctx.$t("Phone"),
        modelValue: __props.form.phone,
        "onUpdate:modelValue": ($event) => __props.form.phone = $event,
        type: "tel",
        placeholder: "+38 0__ ___ __ __",
        error: __props.form.errors.phone ? _ctx.$t(__props.form.errors.phone) : ""
      }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ## ##")), null, _parent));
      _push(`</div><div class="pt-4"><button type="button" class="flex items-center gap-3 group transition-colors"><div class="w-6 h-6 border border-black flex items-center justify-center p-1">`);
      if (showRecipientFields.value) {
        _push(`<div class="w-full h-full bg-black"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="${ssrRenderClass([showRecipientFields.value ? "text-black" : "text-gray-400 group-hover:text-black", "text-xs font-bold uppercase tracking-widest"])}">${ssrInterpolate(_ctx.$t("Another recipient"))}</span></button></div>`);
      if (showRecipientFields.value) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 p-8 bg-gray-50 border border-dashed border-gray-200 animate-in zoom-in-95 duration-300">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          label: _ctx.$t("Recipient Name"),
          modelValue: __props.form.recipient_name,
          "onUpdate:modelValue": ($event) => __props.form.recipient_name = $event,
          error: __props.form.errors.recipient_name ? _ctx.$t(__props.form.errors.recipient_name) : ""
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, {
          label: _ctx.$t("Recipient Last Name"),
          modelValue: __props.form.recipient_last_name,
          "onUpdate:modelValue": ($event) => __props.form.recipient_last_name = $event,
          error: __props.form.errors.recipient_last_name ? _ctx.$t(__props.form.errors.recipient_last_name) : ""
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          class: "md:col-span-2",
          label: _ctx.$t("Recipient Phone"),
          modelValue: __props.form.recipient_phone,
          "onUpdate:modelValue": ($event) => __props.form.recipient_phone = $event,
          error: __props.form.errors.recipient_phone ? _ctx.$t(__props.form.errors.recipient_phone) : ""
        }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ## ##")), null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<footer class="flex justify-end pt-12 border-t border-gray-100"><button type="button" class="group flex items-center gap-6 bg-black text-white pl-10 pr-6 py-6 hover:bg-zinc-900 transition-all duration-300"><span class="text-xs font-black uppercase tracking-[0.3em]">${ssrInterpolate(_ctx.$t("Next step"))}</span><div class="w-12 h-px bg-white/30 group-hover:w-16 transition-all duration-500"></div>`);
      _push(ssrRenderComponent(unref(IconArrowRight), { size: "20" }, null, _parent));
      _push(`</button></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout/Steps/StepContact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

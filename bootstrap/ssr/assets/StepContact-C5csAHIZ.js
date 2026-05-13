import { ref, computed, resolveDirective, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { IconCircleCheck, IconAlertCircle, IconChevronRight } from "@tabler/icons-vue";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "StepContact",
  __ssrInlineRender: true,
  props: { form: Object },
  emits: ["next", "open-auth"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const touched = ref(/* @__PURE__ */ new Set());
    const isStepValid = computed(() => {
      const f = props.form;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isPhoneValid = (phone) => phone?.length === 16;
      const mainValid = f.last_name?.length > 1 && f.name?.length > 1 && isPhoneValid(f.phone) && emailRegex.test(f.email);
      if (f.different_recipient) {
        return mainValid && f.recipient_last_name?.length > 1 && f.recipient_name?.length > 1 && isPhoneValid(f.recipient_phone);
      }
      return mainValid;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto space-y-12 py-10 animate-in fade-in duration-700" }, _attrs))} data-v-71bf7090><header class="flex justify-between items-start" data-v-71bf7090><div class="space-y-1" data-v-71bf7090><h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-black" data-v-71bf7090> 01. Контакти </h3><p class="text-[9px] text-gray-400 uppercase tracking-widest" data-v-71bf7090> Персональні дані замовника </p></div>`);
      if (!_ctx.$page.props.auth.user) {
        _push(`<button type="button" class="group flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all" data-v-71bf7090><span data-v-71bf7090>Увійти</span>`);
        _push(ssrRenderComponent(unref(IconCircleCheck), {
          size: "14",
          class: "text-gray-300 group-hover:text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" data-v-71bf7090><div class="relative group" data-v-71bf7090>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: "Прізвище",
        class: [[
          touched.value.has("last_name") && __props.form.last_name?.length < 2 ? "text-red-500" : "text-gray-400"
        ], "text-[9px] uppercase tracking-widest mb-1"]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: __props.form.last_name,
        "onUpdate:modelValue": ($event) => __props.form.last_name = $event,
        onBlur: ($event) => touched.value.add("last_name"),
        placeholder: "Шевченко",
        class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [
          touched.value.has("last_name") && __props.form.last_name?.length < 2 ? "border-red-300" : "border-gray-100 focus:border-black"
        ]]
      }, null, _parent));
      _push(`</div><div class="relative group" data-v-71bf7090>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: "Ім'я",
        class: [[
          touched.value.has("name") && __props.form.name?.length < 2 ? "text-red-500" : "text-gray-400"
        ], "text-[9px] uppercase tracking-widest mb-1"]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: __props.form.name,
        "onUpdate:modelValue": ($event) => __props.form.name = $event,
        onBlur: ($event) => touched.value.add("name"),
        placeholder: "Андрій",
        class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [
          touched.value.has("name") && __props.form.name?.length < 2 ? "border-red-300" : "border-gray-100 focus:border-black"
        ]]
      }, null, _parent));
      _push(`</div><div class="relative group" data-v-71bf7090>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: "Телефон",
        class: [[
          touched.value.has("phone") && __props.form.phone?.length < 16 ? "text-red-500" : "text-gray-400"
        ], "text-[9px] uppercase tracking-widest mb-1"]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        modelValue: __props.form.phone,
        "onUpdate:modelValue": ($event) => __props.form.phone = $event,
        placeholder: "+38 0__ ___ ____",
        type: "tel",
        onBlur: ($event) => touched.value.add("phone"),
        class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all tracking-widest", [
          touched.value.has("phone") && __props.form.phone?.length < 16 ? "border-red-300" : "border-gray-100 focus:border-black"
        ]]
      }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ####")), null, _parent));
      _push(`</div><div class="relative group" data-v-71bf7090>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: "Email",
        class: [[
          touched.value.has("email") && !__props.form.email?.includes("@") ? "text-red-500" : "text-gray-400"
        ], "text-[9px] uppercase tracking-widest mb-1"]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: __props.form.email,
        "onUpdate:modelValue": ($event) => __props.form.email = $event,
        onBlur: ($event) => touched.value.add("email"),
        placeholder: "example@mail.com",
        class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [
          touched.value.has("email") && !__props.form.email?.includes("@") ? "border-red-300" : "border-gray-100 focus:border-black"
        ]]
      }, null, _parent));
      _push(`</div></div><div class="${ssrRenderClass([
        __props.form.different_recipient ? "bg-black border-black" : "bg-gray-50 border-gray-100",
        "flex items-center justify-between p-8 rounded-[2rem] border transition-all cursor-pointer group shadow-sm hover:shadow-md"
      ])}" data-v-71bf7090><div class="flex items-center gap-4" data-v-71bf7090><div class="${ssrRenderClass([
        __props.form.different_recipient ? "bg-white/20" : "bg-gray-200",
        "w-10 h-5 rounded-full relative transition-colors"
      ])}" data-v-71bf7090><div class="${ssrRenderClass([[
        __props.form.different_recipient ? "translate-x-5 bg-white" : "bg-gray-400"
      ], "absolute top-1 left-1 w-3 h-3 rounded-full transition-transform"])}" data-v-71bf7090></div></div><span class="${ssrRenderClass([
        __props.form.different_recipient ? "text-white" : "text-gray-400",
        "text-[10px] font-black uppercase tracking-widest"
      ])}" data-v-71bf7090>Отримає інша людина</span></div>`);
      if (!__props.form.different_recipient) {
        _push(ssrRenderComponent(unref(IconAlertCircle), {
          size: "18",
          class: "text-gray-200"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.form.different_recipient) {
        _push(`<div class="space-y-10 pt-10 border-t border-gray-50" data-v-71bf7090><h4 class="text-[10px] font-black uppercase tracking-[0.5em]" data-v-71bf7090> Дані отримувача </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" data-v-71bf7090><div class="relative group" data-v-71bf7090>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Прізвище",
          class: [[
            touched.value.has("recipient_last_name") && __props.form.recipient_last_name?.length < 2 ? "text-red-500" : "text-gray-400"
          ], "text-[9px] uppercase tracking-widest mb-1"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: __props.form.recipient_last_name,
          "onUpdate:modelValue": ($event) => __props.form.recipient_last_name = $event,
          onBlur: ($event) => touched.value.add("recipient_last_name"),
          placeholder: "Коваленко",
          class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [
            touched.value.has("recipient_last_name") && __props.form.recipient_last_name?.length < 2 ? "border-red-300" : "border-gray-100 focus:border-black"
          ]]
        }, null, _parent));
        _push(`</div><div class="relative group" data-v-71bf7090>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Ім'я",
          class: [[
            touched.value.has("recipient_name") && __props.form.recipient_name?.length < 2 ? "text-red-500" : "text-gray-400"
          ], "text-[9px] uppercase tracking-widest mb-1"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: __props.form.recipient_name,
          "onUpdate:modelValue": ($event) => __props.form.recipient_name = $event,
          onBlur: ($event) => touched.value.add("recipient_name"),
          placeholder: "Іван",
          class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [
            touched.value.has("recipient_name") && __props.form.recipient_name?.length < 2 ? "border-red-300" : "border-gray-100 focus:border-black"
          ]]
        }, null, _parent));
        _push(`</div><div class="relative group" data-v-71bf7090>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Телефон отримувача",
          class: [[
            touched.value.has("recipient_phone") && __props.form.recipient_phone?.length < 16 ? "text-red-500" : "text-gray-400"
          ], "text-[9px] uppercase tracking-widest mb-1"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, mergeProps({
          modelValue: __props.form.recipient_phone,
          "onUpdate:modelValue": ($event) => __props.form.recipient_phone = $event,
          placeholder: "+38 0__ ___ ____",
          type: "tel",
          onBlur: ($event) => touched.value.add("recipient_phone"),
          class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all tracking-widest", [
            touched.value.has("recipient_phone") && __props.form.recipient_phone?.length < 16 ? "border-red-300" : "border-gray-100 focus:border-black"
          ]]
        }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ####")), null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<footer class="pt-10" data-v-71bf7090><button type="button" class="${ssrRenderClass([
        isStepValid.value ? "bg-black text-white shadow-xl shadow-black/10" : "bg-gray-50 text-gray-300",
        "group relative w-full py-8 rounded-2xl transition-all font-black uppercase tracking-[0.4em] text-[11px]"
      ])}" data-v-71bf7090><div class="flex items-center justify-center gap-3" data-v-71bf7090><span data-v-71bf7090>${ssrInterpolate(isStepValid.value ? "Продовжити" : "Заповніть форму")}</span>`);
      if (isStepValid.value) {
        _push(ssrRenderComponent(unref(IconChevronRight), {
          size: "18",
          class: "group-hover:translate-x-2 transition-transform"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></button><p class="text-center mt-8 text-[8px] font-black uppercase tracking-[0.6em] text-gray-200" data-v-71bf7090> Крок 01 / 03 </p></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Steps/StepContact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StepContact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71bf7090"]]);
export {
  StepContact as default
};

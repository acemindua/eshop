import { ref, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { IconX, IconEye, IconEyeOff, IconArrowRight } from "@tabler/icons-vue";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AuthModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    initialMode: { type: String, default: "login" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const authMode = ref(props.initialMode);
    const passwordShow = ref(false);
    const form = useForm({
      name: "",
      email: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4" data-v-d7c1e02b><div class="absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity" data-v-d7c1e02b></div><div class="relative bg-white w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)]" data-v-d7c1e02b><button class="absolute top-6 right-6 z-10 text-gray-300 hover:text-black transition-colors" data-v-d7c1e02b>`);
          _push2(ssrRenderComponent(unref(IconX), {
            size: 20,
            "stroke-width": "1.5"
          }, null, _parent));
          _push2(`</button><div class="p-10 sm:p-12" data-v-d7c1e02b><div class="mb-10 text-center" data-v-d7c1e02b><h2 class="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-2" data-v-d7c1e02b>${ssrInterpolate(authMode.value === "login" ? "01. Вхід" : "01. Реєстрація")}</h2><p class="text-xl font-light text-gray-900 tracking-tight" data-v-d7c1e02b>${ssrInterpolate(authMode.value === "login" ? "З поверненням" : "Створити акаунт")}</p></div><div class="flex gap-8 justify-center mb-10" data-v-d7c1e02b><button class="${ssrRenderClass([
            authMode.value === "login" ? "text-black border-black" : "text-gray-300 border-transparent",
            "text-[10px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all"
          ])}" data-v-d7c1e02b> Увійти </button><button class="${ssrRenderClass([
            authMode.value === "register" ? "text-black border-black" : "text-gray-300 border-transparent",
            "text-[10px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all"
          ])}" data-v-d7c1e02b> Створити </button></div><form class="space-y-8" data-v-d7c1e02b>`);
          if (authMode.value === "register") {
            _push2(`<div class="animate-in slide-in-from-top-2 duration-300" data-v-d7c1e02b>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "name",
              value: "Ім'я",
              class: "text-[9px] uppercase tracking-widest text-gray-400 mb-1"
            }, null, _parent));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              class: "w-full border-0 border-b border-gray-100 rounded-none px-0 focus:ring-0 focus:border-black transition-all",
              placeholder: "Ваше ім'я"
            }, null, _parent));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.name,
              class: "mt-1 text-[10px]"
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div data-v-d7c1e02b>`);
          _push2(ssrRenderComponent(_sfc_main$1, {
            for: "email",
            value: "Email",
            class: "text-[9px] uppercase tracking-widest text-gray-400 mb-1"
          }, null, _parent));
          _push2(ssrRenderComponent(_sfc_main$2, {
            id: "email",
            type: "email",
            modelValue: unref(form).email,
            "onUpdate:modelValue": ($event) => unref(form).email = $event,
            class: "w-full border-0 border-b border-gray-100 rounded-none px-0 focus:ring-0 focus:border-black transition-all",
            placeholder: "example@mail.com"
          }, null, _parent));
          _push2(ssrRenderComponent(_sfc_main$3, {
            message: unref(form).errors.email,
            class: "mt-1 text-[10px]"
          }, null, _parent));
          _push2(`</div><div data-v-d7c1e02b>`);
          _push2(ssrRenderComponent(_sfc_main$1, {
            for: "password",
            value: "Пароль",
            class: "text-[9px] uppercase tracking-widest text-gray-400 mb-1"
          }, null, _parent));
          _push2(`<div class="relative" data-v-d7c1e02b>`);
          _push2(ssrRenderComponent(_sfc_main$2, {
            id: "password",
            type: passwordShow.value ? "text" : "password",
            modelValue: unref(form).password,
            "onUpdate:modelValue": ($event) => unref(form).password = $event,
            class: "w-full border-0 border-b border-gray-100 rounded-none px-0 pr-8 focus:ring-0 focus:border-black transition-all",
            placeholder: "••••••••"
          }, null, _parent));
          _push2(`<button type="button" class="absolute right-0 bottom-2 text-gray-300 hover:text-black" data-v-d7c1e02b>`);
          if (passwordShow.value) {
            _push2(ssrRenderComponent(unref(IconEye), { size: 16 }, null, _parent));
          } else {
            _push2(ssrRenderComponent(unref(IconEyeOff), { size: 16 }, null, _parent));
          }
          _push2(`</button></div>`);
          _push2(ssrRenderComponent(_sfc_main$3, {
            message: unref(form).errors.password,
            class: "mt-1 text-[10px]"
          }, null, _parent));
          _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group" data-v-d7c1e02b>${ssrInterpolate(authMode.value === "login" ? "Увійти" : "Зареєструватися")} `);
          _push2(ssrRenderComponent(unref(IconArrowRight), {
            size: 16,
            class: "group-hover:translate-x-1 transition-transform"
          }, null, _parent));
          _push2(`</button></form><div class="mt-10 pt-10 border-t border-gray-50" data-v-d7c1e02b><a${ssrRenderAttr("href", _ctx.route("auth.google.redirect"))} class="flex items-center justify-center gap-3 w-full py-4 border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all" data-v-d7c1e02b><svg class="w-4 h-4" viewBox="0 0 48 48" data-v-d7c1e02b><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" data-v-d7c1e02b></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" data-v-d7c1e02b></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" data-v-d7c1e02b></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" data-v-d7c1e02b></path></svg> Google </a></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Auth/AuthModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7c1e02b"]]);
export {
  AuthModal as A
};

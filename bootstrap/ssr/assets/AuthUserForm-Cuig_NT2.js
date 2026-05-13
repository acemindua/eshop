import { ref, computed, resolveDirective, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderVNode, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { IconUser, IconMail, IconPhone, IconShieldLock, IconEye, IconEyeClosed } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "AuthUserForm",
  __ssrInlineRender: true,
  props: {
    initialMode: { type: String, default: "login" }
  },
  setup(__props) {
    const props = __props;
    const authMode = ref(props.initialMode);
    const passwordShow = ref(false);
    const form = useForm({
      name: "",
      email: "",
      password: "",
      phone: "+380",
      remember: true
    });
    const config = computed(() => ({
      buttonText: authMode.value === "login" ? "Увійти" : "Створити аккаунт",
      routeName: authMode.value === "login" ? "login.store" : "register.store",
      title: authMode.value === "login" ? "Вхід у кабінет" : "Новий користувач"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-md mx-auto space-y-6" }, _attrs))}><div class="flex p-1 bg-gray-100 rounded-xl w-full"><!--[-->`);
      ssrRenderList(["login", "register"], (mode) => {
        _push(`<button class="${ssrRenderClass([
          "flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
          authMode.value === mode ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
        ])}">${ssrInterpolate(mode === "login" ? "Вхід" : "Реєстрація")}</button>`);
      });
      _push(`<!--]--></div><form class="space-y-4">`);
      if (authMode.value === "register") {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "name",
          value: "Ваше ім'я"
        }, null, _parent));
        _push(`<div class="relative mt-1">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "name",
          type: "text",
          class: "block w-full pl-10",
          modelValue: unref(form).name,
          "onUpdate:modelValue": ($event) => unref(form).name = $event,
          placeholder: "Олександр"
        }, null, _parent));
        _push(ssrRenderComponent(unref(IconUser), {
          class: "absolute top-3 left-3 text-gray-400",
          size: 18
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form).errors.name
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "email",
        value: "Email"
      }, null, _parent));
      _push(`<div class="relative mt-1">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "email",
        type: "email",
        class: "block w-full pl-10",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        placeholder: "example@mail.com"
      }, null, _parent));
      _push(ssrRenderComponent(unref(IconMail), {
        class: "absolute top-3 left-3 text-gray-400",
        size: 18
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div>`);
      if (authMode.value === "register") {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "phone",
          value: "Номер телефону"
        }, null, _parent));
        _push(`<div class="relative mt-1">`);
        _push(ssrRenderComponent(_sfc_main$2, mergeProps({
          id: "phone",
          type: "tel",
          class: "block w-full pl-10",
          modelValue: unref(form).phone,
          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
          placeholder: "+380 (__) ___-__-__"
        }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ####")), null, _parent));
        _push(ssrRenderComponent(unref(IconPhone), {
          class: "absolute top-3 left-3 text-gray-400",
          size: 18
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form).errors.phone
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><div class="flex justify-between items-center mb-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "password",
        value: "Пароль"
      }, null, _parent));
      if (authMode.value === "login") {
        _push(`<a${ssrRenderAttr("href", _ctx.route("password.request"))} class="text-xs font-medium text-blue-600 hover:text-blue-500"> Забули пароль? </a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "password",
        type: passwordShow.value ? "text" : "password",
        class: "block w-full px-10",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(unref(IconShieldLock), {
        class: "absolute top-3 left-3 text-gray-400",
        size: 18
      }, null, _parent));
      _push(`<button type="button" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(passwordShow.value ? unref(IconEye) : unref(IconEyeClosed)), { size: 18 }, null), _parent);
      _push(`</button></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (unref(form).processing) {
        _push(`<span class="inline-block animate-pulse">Завантаження...</span>`);
      } else {
        _push(`<span>${ssrInterpolate(config.value.buttonText)}</span>`);
      }
      _push(`</button></form><div class="relative py-2"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div><div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-4 text-gray-400 font-medium tracking-tighter italic">або через</span></div></div><a${ssrRenderAttr("href", _ctx.route("auth.google.redirect"))} class="flex items-center justify-center gap-3 w-full py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-semibold text-gray-700 shadow-sm"><svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg><span>Продовжити з Google</span></a></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/AuthUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

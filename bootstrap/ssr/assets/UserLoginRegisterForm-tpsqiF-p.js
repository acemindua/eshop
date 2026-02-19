import { ref, unref, useSSRContext, computed, resolveComponent, withCtx, openBlock, createBlock, createVNode, toDisplayString } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { useForm, usePage } from "@inertiajs/vue3";
import { IconX, IconUser, IconMail, IconShieldLock, IconEye, IconEyeClosed, IconUserFilled } from "@tabler/icons-vue";
import { _ as _sfc_main$2, b as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-C-4bWHj0.js";
const _sfc_main$1 = {
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
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center sm:p-4"><div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div><div class="relative bg-white w-full h-full sm:h-auto sm:max-w-[700px] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200"><button class="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full md:bg-transparent text-gray-500 hover:text-gray-800">`);
          _push2(ssrRenderComponent(unref(IconX), { size: 20 }, null, _parent));
          _push2(`</button><div class="hidden md:flex w-1/3 bg-indigo-600 p-8 text-white flex-col justify-center"><h2 class="text-2xl font-bold">S-Market</h2><p class="mt-4 text-indigo-100 text-sm">${ssrInterpolate(authMode.value === "login" ? "З поверненням!" : "Створіть аккаунт для бонусів.")}</p></div><div class="flex-1 p-6 sm:p-10 overflow-y-auto"><div class="flex border-b mb-6 text-sm"><button class="${ssrRenderClass([
            "flex-1 pb-3 transition",
            authMode.value === "login" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-400"
          ])}"> Увійти </button><button class="${ssrRenderClass([
            "flex-1 pb-3 transition",
            authMode.value === "register" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-400"
          ])}"> Реєстрація </button></div><form class="space-y-4">`);
          if (authMode.value === "register") {
            _push2(`<div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: "Ім'я"
            }, null, _parent));
            _push2(`<div class="relative">`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full pl-10",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: ""
            }, null, _parent));
            _push2(ssrRenderComponent(unref(IconUser), {
              class: "absolute top-2.5 left-3 text-gray-400",
              size: 18
            }, null, _parent));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.name
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div>`);
          _push2(ssrRenderComponent(_sfc_main$2, {
            for: "email",
            value: "Email"
          }, null, _parent));
          _push2(`<div class="relative">`);
          _push2(ssrRenderComponent(_sfc_main$3, {
            id: "email",
            type: "email",
            class: "mt-1 block w-full pl-10",
            modelValue: unref(form).email,
            "onUpdate:modelValue": ($event) => unref(form).email = $event,
            required: ""
          }, null, _parent));
          _push2(ssrRenderComponent(unref(IconMail), {
            class: "absolute top-2.5 left-3 text-gray-400",
            size: 18
          }, null, _parent));
          _push2(`</div>`);
          _push2(ssrRenderComponent(_sfc_main$4, {
            message: unref(form).errors.email
          }, null, _parent));
          _push2(`</div><div>`);
          _push2(ssrRenderComponent(_sfc_main$2, {
            for: "password",
            value: "Пароль"
          }, null, _parent));
          _push2(`<div class="relative">`);
          _push2(ssrRenderComponent(_sfc_main$3, {
            id: "password",
            type: passwordShow.value ? "text" : "password",
            class: "mt-1 block w-full px-10",
            modelValue: unref(form).password,
            "onUpdate:modelValue": ($event) => unref(form).password = $event,
            required: ""
          }, null, _parent));
          _push2(ssrRenderComponent(unref(IconShieldLock), {
            class: "absolute top-2.5 left-3 text-gray-400",
            size: 18
          }, null, _parent));
          _push2(`<button type="button" class="absolute top-2.5 right-3 text-gray-400">`);
          if (passwordShow.value) {
            _push2(ssrRenderComponent(unref(IconEye), { size: 18 }, null, _parent));
          } else {
            _push2(ssrRenderComponent(unref(IconEyeClosed), { size: 18 }, null, _parent));
          }
          _push2(`</button></div>`);
          _push2(ssrRenderComponent(_sfc_main$4, {
            message: unref(form).errors.password
          }, null, _parent));
          _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">${ssrInterpolate(authMode.value === "login" ? "Увійти" : "Створити аккаунт")}</button></form><div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div><div class="relative flex justify-center text-xs uppercase"><span class="px-2 bg-white text-gray-400 font-medium tracking-wider">${ssrInterpolate(_ctx.$t("або"))}</span></div></div><a${ssrRenderAttr("href", _ctx.route("auth.google.redirect"))} class="flex items-center justify-center gap-3 w-full py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition text-sm font-semibold text-gray-700 shadow-sm"><svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg><span>Продовжити з Google</span></a></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Auth/AuthModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "UserLoginRegisterForm",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const isModalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><div class="flex items-center gap-3">`);
      if (user.value) {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("account"),
          class: ["flex flex-col items-center hover:text-brand duration-150 rounded-lg", {
            "text-brand md:text-gray-800": _ctx.$page.url.startsWith("/account")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (_ctx.$page.url.startsWith("/account")) {
                _push2(ssrRenderComponent(unref(IconUserFilled), {
                  size: 24,
                  stroke: 2
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(IconUser), {
                  size: 24,
                  stroke: 2
                }, null, _parent2, _scopeId));
              }
              _push2(`<span class="text-xs font-semibold md:font-normal tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("Кабінет"))}</span>`);
            } else {
              return [
                _ctx.$page.url.startsWith("/account") ? (openBlock(), createBlock(unref(IconUserFilled), {
                  key: 0,
                  size: 24,
                  stroke: 2
                })) : (openBlock(), createBlock(unref(IconUser), {
                  key: 1,
                  size: 24,
                  stroke: 2
                })),
                createVNode("span", { class: "text-xs font-semibold md:font-normal tracking-tight" }, toDisplayString(_ctx.$t("Кабінет")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<button class="flex flex-col items-center hover:text-brand duration-150">`);
        _push(ssrRenderComponent(unref(IconUser), {
          size: 24,
          stroke: 2
        }, null, _parent));
        _push(`<span class="text-xs font-semibold md:font-normal tracking-tight">${ssrInterpolate(_ctx.$t("Увійти"))}</span></button>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: isModalOpen.value,
        onClose: ($event) => isModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/UserLoginRegisterForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};

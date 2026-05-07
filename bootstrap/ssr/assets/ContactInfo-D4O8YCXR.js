import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: {
    modelValue: [String, Number],
    label: String,
    type: { type: String, default: "text" },
    placeholder: String,
    error: String,
    readonly: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""} class="${ssrRenderClass([{
        "border-red-500": __props.error,
        "bg-gray-50 opacity-70 cursor-not-allowed": __props.readonly
      }, "border-gray-300 focus:border-black focus:ring-0 transition-colors py-2.5 px-3 text-sm rounded-none outline-none"])}" autocomplete="off">`);
      if (__props.error) {
        _push(`<span class="text-red-500 text-[10px] mt-1 uppercase font-bold tracking-tighter">${ssrInterpolate(__props.error)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/BaseInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ContactInfo",
  __ssrInlineRender: true,
  props: {
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    errors: Object
  },
  emits: [
    "update:first_name",
    "update:last_name",
    "update:email",
    "update:phone",
    "open-auth",
    "open-register"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 border border-gray-200 shadow-sm" }, _attrs))}><div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8"><h2 class="text-sm font-bold uppercase tracking-[0.2em]"> 1. Контактні дані </h2>`);
      if (_ctx.$page.props.auth.user) {
        _push(`<div class="flex items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-widest"><span class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> Дані заповнено з профілю </div>`);
      } else {
        _push(`<div class="text-[10px] text-gray-400 uppercase tracking-widest flex gap-3"><span>Вже купували? <button type="button" class="text-black font-bold underline"> Увійти </button></span><span class="text-gray-200">|</span><span>Вперше у нас? <button type="button" class="text-black font-bold underline"> Реєстрація </button></span></div>`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Ім'я",
        "model-value": __props.first_name,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:first_name", $event),
        error: __props.errors?.first_name,
        placeholder: "Введіть ім'я"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Прізвище",
        "model-value": __props.last_name,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:last_name", $event),
        error: __props.errors?.last_name,
        placeholder: "Введіть прізвище"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Телефон",
        "model-value": __props.phone,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:phone", $event),
        error: __props.errors?.phone,
        placeholder: "+380..."
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Email",
        "model-value": __props.email,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:email", $event),
        error: __props.errors?.email,
        readonly: !!_ctx.$page.props.auth.user,
        placeholder: "Приклад: user@mail.com"
      }, null, _parent));
      _push(`</div>`);
      if (!_ctx.$page.props.auth.user) {
        _push(`<p class="mt-4 text-[11px] text-gray-500 italic"> * Ви можете заповнити дані вручну. Після замовлення ми автоматично створимо для вас акаунт. </p>`);
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
export {
  _sfc_main as default
};

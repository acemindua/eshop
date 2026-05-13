import { computed, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrGetDirectiveProps, ssrGetDynamicModelProps, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Layout-eqAzibxp.js";
import { IconUserScan, IconEdit, IconLogout, IconCheck, IconShoppingBag } from "@tabler/icons-vue";
import { useForm, Link } from "@inertiajs/vue3";
import { vMask } from "vue-the-mask";
import "sweetalert2";
import moment from "moment";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./Breadcrumbs-Be9A5eey.js";
import "./LangSwitcher-wZTGpIJc.js";
import "@headlessui/vue";
import "laravel-vue-i18n";
import "./useLocales-Cm2D8rND.js";
import "./UserLoginRegisterForm-CzuFF-4H.js";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: { data: Object },
  setup(__props) {
    const props = __props;
    const user = computed(() => props.data?.user || {});
    const isEditing = ref(false);
    const form = useForm({
      name: "",
      last_name: "",
      middle_name: "",
      phone: "",
      birthday: "",
      gender: "",
      preferred_locale: ""
    });
    watch(
      () => user.value,
      (newVal) => {
        form.name = newVal.name || "";
        form.last_name = newVal.last_name || "";
        form.middle_name = newVal.middle_name || "";
        form.phone = newVal.phone || "";
        form.birthday = newVal.birthday ? newVal.birthday.split("T")[0] : "";
        form.gender = newVal.gender || "";
        form.preferred_locale = newVal.preferred_locale || "uk";
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-12 w-full min-h-screen bg-gray-100 gap-[1px]" }, _attrs))} data-v-61cb2901><div class="md:col-span-4 bg-white p-12 flex flex-col items-center border-r border-gray-100" data-v-61cb2901><div class="sticky top-12 w-full space-y-8" data-v-61cb2901><div class="flex justify-center" data-v-61cb2901><div class="relative group cursor-pointer" data-v-61cb2901><div class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100 flex items-center justify-center" data-v-61cb2901>`);
      if (user.value.avatar) {
        _push(`<img${ssrRenderAttr("src", user.value.avatar)} class="w-full h-full object-cover" data-v-61cb2901>`);
      } else {
        _push(ssrRenderComponent(unref(IconUserScan), {
          size: 48,
          class: "text-gray-300"
        }, null, _parent));
      }
      _push(`</div><div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" data-v-61cb2901>`);
      _push(ssrRenderComponent(unref(IconEdit), {
        class: "text-white",
        size: 20
      }, null, _parent));
      _push(`</div><input type="file" class="hidden" data-v-61cb2901></div></div><div class="text-center" data-v-61cb2901><h1 class="text-xl font-bold font-[&#39;Exo_2&#39;] uppercase tracking-tight" data-v-61cb2901>${ssrInterpolate(user.value.full_name)}</h1><p class="text-xs font-mono text-gray-400 mt-1" data-v-61cb2901>${ssrInterpolate(user.value.email)}</p></div><div class="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100" data-v-61cb2901><span class="text-[10px] uppercase tracking-[0.2em] opacity-80 font-bold" data-v-61cb2901>${ssrInterpolate(_ctx.$t("Бонусний рахунок"))}</span><div class="text-4xl font-black font-[&#39;Exo_2&#39;] mt-2" data-v-61cb2901>${ssrInterpolate(user.value.bonus_balance)} <span class="text-lg font-light" data-v-61cb2901>₴</span></div></div><div class="pt-8 border-t border-gray-50 flex flex-col items-center gap-6" data-v-61cb2901><div class="flex gap-2" data-v-61cb2901><!--[-->`);
      ssrRenderList(["uk", "en"], (l) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all",
          user.value.preferred_locale === l ? "bg-black text-white" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
        ])}" data-v-61cb2901>${ssrInterpolate(l)}</button>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/logout",
        method: "post",
        as: "button",
        class: "text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconLogout), { size: 16 }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.$t("Вийти"))}`);
          } else {
            return [
              createVNode(unref(IconLogout), { size: 16 }),
              createTextVNode(" " + toDisplayString(_ctx.$t("Вийти")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="md:col-span-8 bg-white p-12" data-v-61cb2901><div class="max-w-3xl" data-v-61cb2901><div class="flex justify-between items-center mb-12" data-v-61cb2901><h2 class="text-xs uppercase font-bold tracking-[0.3em] text-gray-400" data-v-61cb2901>${ssrInterpolate(_ctx.$t("Особисті дані"))}</h2><button class="${ssrRenderClass([
        isEditing.value ? "bg-indigo-50 text-indigo-600" : "bg-gray-50 text-gray-400 hover:text-black",
        "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all"
      ])}" data-v-61cb2901>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(isEditing.value ? unref(IconCheck) : unref(IconEdit)), { size: 14 }, null), _parent);
      _push(` ${ssrInterpolate(isEditing.value ? _ctx.$t("Завершити") : _ctx.$t("Редагувати"))}</button></div><form class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8" data-v-61cb2901><!--[-->`);
      ssrRenderList([
        { id: "last_name", label: "Прізвище" },
        { id: "name", label: "Ім’я" },
        { id: "middle_name", label: "По-батькові" }
      ], (field) => {
        _push(`<div class="space-y-1" data-v-61cb2901><label class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter" data-v-61cb2901>${ssrInterpolate(_ctx.$t(field.label))}</label>`);
        if (isEditing.value) {
          _push(`<input${ssrRenderAttr("value", unref(form)[field.id])} type="text" class="input-style" data-v-61cb2901>`);
        } else {
          _push(`<p class="text-lg font-bold font-[&#39;Exo_2&#39;]" data-v-61cb2901>${ssrInterpolate(user.value[field.id] || "—")}</p>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><div class="space-y-1" data-v-61cb2901><label class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter" data-v-61cb2901>${ssrInterpolate(_ctx.$t("Телефон"))}</label>`);
      if (isEditing.value) {
        _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
          value: unref(form).phone,
          class: "input-style"
        }, ssrGetDirectiveProps(_ctx, unref(vMask), "+38 (0##) ###-##-##")), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(form).phone))))} data-v-61cb2901>`);
      } else {
        _push(`<p class="text-lg font-bold font-[&#39;Exo_2&#39;]" data-v-61cb2901>${ssrInterpolate(user.value.phone || "—")}</p>`);
      }
      _push(`</div><div class="space-y-1" data-v-61cb2901><label class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter" data-v-61cb2901>${ssrInterpolate(_ctx.$t("Дата народження"))}</label>`);
      if (isEditing.value) {
        _push(`<input${ssrRenderAttr("value", unref(form).birthday)} type="date" class="input-style" data-v-61cb2901>`);
      } else {
        _push(`<p class="text-lg font-bold font-[&#39;Exo_2&#39;]" data-v-61cb2901>${ssrInterpolate(user.value.birthday ? unref(moment)(user.value.birthday).format("DD.MM.YYYY") : "—")}</p>`);
      }
      _push(`</div><div class="space-y-1" data-v-61cb2901><label class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter" data-v-61cb2901>${ssrInterpolate(_ctx.$t("Стать"))}</label>`);
      if (isEditing.value) {
        _push(`<select class="input-style bg-transparent" data-v-61cb2901><option value="male" data-v-61cb2901${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "male") : ssrLooseEqual(unref(form).gender, "male")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Чоловіча"))}</option><option value="female" data-v-61cb2901${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "female") : ssrLooseEqual(unref(form).gender, "female")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Жіноча"))}</option><option value="other" data-v-61cb2901${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "other") : ssrLooseEqual(unref(form).gender, "other")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Інша"))}</option></select>`);
      } else {
        _push(`<p class="text-lg font-bold font-[&#39;Exo_2&#39;] capitalize" data-v-61cb2901>${ssrInterpolate(_ctx.$t(user.value.gender || "—"))}</p>`);
      }
      _push(`</div>`);
      if (isEditing.value) {
        _push(`<div class="md:col-span-2 pt-4" data-v-61cb2901><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all disabled:opacity-50" data-v-61cb2901>${ssrInterpolate(unref(form).processing ? _ctx.$t("Зберігаємо...") : _ctx.$t("Зберегти зміни"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form><div class="mt-20" data-v-61cb2901><h2 class="text-xs uppercase font-bold tracking-[0.3em] text-gray-400 mb-8" data-v-61cb2901>${ssrInterpolate(_ctx.$t("Історія замовлень"))}</h2><div class="border border-gray-100 rounded-3xl p-12 text-center bg-gray-50/30" data-v-61cb2901>`);
      _push(ssrRenderComponent(unref(IconShoppingBag), {
        size: 40,
        class: "mx-auto text-gray-200 mb-4"
      }, null, _parent));
      _push(`<p class="text-sm text-gray-400 italic" data-v-61cb2901>${ssrInterpolate(_ctx.$t("У вас поки немає замовлень"))}</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "inline-block mt-6 text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:text-black transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Перейти до покупок"))} → `);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Перейти до покупок")) + " → ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Account/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-61cb2901"]]);
export {
  Index as default
};

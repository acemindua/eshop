import { ref, computed, onUnmounted, resolveDirective, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrGetDirectiveProps, ssrGetDynamicModelProps, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useForm, t as trans } from "../ssr.js";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { IconArrowLeft, IconCamera, IconShield, IconUser, IconMail, IconPhone, IconLock, IconEye, IconEyeOff } from "@tabler/icons-vue";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-D87biKav.js";
import { _ as _sfc_main$2 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1 } from "./BaseSelect-C84DXq4U.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "UserForm",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => null },
    roles: { type: Array, default: () => [] },
    routePrefix: { type: String, required: true },
    isEditing: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const imagePreview = ref(props.data?.avatar || null);
    const showPassword = ref(false);
    const getInitialState = () => ({
      name: props.data?.name || "",
      last_name: props.data?.last_name || "",
      middle_name: props.data?.middle_name || "",
      email: props.data?.email || "",
      phone: props.data?.phone || "",
      birthday: props.data?.birthday || "",
      gender: props.data?.gender || "",
      role: props.data?.role || "auth",
      description: props.data?.description || "",
      password: "",
      password_confirmation: "",
      avatar: null
    });
    const form = useForm(getInitialState());
    const handleSave = () => {
      const url = props.isEditing ? route(`${props.routePrefix}.update`, props.data?.id) : route(`${props.routePrefix}.store`);
      if (props.isEditing) {
        form.transform((data) => ({
          ...data,
          _method: "PUT"
        })).post(url, {
          forceFormData: true,
          preserveState: true,
          onSuccess: () => {
            form.password = "";
            form.password_confirmation = "";
          }
        });
      } else {
        form.post(url, {
          preserveState: true
        });
      }
    };
    const actionButtons = computed(() => [
      {
        label: "cancel",
        action: () => router.visit(route(`${props.routePrefix}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing
      },
      {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing
      }
    ]);
    onUnmounted(() => {
      if (imagePreview.value && imagePreview.value.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview.value);
      }
    });
    const roleOptions = computed(() => {
      if (!props.roles || props.roles.length === 0) {
        return [{ value: "auth", name: "Auth User" }];
      }
      return props.roles.map((role) => ({
        id: role.value,
        name: role.label
      }));
    });
    const genderOptions = computed(() => [
      {
        id: "male",
        name: trans("Male"),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.5 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11zm0 0V21m0 0H9m2.5 0h2.5M16.5 7.5l4.5-4.5m0 0H17m4 0v4"/></svg>`
      },
      {
        id: "female",
        name: trans("Female"),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4a5 5 0 100 10 5 5 0 000-10zm0 10v7m0 0h-3m3 0h3"/></svg>`
      },
      {
        id: "other",
        name: trans("Other"),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5"/></svg>`
      }
    ]);
    const selectedGender = computed({
      get: () => genderOptions.value.find((option) => option.id === form.gender) || null,
      set: (value) => {
        form.gender = value ? value.id : null;
      }
    });
    const selectedRole = computed({
      get: () => roleOptions.value.find((option) => option.id === form.role) || null,
      set: (value) => {
        form.role = value ? value.id : "auth";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><div class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"><div class="flex items-center space-x-3"><button type="button" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-sm transition-all">`);
      _push(ssrRenderComponent(unref(IconArrowLeft), {
        size: "18",
        class: "text-brand"
      }, null, _parent));
      _push(`</button><div><h1 class="text-base font-semibold tracking-tight dark:text-slate-200">${ssrInterpolate(props.isEditing ? props.data?.full_name || _ctx.$t("User Profile") : _ctx.$t("New User Account"))}</h1><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(props.isEditing ? _ctx.$t(
        "Manage operational and personal parameters"
      ) : _ctx.$t(
        "Register a secure user into the ecosystem"
      ))}</p></div></div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons.value }, null, _parent));
      _push(`</div><form class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"><div class="lg:col-span-4 lg:sticky lg:top-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"><div class="flex flex-col items-center text-center"><div class="relative group w-24 h-24 my-4"><label class="block w-full h-full rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-700">`);
      _push(ssrRenderComponent(ImageDataView, {
        src: imagePreview.value,
        configs: { width: "96px", height: "96px" },
        class: "object-cover w-full h-full"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all duration-200 rounded-2xl backdrop-blur-[1px]">`);
      _push(ssrRenderComponent(unref(IconCamera), {
        size: "20",
        class: "scale-90 group-hover:scale-100 transition-transform"
      }, null, _parent));
      _push(`</div><input type="file" class="hidden" accept="image/*"></label></div><h2 class="text-base font-semibold text-slate-800 dark:text-slate-200">${ssrInterpolate(unref(form).name || unref(form).last_name ? `${unref(form).last_name} ${unref(form).name}` : _ctx.$t("Identity Preview"))}</h2><div class="mt-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md">${ssrInterpolate(unref(form).role)}</div></div><div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800"><label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1">`);
      _push(ssrRenderComponent(unref(IconShield), {
        size: "14",
        class: "text-brand"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("System Group Assignment"))}</span></label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        id: "role",
        modelValue: selectedRole.value,
        "onUpdate:modelValue": ($event) => selectedRole.value = $event,
        options: roleOptions.value,
        label: _ctx.$t("Role Selection"),
        placeholder: "—",
        displayKey: "name",
        isStatic: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(form).errors.role
      }, null, _parent));
      _push(`</div>`);
      if (props.isEditing && props.data) {
        _push(`<div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 space-y-2 font-medium"><div class="flex justify-between"><span>Record ID</span><span class="text-slate-700 dark:text-slate-300 font-mono">${ssrInterpolate(props.data?.id)}</span></div><div class="flex justify-between"><span>Last Sync</span><span class="text-slate-700 dark:text-slate-300">${ssrInterpolate(props.data?.last_activity || "—")}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-8 space-y-4"><div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5">`);
      _push(ssrRenderComponent(unref(IconUser), {
        size: "16",
        class: "text-brand"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("General Data"))}</span></h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start"><div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        value: _ctx.$t("Last Name"),
        for: "last_name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "last_name",
        modelValue: unref(form).last_name,
        "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
        class: "block w-full mt-1.5",
        type: "text",
        error: unref(form).errors.last_name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(form).errors.last_name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        value: _ctx.$t("First Name"),
        required: true,
        for: "name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "name",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        class: "block w-full mt-1.5",
        type: "text",
        error: unref(form).errors.name,
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        value: _ctx.$t("Middle Name"),
        for: "middle_name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "middle_name",
        modelValue: unref(form).middle_name,
        "onUpdate:modelValue": ($event) => unref(form).middle_name = $event,
        class: "block w-full mt-1.5",
        type: "text"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(form).errors.middle_name
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"><div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        value: _ctx.$t("Date of Birth"),
        for: "birthday"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "birthday",
        modelValue: unref(form).birthday,
        "onUpdate:modelValue": ($event) => unref(form).birthday = $event,
        type: "date",
        class: "block w-full mt-1.5",
        error: unref(form).errors.birthday
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(form).errors.birthday
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        value: _ctx.$t("Gender"),
        for: "gender"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        id: "gender",
        modelValue: selectedGender.value,
        "onUpdate:modelValue": ($event) => selectedGender.value = $event,
        options: genderOptions.value,
        label: _ctx.$t("Gender"),
        placeholder: "—",
        error: unref(form).errors.gender,
        displayKey: "name",
        isStatic: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(form).errors.gender
      }, null, _parent));
      _push(`</div></div></div><div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5">`);
      _push(ssrRenderComponent(unref(IconMail), {
        size: "16",
        class: "text-brand"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Communication Hub"))}</span></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1">`);
      _push(ssrRenderComponent(unref(IconMail), {
        size: "14",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Email Address"))} <span class="text-rose-500">*</span></span></label><input type="email"${ssrRenderAttr("value", unref(form).email)} class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2" required>`);
      if (unref(form).errors.email) {
        _push(`<div class="text-rose-500 text-xs mt-1">${ssrInterpolate(unref(form).errors.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1">`);
      _push(ssrRenderComponent(unref(IconPhone), {
        size: "14",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Phone Connection"))}</span></label><input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "text",
        value: unref(form).phone,
        placeholder: "+380",
        class: "w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2"
      }, ssrGetDirectiveProps(_ctx, _directive_mask, "+380 (##) ###-##-##")), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(form).phone))))}>`);
      if (unref(form).errors.phone) {
        _push(`<div class="text-rose-500 text-xs mt-1">${ssrInterpolate(unref(form).errors.phone)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 pb-2 flex items-center space-x-1.5">`);
      _push(ssrRenderComponent(unref(IconLock), {
        size: "16",
        class: "text-brand"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Security Credentials"))}</span></h3>`);
      if (props.isEditing) {
        _push(`<p class="text-xs text-slate-400 dark:text-slate-500 mb-5 font-medium">${ssrInterpolate(_ctx.$t(
          "Leave empty if you don't want to change the password"
        ))}</p>`);
      } else {
        _push(`<div class="mb-5 border-b border-slate-50 dark:border-slate-800/50 pb-2"></div>`);
      }
      _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">${ssrInterpolate(_ctx.$t("Password"))} `);
      if (!props.isEditing) {
        _push(`<span class="text-rose-500">*</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><div class="relative"><input${ssrRenderAttr("type", showPassword.value ? "text" : "password")}${ssrRenderDynamicModel(showPassword.value ? "text" : "password", unref(form).password, null)}${ssrIncludeBooleanAttr(!props.isEditing) ? " required" : ""} class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">`);
      if (showPassword.value) {
        _push(ssrRenderComponent(unref(IconEye), { size: "16" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(IconEyeOff), { size: "16" }, null, _parent));
      }
      _push(`</button></div>`);
      if (unref(form).errors.password) {
        _push(`<div class="text-rose-500 text-xs mt-1">${ssrInterpolate(unref(form).errors.password)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">${ssrInterpolate(_ctx.$t("Confirm Password"))} `);
      if (!props.isEditing) {
        _push(`<span class="text-rose-500">*</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><div class="relative"><input${ssrRenderAttr("type", showPassword.value ? "text" : "password")}${ssrRenderDynamicModel(showPassword.value ? "text" : "password", unref(form).password_confirmation, null)}${ssrIncludeBooleanAttr(!props.isEditing) ? " required" : ""} class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">`);
      if (showPassword.value) {
        _push(ssrRenderComponent(unref(IconEye), { size: "16" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(IconEyeOff), { size: "16" }, null, _parent));
      }
      _push(`</button></div>`);
      if (unref(form).errors.password_confirmation) {
        _push(`<div class="text-rose-500 text-xs mt-1">${ssrInterpolate(unref(form).errors.password_confirmation)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Users/Components/UserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

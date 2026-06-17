import { ref, computed, onUnmounted, resolveDirective, mergeProps, withCtx, unref, createVNode, withModifiers, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, withDirectives, vModelText, vModelDynamic, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrGetDirectiveProps, ssrGetDynamicModelProps, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useForm, t as trans } from "../ssr.js";
import "./ButtonsGroup-sb8icSMB.js";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { IconCamera, IconShield, IconUser, IconMail, IconPhone, IconLock, IconEye, IconEyeOff } from "@tabler/icons-vue";
import { _ as _sfc_main$4 } from "./InputLabel-BSWPuOQO.js";
import { _ as _sfc_main$5 } from "./TextInput-5OXx1Hvj.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$2 } from "./BaseSelect-C2DAXbtY.js";
import { _ as _sfc_main$1 } from "./StickyActions-DFSqE-gR.js";
import { router } from "@inertiajs/core";
import "@unhead/vue/server";
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
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) }
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
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        form.avatar = file;
        if (imagePreview.value && imagePreview.value.startsWith("blob:")) {
          URL.revokeObjectURL(imagePreview.value);
        }
        imagePreview.value = URL.createObjectURL(file);
      }
    };
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        buttons: actionButtons.value,
        routePrefix: props.routePrefix,
        title: props.isEditing ? props.data?.full_name || _ctx.$t("User Profile") : _ctx.$t("New User Account"),
        description: props.isEditing ? _ctx.$t("Manage operational and personal parameters") : _ctx.$t("Register a secure user into the ecosystem")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"${_scopeId}><div class="lg:col-span-4 lg:sticky lg:top-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"${_scopeId}><div class="flex flex-col items-center text-center"${_scopeId}><div class="relative group w-24 h-24 my-4"${_scopeId}><label class="block w-full h-full rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(ImageDataView, {
              src: imagePreview.value,
              configs: { width: "96px", height: "96px" },
              class: "object-cover w-full h-full"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all duration-200 rounded-2xl backdrop-blur-[1px]"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconCamera), {
              size: "20",
              class: "scale-90 group-hover:scale-100 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`</div><input type="file" class="hidden" accept="image/*"${_scopeId}></label></div><h2 class="text-base font-semibold text-slate-800 dark:text-slate-200"${_scopeId}>${ssrInterpolate(unref(form).name || unref(form).last_name ? `${unref(form).last_name} ${unref(form).name}` : _ctx.$t("Identity Preview"))}</h2><div class="mt-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md"${_scopeId}>${ssrInterpolate(unref(form).role)}</div></div><div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800"${_scopeId}><label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconShield), {
              size: "14",
              class: "text-brand"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("System Group Assignment"))}</span></label>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "role",
              modelValue: selectedRole.value,
              "onUpdate:modelValue": ($event) => selectedRole.value = $event,
              options: roleOptions.value,
              label: _ctx.$t("Role Selection"),
              placeholder: "—",
              displayKey: "name",
              isStatic: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.role
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (props.isEditing && props.data) {
              _push2(`<div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 space-y-2 font-medium"${_scopeId}><div class="flex justify-between"${_scopeId}><span${_scopeId}>Record ID</span><span class="text-slate-700 dark:text-slate-300 font-mono"${_scopeId}>${ssrInterpolate(props.data?.id)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Last Sync</span><span class="text-slate-700 dark:text-slate-300"${_scopeId}>${ssrInterpolate(props.data?.last_activity || "—")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="lg:col-span-8 space-y-4"${_scopeId}><div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"${_scopeId}><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconUser), {
              size: "16",
              class: "text-brand"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("General Data"))}</span></h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              value: _ctx.$t("Last Name"),
              for: "last_name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "last_name",
              modelValue: unref(form).last_name,
              "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
              class: "block w-full mt-1.5",
              type: "text",
              error: unref(form).errors.last_name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.last_name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              value: _ctx.$t("First Name"),
              required: true,
              for: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              class: "block w-full mt-1.5",
              type: "text",
              error: unref(form).errors.name,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              value: _ctx.$t("Middle Name"),
              for: "middle_name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "middle_name",
              modelValue: unref(form).middle_name,
              "onUpdate:modelValue": ($event) => unref(form).middle_name = $event,
              class: "block w-full mt-1.5",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.middle_name
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              value: _ctx.$t("Date of Birth"),
              for: "birthday"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              id: "birthday",
              modelValue: unref(form).birthday,
              "onUpdate:modelValue": ($event) => unref(form).birthday = $event,
              type: "date",
              class: "block w-full mt-1.5",
              error: unref(form).errors.birthday
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.birthday
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              value: _ctx.$t("Gender"),
              for: "gender"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "gender",
              modelValue: selectedGender.value,
              "onUpdate:modelValue": ($event) => selectedGender.value = $event,
              options: genderOptions.value,
              label: _ctx.$t("Gender"),
              placeholder: "—",
              error: unref(form).errors.gender,
              displayKey: "name",
              isStatic: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.gender
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"${_scopeId}><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconMail), {
              size: "16",
              class: "text-brand"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("Communication Hub"))}</span></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconMail), {
              size: "14",
              class: "text-slate-400"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("Email Address"))} <span class="text-rose-500"${_scopeId}>*</span></span></label><input type="email"${ssrRenderAttr("value", unref(form).email)} class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2" required${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<div class="text-rose-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconPhone), {
              size: "14",
              class: "text-slate-400"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("Phone Connection"))}</span></label><input${ssrRenderAttrs((_temp0 = mergeProps({
              type: "text",
              value: unref(form).phone,
              placeholder: "+380",
              class: "w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2"
            }, ssrGetDirectiveProps(_ctx, _directive_mask, "+380 (##) ###-##-##")), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(form).phone))))}${_scopeId}>`);
            if (unref(form).errors.phone) {
              _push2(`<div class="text-rose-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"${_scopeId}><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 pb-2 flex items-center space-x-1.5"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconLock), {
              size: "16",
              class: "text-brand"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("Security Credentials"))}</span></h3>`);
            if (props.isEditing) {
              _push2(`<p class="text-xs text-slate-400 dark:text-slate-500 mb-5 font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t(
                "Leave empty if you don't want to change the password"
              ))}</p>`);
            } else {
              _push2(`<div class="mb-5 border-b border-slate-50 dark:border-slate-800/50 pb-2"${_scopeId}></div>`);
            }
            _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"${_scopeId}>${ssrInterpolate(_ctx.$t("Password"))} `);
            if (!props.isEditing) {
              _push2(`<span class="text-rose-500"${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><div class="relative"${_scopeId}><input${ssrRenderAttr(
              "type",
              showPassword.value ? "text" : "password"
            )}${ssrRenderDynamicModel(
              showPassword.value ? "text" : "password",
              unref(form).password,
              null
            )}${ssrIncludeBooleanAttr(!props.isEditing) ? " required" : ""} class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"${_scopeId}><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"${_scopeId}>`);
            if (showPassword.value) {
              _push2(ssrRenderComponent(unref(IconEye), { size: "16" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(IconEyeOff), { size: "16" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div>`);
            if (unref(form).errors.password) {
              _push2(`<div class="text-rose-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"${_scopeId}>${ssrInterpolate(_ctx.$t("Confirm Password"))} `);
            if (!props.isEditing) {
              _push2(`<span class="text-rose-500"${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><div class="relative"${_scopeId}><input${ssrRenderAttr(
              "type",
              showPassword.value ? "text" : "password"
            )}${ssrRenderDynamicModel(
              showPassword.value ? "text" : "password",
              unref(form).password_confirmation,
              null
            )}${ssrIncludeBooleanAttr(!props.isEditing) ? " required" : ""} class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"${_scopeId}><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"${_scopeId}>`);
            if (showPassword.value) {
              _push2(ssrRenderComponent(unref(IconEye), { size: "16" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(IconEyeOff), { size: "16" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div>`);
            if (unref(form).errors.password_confirmation) {
              _push2(`<div class="text-rose-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.password_confirmation)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleSave, ["prevent"]),
                class: "grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
              }, [
                createVNode("div", { class: "lg:col-span-4 lg:sticky lg:top-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]" }, [
                  createVNode("div", { class: "flex flex-col items-center text-center" }, [
                    createVNode("div", { class: "relative group w-24 h-24 my-4" }, [
                      createVNode("label", { class: "block w-full h-full rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-700" }, [
                        createVNode(ImageDataView, {
                          src: imagePreview.value,
                          configs: { width: "96px", height: "96px" },
                          class: "object-cover w-full h-full"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all duration-200 rounded-2xl backdrop-blur-[1px]" }, [
                          createVNode(unref(IconCamera), {
                            size: "20",
                            class: "scale-90 group-hover:scale-100 transition-transform"
                          })
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "hidden",
                          accept: "image/*",
                          onChange: handleImageChange
                        }, null, 32)
                      ])
                    ]),
                    createVNode("h2", { class: "text-base font-semibold text-slate-800 dark:text-slate-200" }, toDisplayString(unref(form).name || unref(form).last_name ? `${unref(form).last_name} ${unref(form).name}` : _ctx.$t("Identity Preview")), 1),
                    createVNode("div", { class: "mt-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md" }, toDisplayString(unref(form).role), 1)
                  ]),
                  createVNode("div", { class: "mt-6 pt-6 border-t border-slate-100 dark:border-slate-800" }, [
                    createVNode("label", { class: "text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1" }, [
                      createVNode(unref(IconShield), {
                        size: "14",
                        class: "text-brand"
                      }),
                      createVNode("span", null, toDisplayString(_ctx.$t("System Group Assignment")), 1)
                    ]),
                    createVNode(_sfc_main$2, {
                      id: "role",
                      modelValue: selectedRole.value,
                      "onUpdate:modelValue": ($event) => selectedRole.value = $event,
                      options: roleOptions.value,
                      label: _ctx.$t("Role Selection"),
                      placeholder: "—",
                      displayKey: "name",
                      isStatic: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "label"]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.role
                    }, null, 8, ["message"])
                  ]),
                  props.isEditing && props.data ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 space-y-2 font-medium"
                  }, [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", null, "Record ID"),
                      createVNode("span", { class: "text-slate-700 dark:text-slate-300 font-mono" }, toDisplayString(props.data?.id), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", null, "Last Sync"),
                      createVNode("span", { class: "text-slate-700 dark:text-slate-300" }, toDisplayString(props.data?.last_activity || "—"), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "lg:col-span-8 space-y-4" }, [
                  createVNode("div", { class: "bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]" }, [
                    createVNode("h3", { class: "text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5" }, [
                      createVNode(unref(IconUser), {
                        size: "16",
                        class: "text-brand"
                      }),
                      createVNode("span", null, toDisplayString(_ctx.$t("General Data")), 1)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 items-start" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          value: _ctx.$t("Last Name"),
                          for: "last_name"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$5, {
                          id: "last_name",
                          modelValue: unref(form).last_name,
                          "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                          class: "block w-full mt-1.5",
                          type: "text",
                          error: unref(form).errors.last_name
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                        createVNode(_sfc_main$3, {
                          message: unref(form).errors.last_name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          value: _ctx.$t("First Name"),
                          required: true,
                          for: "name"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$5, {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          class: "block w-full mt-1.5",
                          type: "text",
                          error: unref(form).errors.name,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                        createVNode(_sfc_main$3, {
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          value: _ctx.$t("Middle Name"),
                          for: "middle_name"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$5, {
                          id: "middle_name",
                          modelValue: unref(form).middle_name,
                          "onUpdate:modelValue": ($event) => unref(form).middle_name = $event,
                          class: "block w-full mt-1.5",
                          type: "text"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          message: unref(form).errors.middle_name
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          value: _ctx.$t("Date of Birth"),
                          for: "birthday"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$5, {
                          id: "birthday",
                          modelValue: unref(form).birthday,
                          "onUpdate:modelValue": ($event) => unref(form).birthday = $event,
                          type: "date",
                          class: "block w-full mt-1.5",
                          error: unref(form).errors.birthday
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                        createVNode(_sfc_main$3, {
                          message: unref(form).errors.birthday
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$4, {
                          value: _ctx.$t("Gender"),
                          for: "gender"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$2, {
                          id: "gender",
                          modelValue: selectedGender.value,
                          "onUpdate:modelValue": ($event) => selectedGender.value = $event,
                          options: genderOptions.value,
                          label: _ctx.$t("Gender"),
                          placeholder: "—",
                          error: unref(form).errors.gender,
                          displayKey: "name",
                          isStatic: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "label", "error"]),
                        createVNode(_sfc_main$3, {
                          message: unref(form).errors.gender
                        }, null, 8, ["message"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]" }, [
                    createVNode("h3", { class: "text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5" }, [
                      createVNode(unref(IconMail), {
                        size: "16",
                        class: "text-brand"
                      }),
                      createVNode("span", null, toDisplayString(_ctx.$t("Communication Hub")), 1)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1" }, [
                          createVNode(unref(IconMail), {
                            size: "14",
                            class: "text-slate-400"
                          }),
                          createVNode("span", null, [
                            createTextVNode(toDisplayString(_ctx.$t("Email Address")) + " ", 1),
                            createVNode("span", { class: "text-rose-500" }, "*")
                          ])
                        ]),
                        withDirectives(createVNode("input", {
                          type: "email",
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          class: "w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).email]
                        ]),
                        unref(form).errors.email ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-xs mt-1"
                        }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1" }, [
                          createVNode(unref(IconPhone), {
                            size: "14",
                            class: "text-slate-400"
                          }),
                          createVNode("span", null, toDisplayString(_ctx.$t("Phone Connection")), 1)
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "+380",
                          class: "w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).phone],
                          [_directive_mask, "+380 (##) ###-##-##"]
                        ]),
                        unref(form).errors.phone ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-xs mt-1"
                        }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]" }, [
                    createVNode("h3", { class: "text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 pb-2 flex items-center space-x-1.5" }, [
                      createVNode(unref(IconLock), {
                        size: "16",
                        class: "text-brand"
                      }),
                      createVNode("span", null, toDisplayString(_ctx.$t("Security Credentials")), 1)
                    ]),
                    props.isEditing ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-xs text-slate-400 dark:text-slate-500 mb-5 font-medium"
                    }, toDisplayString(_ctx.$t(
                      "Leave empty if you don't want to change the password"
                    )), 1)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-5 border-b border-slate-50 dark:border-slate-800/50 pb-2"
                    })),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" }, [
                          createTextVNode(toDisplayString(_ctx.$t("Password")) + " ", 1),
                          !props.isEditing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-rose-500"
                          }, "*")) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            type: showPassword.value ? "text" : "password",
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            required: !props.isEditing,
                            class: "w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"
                          }, null, 8, ["type", "onUpdate:modelValue", "required"]), [
                            [vModelDynamic, unref(form).password]
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showPassword.value = !showPassword.value,
                            class: "absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          }, [
                            showPassword.value ? (openBlock(), createBlock(unref(IconEye), {
                              key: 0,
                              size: "16"
                            })) : (openBlock(), createBlock(unref(IconEyeOff), {
                              key: 1,
                              size: "16"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors.password ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-xs mt-1"
                        }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" }, [
                          createTextVNode(toDisplayString(_ctx.$t("Confirm Password")) + " ", 1),
                          !props.isEditing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-rose-500"
                          }, "*")) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            type: showPassword.value ? "text" : "password",
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            required: !props.isEditing,
                            class: "w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"
                          }, null, 8, ["type", "onUpdate:modelValue", "required"]), [
                            [vModelDynamic, unref(form).password_confirmation]
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showPassword.value = !showPassword.value,
                            class: "absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          }, [
                            showPassword.value ? (openBlock(), createBlock(unref(IconEye), {
                              key: 0,
                              size: "16"
                            })) : (openBlock(), createBlock(unref(IconEyeOff), {
                              key: 1,
                              size: "16"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors.password_confirmation ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-rose-500 text-xs mt-1"
                        }, toDisplayString(unref(form).errors.password_confirmation), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
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

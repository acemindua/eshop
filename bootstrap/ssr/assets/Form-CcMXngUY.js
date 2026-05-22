import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { u as useForm } from "../ssr.js";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-Ctjy_gNQ.js";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { IconArrowLeft, IconDeviceFloppy, IconUser, IconCalendar, IconMail, IconPhone, IconLock } from "@tabler/icons-vue";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-BfL4O4kV.js";
import "./Breadcrumbs-BaC6CclY.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./VarDump-DqvrPBoK.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, required: true },
    routePrefix: { type: String, default: () => null }
  },
  setup(__props) {
    const props = __props;
    const user = computed(() => props.data?.user || {});
    props.routePrefix;
    const form = useForm({
      _method: "put",
      // Робимо POST запит з емуляцією PUT для коректної передачі файлів
      name: user.value.name || "",
      last_name: user.value.last_name || "",
      middle_name: user.value.middle_name || "",
      email: user.value.email || "",
      phone: user.value.phone || "",
      birthday: user.value.birthday || "",
      gender: user.value.gender || "",
      role: user.value.role || "auth",
      password: "",
      // Заповнюється тільки за потреби зміни
      password_confirmation: "",
      avatar: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-6 pb-12" }, _attrs))}><div class="flex items-center justify-between bg-gray-50 border rounded-xl p-4 shadow-xs"><div class="flex items-center space-x-3"><button type="button" class="p-2 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl shadow-sm transition-colors">`);
      _push(ssrRenderComponent(unref(IconArrowLeft), { size: "18" }, null, _parent));
      _push(`</button><div><h2 class="text-base font-semibold tracking-tight">${ssrInterpolate(_ctx.$t("Edit User"))}: <span class="text-brand">${ssrInterpolate(user.value.full_name || user.value.name)}</span></h2><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(_ctx.$t(
        "Modify account settings, profile information, and password credentials"
      ))}</p></div></div><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="button" class="inline-flex items-center space-x-2 px-4 py-2 bg-brand text-white rounded-xl shadow-sm hover:bg-brand-dark transition-all disabled:opacity-50 text-sm font-medium">`);
      _push(ssrRenderComponent(unref(IconDeviceFloppy), { size: "18" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(form).processing ? _ctx.$t("Saving...") : _ctx.$t("Save Changes"))}</span></button></div><form class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="md:col-span-1 flex flex-col space-y-6"><div class="bg-white border rounded-xl p-5 shadow-xs flex flex-col items-center text-center"><h3 class="text-sm font-semibold text-slate-700 w-full text-left mb-4">${ssrInterpolate(_ctx.$t("Avatar"))}</h3><div class="relative group mb-4">`);
      _push(ssrRenderComponent(ImageDataView, {
        src: unref(form).avatar ? _ctx.URL.createObjectURL(unref(form).avatar) : user.value.avatar,
        configs: { width: "120px", height: "120px" },
        class: "rounded-full shadow-md object-cover border-2 border-gray-100"
      }, null, _parent));
      _push(`</div><label class="cursor-pointer block text-xs font-medium text-brand hover:text-brand-dark transition-colors bg-brand/5 px-3 py-1.5 rounded-lg border border-brand/10"><span>${ssrInterpolate(_ctx.$t("Change Photo"))}</span><input type="file" class="hidden" accept="image/*"></label><p class="text-[10px] text-slate-400 mt-2"> WEBP, PNG, JPG up to 2MB </p>`);
      if (unref(form).errors.avatar) {
        _push(`<div class="text-red-500 text-xs mt-1">${ssrInterpolate(unref(form).errors.avatar)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white border rounded-xl p-5 shadow-xs space-y-4"><h3 class="text-sm font-semibold text-slate-700">${ssrInterpolate(_ctx.$t("System Group"))}</h3><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Role"))}</label><select class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand"><option value="auth"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "auth") : ssrLooseEqual(unref(form).role, "auth")) ? " selected" : ""}>Auth User</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "admin") : ssrLooseEqual(unref(form).role, "admin")) ? " selected" : ""}>Admin</option><option value="super-user"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "super-user") : ssrLooseEqual(unref(form).role, "super-user")) ? " selected" : ""}>Super User</option></select>`);
      if (unref(form).errors.role) {
        _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.role)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pt-2 border-t text-[11px] text-slate-400 space-y-1"><div><strong>${ssrInterpolate(_ctx.$t("Registered"))}:</strong> ${ssrInterpolate(user.value.created_at)}</div><div><strong>${ssrInterpolate(_ctx.$t("Activity"))}:</strong> ${ssrInterpolate(user.value.last_activity || "—")}</div><div><strong>${ssrInterpolate(_ctx.$t("Status"))}:</strong><span class="${ssrRenderClass(
        user.value.online ? "text-green-500 font-semibold" : "text-slate-400"
      )}">${ssrInterpolate(user.value.online ? "Online" : "Offline")}</span></div></div></div></div><div class="md:col-span-2 flex flex-col space-y-6"><div class="bg-white border rounded-xl p-5 shadow-xs space-y-4"><h3 class="text-sm font-semibold text-slate-700 flex items-center space-x-2 border-b pb-2">`);
      _push(ssrRenderComponent(unref(IconUser), {
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Personal Info"))}</span></h3>`);
      if (user.value.last_name === null && user.value.middle_name === null) {
        _push(`<div class="grid grid-cols-1 gap-4"><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Full Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).name)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand">`);
        if (unref(form).errors.name) {
          _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Last Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).last_name)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand">`);
        if (unref(form).errors.last_name) {
          _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.last_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("First Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).name)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand">`);
        if (unref(form).errors.name) {
          _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Middle Name"))}</label><input type="text"${ssrRenderAttr("value", unref(form).middle_name)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand">`);
        if (unref(form).errors.middle_name) {
          _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.middle_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Birthday"))}</label><div class="relative"><input type="date"${ssrRenderAttr("value", unref(form).birthday)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand pl-9">`);
      _push(ssrRenderComponent(unref(IconCalendar), {
        size: "16",
        class: "absolute left-3 top-2.5 text-slate-400"
      }, null, _parent));
      _push(`</div>`);
      if (unref(form).errors.birthday) {
        _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.birthday)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Gender"))}</label><select class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, null) : ssrLooseEqual(unref(form).gender, null)) ? " selected" : ""}>—</option><option value="male"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "male") : ssrLooseEqual(unref(form).gender, "male")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Male"))}</option><option value="female"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "female") : ssrLooseEqual(unref(form).gender, "female")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Female"))}</option></select>`);
      if (unref(form).errors.gender) {
        _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.gender)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bg-white border rounded-xl p-5 shadow-xs space-y-4"><h3 class="text-sm font-semibold text-slate-700 flex items-center space-x-2 border-b pb-2">`);
      _push(ssrRenderComponent(unref(IconMail), {
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Contact Information"))}</span></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Email"))}</label><div class="relative"><input type="email"${ssrRenderAttr("value", unref(form).email)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand pl-9">`);
      _push(ssrRenderComponent(unref(IconMail), {
        size: "16",
        class: "absolute left-3 top-2.5 text-slate-400"
      }, null, _parent));
      _push(`</div>`);
      if (unref(form).errors.email) {
        _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Phone"))}</label><div class="relative"><input type="text"${ssrRenderAttr("value", unref(form).phone)} placeholder="380..." class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand pl-9">`);
      _push(ssrRenderComponent(unref(IconPhone), {
        size: "16",
        class: "absolute left-3 top-2.5 text-slate-400"
      }, null, _parent));
      _push(`</div>`);
      if (unref(form).errors.phone) {
        _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.phone)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bg-white border rounded-xl p-5 shadow-xs space-y-4"><h3 class="text-sm font-semibold text-slate-700 flex items-center space-x-2 border-b pb-2">`);
      _push(ssrRenderComponent(unref(IconLock), {
        size: "16",
        class: "text-slate-400"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Security"))}</span></h3><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(_ctx.$t(
        "Leave fields blank if you do not want to modify password."
      ))}</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("New Password"))}</label><input type="password"${ssrRenderAttr("value", unref(form).password)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand">`);
      if (unref(form).errors.password) {
        _push(`<div class="text-red-500 text-xs mt-0.5">${ssrInterpolate(unref(form).errors.password)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-semibold text-slate-600 mb-1">${ssrInterpolate(_ctx.$t("Confirm Password"))}</label><input type="password"${ssrRenderAttr("value", unref(form).password_confirmation)} class="w-full text-sm border-gray-200 rounded-lg focus:border-brand focus:ring-1 focus:ring-brand"></div></div></div></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Users/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CommerceAdminLayout-F626wVaz.js";
import _sfc_main$2 from "./CategoryForm-DRMDNMeF.js";
import "./AdminLayout-RqDMSvDq.js";
import "../ssr.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./Breadcrumbs-DKsddhuk.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./VarDump-DqvrPBoK.js";
import "./useTranslatableForm-D1vpFNTm.js";
import "./useLocales-sgag9Abd.js";
import "@headlessui/vue";
import "./DataForm-BUKIS5db.js";
import "./CheckBoxSwitcher-DfwzQzd4.js";
import "./ComboboxSelect-Wa-V4Q9H.js";
import "./InputError-Cp3nFeNd.js";
import "./TextInput-D87biKav.js";
import "./SEOForm-C8A91PPK.js";
import "./LanguagesTabs-Sf2huWnr.js";
import "./TranslationSEOContent-CFedi3s4.js";
import "./TextareaInput-DKTcDXJH.js";
import "./GeneralForm-yINx4z3W.js";
import "./TranslationContent-DjILhUjB.js";
import "./TextEditor-u-xvDZoq.js";
import "ckeditor5";
import "@ckeditor/ckeditor5-vue";
import "./StickyActions-DFSqE-gR.js";
import "./ButtonsGroup-sb8icSMB.js";
import "./ButtonTabGroup-DbwGHxsz.js";
import "./MediaForm-BK8PJhWn.js";
import "./ImageUploader-Cp8imsLr.js";
import "axios";
import "sortablejs";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    routePrefix: { type: String, default: () => null },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        data: props.data || {},
        "route-prefix": props.routePrefix,
        "is-editing": props.isEditing,
        errors: props.errors
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Categories/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

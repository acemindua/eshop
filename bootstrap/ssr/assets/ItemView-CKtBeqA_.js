import { computed, resolveComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./IndexLayout-CRgSoFyy.js";
import { _ as _sfc_main$2 } from "./SeoMeta-BKMwl4sv.js";
import "@inertiajs/vue3";
import "./VarDump-0gz6Mom3.js";
import "./Breadcrumbs-Be9A5eey.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "pinia";
import "./useApiResourceService-BibiLDfj.js";
import "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./UserLoginRegisterForm-tpsqiF-p.js";
import "./TextInput-C-4bWHj0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "ItemView",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const item = computed(() => props.data?.item?.data || props.data?.item || {});
    const title = computed(
      () => item.value?.seo?.title || item.value?.title || "Товар"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<section class="w-full"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-5 space-y-2"><div class="bg-white border p-2 rounded-xl h-[500px] flex items-center justify-center overflow-hidden">`);
      if (item.value.images?.length) {
        _push(`<img${ssrRenderAttr("src", item.value.images[0].url)}${ssrRenderAttr("alt", `${item.value.title} — головне фото`)}${ssrRenderAttr("title", item.value.title)} class="max-h-full object-contain">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-wrap rounded-xl gap-2"><!--[-->`);
      ssrRenderList(item.value.images, (img, index) => {
        _push(`<div class="w-24 h-24 border bg-white overflow-hidden flex items-center justify-center rounded-xl cursor-pointer hover:border-blue-500 transition"><img${ssrRenderAttr("src", img.url)}${ssrRenderAttr("alt", `${item.value.title} — фото ${index + 1}`)}${ssrRenderAttr("title", `${item.value.title} — вигляд ${index + 1}`)} class="max-h-full object-cover rounded-xl" loading="lazy"></div>`);
      });
      _push(`<!--]--></div></div><div class="lg:col-span-4 space-y-6"><h1 class="font-bold text-3xl">${ssrInterpolate(title.value)}</h1><p class="text-gray-600">${ssrInterpolate(item.value.description)}</p>`);
      _push(ssrRenderComponent(_component_Link, {
        key: item.value.category.id,
        href: _ctx.route("category.show", { slug: item.value.category.slug }),
        title: `Переглянути товари в категорії ${item.value.category.title}`,
        class: "hover:text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(item.value.category.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(item.value.category.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="lg:col-span-3 lg:sticky lg:top-24"><div class="bg-white border p-6 rounded-xl shadow-sm space-y-4"><div class="text-2xl font-bold">${ssrInterpolate(item.value.price)} грн</div><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"> Додати в кошик </button></div></div></div></section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/ItemView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

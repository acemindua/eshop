import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, ref, computed } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$2 } from "./IndexLayout-CRgSoFyy.js";
import "lodash";
import "./VarDump-0gz6Mom3.js";
import "./Breadcrumbs-Be9A5eey.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "pinia";
import "./useApiResourceService-BibiLDfj.js";
import "axios";
import "./UserLoginRegisterForm-tpsqiF-p.js";
import "./TextInput-C-4bWHj0.js";
const _sfc_main$1 = {
  __name: "ItemCard",
  __ssrInlineRender: true,
  props: {
    data: Object,
    viewMode: {
      type: String,
      default: "grid"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "bg-white border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md group",
          __props.viewMode === "list" ? "flex flex-row h-48 md:h-56" : "flex flex-col"
        ]
      }, _attrs))} data-v-6c5a5686><div class="${ssrRenderClass([
        "relative bg-gray-50 flex items-center justify-center shrink-0",
        __props.viewMode === "list" ? "w-40 md:w-64 h-full border-r" : "w-full aspect-square border-b"
      ])}" data-v-6c5a5686>`);
      if (__props.data.images && __props.data.images.length > 0) {
        _push(`<div class="w-full h-full p-2" data-v-6c5a5686><img${ssrRenderAttr("src", __props.data.images[0].url)}${ssrRenderAttr("alt", __props.data.title)} class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" data-v-6c5a5686></div>`);
      } else {
        _push(`<div class="text-gray-300" data-v-6c5a5686><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6c5a5686><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-6c5a5686></path></svg></div>`);
      }
      _push(`</div><div class="p-4 flex flex-col justify-between flex-1 min-w-0" data-v-6c5a5686><div data-v-6c5a5686>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/${__props.data.slug}`,
        class: "text-sm md:text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.data.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.data.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.viewMode === "list" && __props.data.description) {
        _push(`<p class="mt-2 text-sm text-gray-500 line-clamp-3 hidden md:block" data-v-6c5a5686>${ssrInterpolate(__props.data.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([
        "flex items-center justify-between",
        __props.viewMode === "list" ? "mt-4" : "mt-auto pt-4"
      ])}" data-v-6c5a5686><div class="flex flex-col" data-v-6c5a5686><span class="text-lg font-bold text-gray-900 leading-none" data-v-6c5a5686>${ssrInterpolate(__props.data.price)} <small class="text-xs font-normal" data-v-6c5a5686>₴</small></span>`);
      if (__props.data.old_price && __props.data.old_price > 0) {
        _push(`<span class="text-xs text-red-500 line-through" data-v-6c5a5686>${ssrInterpolate(__props.data.old_price)} ₴ </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="bg-gray-800 text-white p-2 rounded-lg hover:bg-black transition-colors" title="Додати у кошик" data-v-6c5a5686><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6c5a5686><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" data-v-6c5a5686></path></svg></button></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/UI/Commerce/ItemCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ItemCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6c5a5686"]]);
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$2 }, {
  __name: "CategoryShow",
  __ssrInlineRender: true,
  props: {
    data: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const viewMode = ref("grid");
    const form = ref({
      min_price: props.filters?.min_price || null,
      max_price: props.filters?.max_price || null,
      manufacturers: props.filters?.manufacturers || [],
      sort: props.filters?.sort || "newest"
    });
    const category = computed(() => props.data?.category?.data || {});
    const displayTitle = computed(() => category.value.title || "Каталог");
    const items = computed(() => props.data?.items?.data || []);
    const availableManufacturers = computed(
      () => props.data?.available_manufacturers || []
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4 p-4" }, _attrs))} data-v-d4f6fab1><h1 class="text-xl text-gray-800 font-semibold" data-v-d4f6fab1>${ssrInterpolate(displayTitle.value)}</h1><div class="flex flex-col md:flex-row gap-6" data-v-d4f6fab1><aside class="w-full md:w-64 space-y-6 bg-white p-4 border rounded-lg shadow-sm h-fit" data-v-d4f6fab1><div data-v-d4f6fab1><h3 class="font-bold border-b pb-2 mb-4 text-gray-700" data-v-d4f6fab1> Фільтри </h3><div class="mb-6" data-v-d4f6fab1><label class="text-sm font-medium text-gray-600" data-v-d4f6fab1>Ціна</label><div class="flex items-center gap-2 mt-2" data-v-d4f6fab1><input${ssrRenderAttr("value", form.value.min_price)} type="number" placeholder="Від" class="w-1/2 border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 outline-none" data-v-d4f6fab1><input${ssrRenderAttr("value", form.value.max_price)} type="number" placeholder="До" class="w-1/2 border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 outline-none" data-v-d4f6fab1></div></div>`);
      if (availableManufacturers.value.length) {
        _push(`<div class="mb-6" data-v-d4f6fab1><label class="text-sm font-medium text-gray-600 block mb-2" data-v-d4f6fab1> Виробник </label><div class="max-h-48 overflow-y-auto space-y-1 pr-2 custom-scrollbar" data-v-d4f6fab1><!--[-->`);
        ssrRenderList(availableManufacturers.value, (man) => {
          _push(`<div class="flex items-center" data-v-d4f6fab1><input type="checkbox"${ssrRenderAttr("id", "man-" + man.id)}${ssrRenderAttr("value", man.id)}${ssrIncludeBooleanAttr(Array.isArray(form.value.manufacturers) ? ssrLooseContain(form.value.manufacturers, man.id) : form.value.manufacturers) ? " checked" : ""} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" data-v-d4f6fab1><label${ssrRenderAttr("for", "man-" + man.id)} class="ml-2 text-sm text-gray-600 cursor-pointer select-none" data-v-d4f6fab1>${ssrInterpolate(man.title)}</label></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-col gap-2" data-v-d4f6fab1><button class="bg-gray-800 text-white py-2 rounded text-sm hover:bg-black transition shadow-sm" data-v-d4f6fab1> Застосувати </button><button class="text-gray-500 text-xs underline hover:text-gray-800 transition" data-v-d4f6fab1> Скинути все </button></div></aside><div class="flex-1" data-v-d4f6fab1><div class="flex flex-wrap items-center justify-between mb-6 bg-white p-3 border rounded-lg shadow-sm gap-4" data-v-d4f6fab1><div class="flex items-center gap-4" data-v-d4f6fab1><div class="flex items-center gap-2" data-v-d4f6fab1><span class="text-xs font-bold text-gray-400 uppercase tracking-wider" data-v-d4f6fab1>Сортувати:</span><select class="border-none bg-transparent text-sm text-gray-700 focus:ring-0 cursor-pointer font-medium" data-v-d4f6fab1><option value="newest" data-v-d4f6fab1${ssrIncludeBooleanAttr(Array.isArray(form.value.sort) ? ssrLooseContain(form.value.sort, "newest") : ssrLooseEqual(form.value.sort, "newest")) ? " selected" : ""}>Новинки</option><option value="price_asc" data-v-d4f6fab1${ssrIncludeBooleanAttr(Array.isArray(form.value.sort) ? ssrLooseContain(form.value.sort, "price_asc") : ssrLooseEqual(form.value.sort, "price_asc")) ? " selected" : ""}>Найдешевші</option><option value="price_desc" data-v-d4f6fab1${ssrIncludeBooleanAttr(Array.isArray(form.value.sort) ? ssrLooseContain(form.value.sort, "price_desc") : ssrLooseEqual(form.value.sort, "price_desc")) ? " selected" : ""}>Найдорожчі</option></select></div></div><div class="flex items-center border rounded-md overflow-hidden bg-gray-50" data-v-d4f6fab1><button class="${ssrRenderClass([
        "p-2 transition-colors",
        viewMode.value === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"
      ])}" title="Сітка" data-v-d4f6fab1><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d4f6fab1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-d4f6fab1></path></svg></button><button class="${ssrRenderClass([
        "p-2 transition-colors",
        viewMode.value === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"
      ])}" title="Список" data-v-d4f6fab1><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d4f6fab1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-d4f6fab1></path></svg></button></div></div>`);
      if (items.value.length) {
        _push(`<div class="${ssrRenderClass([
          "grid gap-4 transition-all duration-300",
          viewMode.value === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        ])}" data-v-d4f6fab1><!--[-->`);
        ssrRenderList(items.value, (item) => {
          _push(ssrRenderComponent(ItemCard, {
            key: item.id,
            data: item,
            "view-mode": viewMode.value
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border rounded-lg border-dashed" data-v-d4f6fab1><svg class="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d4f6fab1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-d4f6fab1></path></svg><p data-v-d4f6fab1>Товарів не знайдено за обраними параметрами</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/CategoryShow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryShow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4f6fab1"]]);
export {
  CategoryShow as default
};

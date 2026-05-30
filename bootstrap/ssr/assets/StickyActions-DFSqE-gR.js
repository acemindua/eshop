import { ref, onMounted, onUnmounted, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { IconArrowLeft } from "@tabler/icons-vue";
import "../ssr.js";
const _sfc_main = {
  __name: "StickyActions",
  __ssrInlineRender: true,
  props: {
    title: { type: String },
    description: { type: String },
    buttons: { type: Array, required: true },
    // Дозволяємо передавати селектор контейнера, якщо він інший
    scrollSelector: { type: String, default: ".flex-grow.overflow-y-auto" },
    routePrefix: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const isScrolled = ref(false);
    const scrollAnchor = ref(null);
    let observer = null;
    onMounted(() => {
      const scrollContainer = document.querySelector(props.scrollSelector);
      observer = new IntersectionObserver(
        ([entry]) => {
          isScrolled.value = !entry.isIntersecting;
        },
        {
          root: scrollContainer,
          rootMargin: "0px",
          threshold: 0
        }
      );
      if (scrollAnchor.value) {
        observer.observe(scrollAnchor.value);
      }
    });
    onUnmounted(() => {
      if (observer) observer.disconnect();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex items-center justify-between border bg-gray-50 p-4 rounded-xl relative"><div class="flex items-center space-x-3"><button type="button" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-sm transition-all">`);
      _push(ssrRenderComponent(unref(IconArrowLeft), {
        size: "18",
        class: "text-brand"
      }, null, _parent));
      _push(`</button><div class="flex flex-col"><h1 class="text-base font-semibold tracking-tight dark:text-slate-200">${ssrInterpolate(props.title)}</h1><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(props.description)}</p></div></div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: __props.buttons }, null, _parent));
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (isScrolled.value) {
        _push(`<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg bg-white p-2 rounded-xl border">`);
        _push(ssrRenderComponent(ButtonsGroup, { buttons: __props.buttons }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/StickyActions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};

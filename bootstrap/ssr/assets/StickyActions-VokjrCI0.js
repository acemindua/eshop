import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { ref, onMounted, onUnmounted, useSSRContext } from "vue";
import { B as ButtonsGroup } from "./ButtonsGroup-CwkMyX54.js";
const _sfc_main = {
  __name: "StickyActions",
  __ssrInlineRender: true,
  props: {
    buttons: { type: Array, required: true },
    // Дозволяємо передавати селектор контейнера, якщо він інший
    scrollSelector: { type: String, default: ".flex-grow.overflow-y-auto" }
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
      _push(`<!--[--><div class="flex justify-end">`);
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

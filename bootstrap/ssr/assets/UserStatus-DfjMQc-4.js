import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "UserStatus",
  __ssrInlineRender: true,
  props: {
    // Об'єкт користувача з даними з БД
    user: {
      type: Object,
      required: true
      // Очікуємо: { last_activity_human: '5 хвилин тому', is_online: true/false }
    },
    // Розмір компонента: 'sm' або 'md'
    size: {
      type: String,
      default: "sm",
      validator: (value) => ["sm", "md"].includes(value)
    },
    description: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const lastActivity = computed(() => props.user.last_activity);
    const isOnline = computed(() => props.user.is_online);
    const activityStatus = computed(() => {
      if (isOnline.value) {
        return "online";
      }
      if (lastActivity.value) {
        return "offline";
      }
      return "never";
    });
    const statusColor = computed(() => {
      switch (activityStatus.value) {
        case "online":
          return "bg-green-500";
        case "offline":
          return "bg-yellow-500";
        case "never":
        default:
          return "bg-gray-400";
      }
    });
    const statusTextColor = computed(() => {
      switch (activityStatus.value) {
        case "online":
          return "text-green-600 font-medium";
        case "offline":
          return "text-yellow-600";
        case "never":
        default:
          return "text-gray-500 italic";
      }
    });
    const statusText = computed(() => {
      switch (activityStatus.value) {
        case "online":
          return "Онлайн";
        case "offline":
          return `Останній візит: ${lastActivity.value}`;
        case "never":
        default:
          return "Не заходив";
      }
    });
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm"
    };
    const statusRing = computed(() => {
      return activityStatus.value === "online" ? "ring-2 ring-green-200" : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center space-x-1", sizeClasses[__props.size]]
      }, _attrs))}><div class="${ssrRenderClass(["w-2 h-2 rounded-full", statusColor.value, statusRing.value])}"></div>`);
      if (__props.description) {
        _push(`<span class="${ssrRenderClass(statusTextColor.value)}">${ssrInterpolate(statusText.value)}</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserStatus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};

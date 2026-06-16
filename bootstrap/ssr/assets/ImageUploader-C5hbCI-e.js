import { ref, onMounted, nextTick, onUnmounted, mergeProps, useSSRContext } from "vue";
import axios from "axios";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import Sortable from "sortablejs";
function useMediaService(meta) {
  const uploadingMedia = ref(false);
  const uploadErrors = ref({});
  const uploadingProgress = ref(0);
  const handleRequest = async (fn, fallback = "Сталася помилка.") => {
    uploadingMedia.value = true;
    uploadErrors.value = {};
    try {
      const response = await fn();
      return response.data;
    } catch (e) {
      const res = e.response;
      if (res?.status === 422 && res.data?.errors) {
        uploadErrors.value = res.data.errors;
      } else {
        uploadErrors.value = {
          general: [res?.data?.message || e.message || fallback]
        };
      }
      throw e;
    } finally {
      uploadingMedia.value = false;
    }
  };
  const getMedia = async (url) => {
    return handleRequest(
      () => axios.get(url, { params: meta }),
      "Не вдалося завантажити медіа."
    );
  };
  const uploadMedia = async (url, files, onFileProgress = () => {
  }) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files[]", f));
    Object.keys(meta).forEach((key) => formData.append(key, meta[key]));
    return handleRequest(
      () => axios.post(url, formData, {
        onUploadProgress: (e) => {
          if (e.lengthComputable) {
            uploadingProgress.value = Math.round(
              e.loaded * 100 / e.total
            );
            onFileProgress(uploadingProgress.value);
          }
        }
      })
    );
  };
  const sortMedia = async (url, order) => {
    return handleRequest(
      () => axios.post(url, { ...meta, order }),
      "Не вдалося змінити порядок."
    );
  };
  const deleteMedia = async (url) => {
    return handleRequest(
      () => axios.delete(url),
      "Не вдалося видалити елемент."
    );
  };
  return {
    uploadingMedia,
    uploadErrors,
    uploadingProgress,
    getMedia,
    uploadMedia,
    sortMedia,
    deleteMedia
  };
}
const _sfc_main$1 = {
  __name: "ImageList",
  __ssrInlineRender: true,
  props: {
    images: { type: Array, required: true }
  },
  emits: ["reorder", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sortableContainer = ref(null);
    let sortableInstance = null;
    onMounted(() => {
      if (!sortableContainer.value) return;
      sortableInstance = new Sortable(sortableContainer.value, {
        animation: 250,
        ghostClass: "opacity-10",
        filter: ".cursor-wait",
        onEnd: async (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex === newIndex) return;
          sortableInstance.option("disabled", true);
          const updatedImages = [...props.images];
          const [movedItem] = updatedImages.splice(oldIndex, 1);
          updatedImages.splice(newIndex, 0, movedItem);
          emit("reorder", updatedImages);
          await nextTick();
          sortableInstance.option("disabled", false);
        }
      });
    });
    onUnmounted(() => {
      sortableInstance?.destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "sortableContainer",
        ref: sortableContainer,
        class: "flex flex-wrap gap-4"
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.images, (image, index) => {
        _push(`<div${ssrRenderAttr("data-id", image.id)} class="${ssrRenderClass([[
          index === 0 ? "w-64 h-64 ring-2 ring-blue-500" : "w-40 h-40 hover:border-blue-300",
          image.isUploading ? "cursor-wait" : "cursor-move"
        ], "group relative border rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-sm"])}"><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", image.name || "Product image")} class="${ssrRenderClass([{
          "grayscale blur-[2px] opacity-50": image.isUploading
        }, "w-full h-full object-cover select-none transition-all duration-500"])}">`);
        if (image.isUploading) {
          _push(`<div class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"><div class="relative w-16 h-16"><svg class="w-full h-full transform -rotate-90"><circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="transparent" class="text-white/30"></circle><circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="transparent" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 175.93)}${ssrRenderAttr(
            "stroke-dashoffset",
            175.93 * (1 - image.progress / 100)
          )} class="text-white transition-all duration-300 ease-out"></circle></svg><span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">${ssrInterpolate(image.progress)}% </span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (index === 0 && !image.isUploading) {
          _push(`<div class="absolute top-2 left-2 z-10 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md"> Main </div>`);
        } else {
          _push(`<!---->`);
        }
        if (!image.isUploading) {
          _push(`<button type="button" aria-label="Delete image" class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"> ✕ </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/ImageList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ImageUploader",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean, default: false }
  },
  emits: ["uploaded", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    const isDragActive = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ease-in-out", [
          isDragActive.value ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500",
          props.disabled ? "opacity-50 cursor-not-allowed grayscale" : ""
        ]],
        role: "button",
        "aria-label": "Upload images"
      }, _attrs))}><div class="flex flex-col items-center justify-center space-y-2 pointer-events-none"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg><p class="text-sm font-medium">${ssrInterpolate(_ctx.$t("Click to upload"))} <span class="text-gray-400 font-normal">${ssrInterpolate(_ctx.$t("or drag and drop"))}</span></p><p class="text-[10px] text-gray-400 uppercase tracking-wide"> PNG, JPG, WEBP (MAX. 2MB PER FILE) </p></div><input type="file" multiple accept="image/*" class="hidden"></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/ImageUploader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a,
  useMediaService as u
};

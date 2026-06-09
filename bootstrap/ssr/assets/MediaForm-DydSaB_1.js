import { ref, onMounted, onUnmounted, mergeProps, useSSRContext, computed, unref, readonly } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import axios from "axios";
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
const _sfc_main$2 = {
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
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex === newIndex) return;
          const updatedImages = [...props.images];
          const [movedItem] = updatedImages.splice(oldIndex, 1);
          updatedImages.splice(newIndex, 0, movedItem);
          const totalChildren = sortableContainer.value.children;
          if (oldIndex < newIndex) {
            sortableContainer.value.insertBefore(
              totalChildren[newIndex],
              totalChildren[oldIndex]
            );
          } else {
            sortableContainer.value.insertBefore(
              totalChildren[newIndex],
              totalChildren[oldIndex + 1]
            );
          }
          emit("reorder", updatedImages);
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
        ], "group relative border rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-sm"])}"><img${ssrRenderAttr("src", image.url)} class="${ssrRenderClass([{
          "grayscale blur-[2px] opacity-50": image.isUploading
        }, "w-full h-full object-cover select-none transition-all duration-500"])}">`);
        if (image.isUploading) {
          _push(`<div class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"><div class="relative w-16 h-16"><svg class="w-full h-full transform -rotate-90"><circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="transparent" class="text-white/30"></circle><circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="transparent" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", 2 * Math.PI * 28)}${ssrRenderAttr(
            "stroke-dashoffset",
            2 * Math.PI * 28 * (1 - image.progress / 100)
          )} class="text-white transition-all duration-300 ease-out"></circle></svg><span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">${ssrInterpolate(image.progress)}% </span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (index === 0 && !image.isUploading) {
          _push(`<div class="absolute top-2 left-2 z-10 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded"> Main </div>`);
        } else {
          _push(`<!---->`);
        }
        if (!image.isUploading) {
          _push(`<button type="button" class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"> ✕ </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/ImageList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ImageUploader",
  __ssrInlineRender: true,
  emits: ["uploaded"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const isDragActive = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition", [
          isDragActive.value ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-gray-300 hover:bg-gray-100 text-gray-500"
        ]]
      }, _attrs))}><div class="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none"><p class="mb-2 text-sm"><span class="font-semibold">${ssrInterpolate(_ctx.$t("Click to upload"))}</span> ${ssrInterpolate(_ctx.$t("or drag and drop"))}</p><p class="text-xs text-gray-400"> SVG, PNG, JPG or GIF (MAX. 800x800px) </p></div><input type="file" multiple accept="image/*" class="hidden"></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/ImageUploader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "MediaForm",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: () => null
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    modelType: {
      type: String,
      default: "Item"
    },
    collection: {
      type: String,
      default: "images"
    }
  },
  emits: ["stateChange", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const images = ref([]);
    const modelId = computed(() => Number(props.data?.item?.id) || null);
    const meta = computed(() => ({
      model_type: props.modelType,
      model_id: modelId.value,
      collection: props.collection
    }));
    const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } = useMediaService(meta.value);
    onMounted(async () => {
      const baselineImages = props.data?.item?.sorted_images;
      if (!props.isEditing || !modelId.value) {
        if (baselineImages) {
          images.value = [...baselineImages];
        }
        return;
      }
      try {
        const params = new URLSearchParams({
          model_type: props.modelType,
          model_id: String(modelId.value),
          collection: props.collection
        });
        const response = await getMedia("/api/media", { params });
        images.value = response?.media || baselineImages || [];
      } catch (error) {
        console.error(
          "[MediaForm] API synchronization failed, executing local state hydration:",
          error
        );
        if (baselineImages) {
          images.value = [...baselineImages];
        }
        emit("error", "Failed to pull cloud media assets.");
      }
    });
    const handleUpload = async (files) => {
      const filesArray = files instanceof FileList ? Array.from(files) : files;
      if (!filesArray || filesArray.length === 0) {
        console.warn(
          "[MediaForm] Asset upload rejected: Received void or corrupted target structures."
        );
        return;
      }
      for (const file of filesArray) {
        const objectUrl = URL.createObjectURL(file);
        const tempId = `temp-${Math.random().toString(36).substring(2, 11)}`;
        const tempImage = {
          id: tempId,
          url: objectUrl,
          progress: 0,
          isUploading: true,
          name: file.name
        };
        images.value = [...images.value, tempImage];
        try {
          const result = await uploadMedia(
            "/api/media",
            [file],
            (percent) => {
              const target = images.value.find(
                (img) => img.id === tempId
              );
              if (target) {
                target.progress = percent;
              }
            }
          );
          if (result?.media && result.media.length > 0) {
            images.value = images.value.map(
              (img) => img.id === tempId ? { ...result.media[0], isUploading: false } : img
            );
            emit("stateChange", {
              action: "upload",
              data: result.media[0]
            });
          }
        } catch (error) {
          console.error(
            `[MediaForm] Hard failure processing attachment binary: ${file.name}`,
            error
          );
          images.value = images.value.filter((img) => img.id !== tempId);
        } finally {
          URL.revokeObjectURL(objectUrl);
        }
      }
    };
    const handleReorder = async (newImages) => {
      if (!Array.isArray(newImages)) return;
      images.value = newImages;
      const orderedIds = images.value.filter((img) => img?.id && !String(img.id).startsWith("temp-")).map((img) => Number(img.id));
      if (orderedIds.length > 1) {
        try {
          await sortMedia("/api/media/sort", orderedIds);
          emit("stateChange", { action: "reorder", data: orderedIds });
        } catch (error) {
          console.error(
            "[MediaForm] Synchronous sorting transaction failed downstream:",
            error
          );
        }
      }
    };
    const handleDelete = async (id) => {
      const isTransient = String(id).startsWith("temp-");
      if (isTransient) {
        images.value = images.value.filter((img) => img.id !== id);
        return;
      }
      try {
        await deleteMedia(`/api/media/${id}`);
        images.value = images.value.filter((img) => img.id !== id);
        emit("stateChange", { action: "delete", data: id });
      } catch (error) {
        console.error(
          `[MediaForm] Deletion contract rejected by upstream service for entity identifier: ${id}`,
          error
        );
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "media-orchestrator-layout space-y-6" }, _attrs))}>`);
      if (unref(uploadErrors) && Object.keys(unref(uploadErrors)).length > 0) {
        _push(`<div class="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg shadow-sm"><h5 class="text-xs font-bold uppercase tracking-wider text-red-800 mb-2"> Media Upload Failures </h5><ul class="list-disc pl-5 space-y-1"><!--[-->`);
        ssrRenderList(unref(uploadErrors), (errors, key) => {
          _push(`<li class="text-xs font-mono text-red-600">${ssrInterpolate(errors[0])}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        images: readonly(images.value),
        "is-editing": props.isEditing,
        onReorder: handleReorder,
        onDelete: handleDelete
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        errors: unref(uploadErrors),
        disabled: !modelId.value && props.isEditing,
        onUploaded: handleUpload
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Items/Partials/MediaForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

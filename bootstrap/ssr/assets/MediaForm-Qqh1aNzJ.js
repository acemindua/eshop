import { ref, onMounted, onUnmounted, mergeProps, useSSRContext, unref } from "vue";
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
        // Забороняємо тягати файли, що ще вантажаться
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex === newIndex) return;
          const updatedImages = [...props.images];
          const [movedItem] = updatedImages.splice(oldIndex, 1);
          updatedImages.splice(newIndex, 0, movedItem);
          const element = sortableContainer.value.children[newIndex];
          const referenceElement = sortableContainer.value.children[oldIndex > newIndex ? oldIndex + 1 : oldIndex];
          sortableContainer.value.insertBefore(element, referenceElement);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition hover:bg-gray-100" }, _attrs))}><div class="flex flex-col items-center justify-center pt-5 pb-6"><p class="mb-2 text-sm text-gray-500"><span class="font-semibold">${ssrInterpolate(_ctx.$t("Click to upload"))}</span> ${ssrInterpolate(_ctx.$t("or drag and drop"))}</p><p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x800px)</p></div><input type="file" multiple accept="image/*" class="hidden"></div>`);
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
    modelId: Number,
    modelType: String,
    collection: String
  },
  setup(__props) {
    const props = __props;
    const images = ref([]);
    const meta = {
      model_id: props.modelId,
      model_type: props.modelType || "Product",
      collection: props.collection || "images"
    };
    const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } = useMediaService(meta);
    onMounted(async () => {
      if (!props.modelId) return;
      try {
        const data = await getMedia("/api/media");
        images.value = data?.media || [];
      } catch (e) {
        console.error("Failed to fetch media", e);
      }
    });
    const handleUpload = async (files) => {
      const filesArray = Array.from(files);
      for (const file of filesArray) {
        const objectUrl = URL.createObjectURL(file);
        const tempId = `temp-${Math.random().toString(36).substring(2)}`;
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
              if (target) target.progress = percent;
            }
          );
          if (result?.media?.length > 0) {
            const index = images.value.findIndex(
              (img) => img.id === tempId
            );
            if (index !== -1) {
              images.value.splice(index, 1, {
                ...result.media[0],
                isUploading: false
              });
            }
          }
          URL.revokeObjectURL(objectUrl);
        } catch (e) {
          images.value = images.value.filter((img) => img.id !== tempId);
          URL.revokeObjectURL(objectUrl);
        }
      }
    };
    const handleReorder = async (newImages) => {
      images.value = newImages;
      const order = {};
      newImages.forEach((img, i) => {
        if (typeof img.id === "number" || !isNaN(img.id)) {
          order[img.id] = i + 1;
        }
      });
      if (Object.keys(order).length > 0) {
        await sortMedia("/api/media/sort", order);
      }
    };
    const handleDelete = async (id) => {
      if (String(id).startsWith("temp-")) {
        images.value = images.value.filter((img) => img.id !== id);
        return;
      }
      try {
        await deleteMedia(`/api/media/${id}`);
        images.value = images.value.filter((img) => img.id !== id);
      } catch (e) {
        console.error("Delete failed", e);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (unref(uploadErrors) && Object.keys(unref(uploadErrors)).length > 0) {
        _push(`<div class="p-3 bg-red-50 border border-red-200 rounded-lg"><!--[-->`);
        ssrRenderList(unref(uploadErrors), (errors, field) => {
          _push(`<p class="text-red-600 text-xs">${ssrInterpolate(errors[0])}</p>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        images: images.value,
        onReorder: handleReorder,
        onDelete: handleDelete
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { onUploaded: handleUpload }, null, _parent));
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

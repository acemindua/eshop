import { shallowRef, computed, onMounted, mergeProps, unref, readonly, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useMediaService, _ as _sfc_main$1, a as _sfc_main$2 } from "./ImageUploader-C5hbCI-e.js";
import "axios";
import "sortablejs";
const _sfc_main = {
  __name: "MediaForm",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => null },
    isEditing: { type: Boolean, default: false },
    modelType: { type: String, default: "Item" },
    collection: { type: String, default: "images" }
  },
  emits: ["stateChange", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const images = shallowRef([]);
    const modelId = computed(() => Number(props.data?.item?.id) || null);
    const meta = computed(() => ({
      model_type: props.modelType,
      model_id: modelId.value,
      collection: props.collection
    }));
    const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } = useMediaService(meta.value);
    onMounted(async () => {
      const baselineImages = props.data?.item?.sorted_images || [];
      if (!props.isEditing || !modelId.value) {
        images.value = [...baselineImages];
        return;
      }
      try {
        const response = await getMedia("/api/media", { params: meta.value });
        images.value = response?.media ?? baselineImages;
      } catch (error) {
        console.error("[MediaForm] Sync failed:", error);
        images.value = [...baselineImages];
        emit("error", "Failed to sync media from server.");
      }
    });
    const handleUpload = async (files) => {
      const filesArray = Array.isArray(files) ? files : Array.from(files);
      for (const file of filesArray) {
        const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const tempImage = {
          id: tempId,
          url: URL.createObjectURL(file),
          progress: 0,
          isUploading: true
        };
        images.value = [...images.value, tempImage];
        try {
          const result = await uploadMedia(
            "/api/media",
            [file],
            (percent) => {
              images.value = images.value.map(
                (img) => img.id === tempId ? { ...img, progress: percent } : img
              );
            }
          );
          console.log("Отримано відповідь від сервера:", result);
          const mediaItem = result?.media?.[0] || result?.data?.[0] || result;
          if (mediaItem && mediaItem.id) {
            images.value = images.value.map(
              (img) => img.id === tempId ? { ...mediaItem, isUploading: false, progress: 100 } : img
            );
            emit("stateChange", { action: "upload", data: mediaItem });
          } else {
            throw new Error("Invalid server response structure");
          }
        } catch (error) {
          console.error("[MediaForm] Помилка обробки результату:", error);
          images.value = images.value.filter((img) => img.id !== tempId);
          emit(
            "error",
            "Завантаження завершено, але не вдалося оновити список."
          );
        }
      }
    };
    const handleReorder = async (newImages) => {
      images.value = newImages;
      const orderedIds = newImages.filter((img) => typeof img.id === "number").map((img) => img.id);
      try {
        await sortMedia("/api/media/sort", orderedIds);
        emit("stateChange", { action: "reorder", data: orderedIds });
      } catch (error) {
        emit("error", "Sorting update failed.");
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
        emit("stateChange", { action: "delete", data: id });
      } catch (error) {
        emit("error", "Deletion failed.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "media-orchestrator space-y-6" }, _attrs))}>`);
      if (unref(uploadErrors) && Object.keys(unref(uploadErrors)).length) {
        _push(`<div class="p-4 bg-red-50 border border-red-200 rounded-lg"><ul class="text-xs text-red-600"><!--[-->`);
        ssrRenderList(unref(uploadErrors), (err, key) => {
          _push(`<li>${ssrInterpolate(err[0])}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        images: readonly(images.value),
        "is-editing": props.isEditing,
        onReorder: handleReorder,
        onDelete: handleDelete
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        disabled: !modelId.value && props.isEditing,
        onUploaded: handleUpload,
        onError: (errs) => emit("error", errs)
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

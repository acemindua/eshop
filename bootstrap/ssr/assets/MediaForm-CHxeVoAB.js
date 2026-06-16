import { ref, computed, onMounted, mergeProps, unref, readonly, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useMediaService, _ as _sfc_main$1, a as _sfc_main$2 } from "./ImageUploader-C5hbCI-e.js";
import "axios";
import "sortablejs";
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
      default: "Category"
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
    const modelId = computed(() => Number(props.data?.category?.id) || null);
    const meta = computed(() => ({
      model_type: props.modelType,
      model_id: modelId.value,
      collection: props.collection
    }));
    const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } = useMediaService(meta.value);
    onMounted(async () => {
      const baselineImages = props.data?.category?.sorted_images;
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
            const uploadedFile = result.media[0];
            images.value = images.value.map(
              (img) => img.id === tempId ? { ...uploadedFile, isUploading: false, progress: 100 } : img
            );
            emit("stateChange", { action: "upload", data: uploadedFile });
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
      _push(ssrRenderComponent(_sfc_main$1, {
        images: readonly(images.value),
        "is-editing": props.isEditing,
        onReorder: handleReorder,
        onDelete: handleDelete
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Brands/Partials/MediaForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

<!-- Commerce/Products/Partials/DataProductForm -->
<script setup>
import { onMounted, ref } from "vue";
import { router } from "@inertiajs/vue3";
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import ComboboxSelect from "@/Components/ComboboxSelect.vue";
import ImagePreview from "@/Components/ImagePreview.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { IconPhotoPlus, IconPhotoX } from "@tabler/icons-vue";

const props = defineProps({
    form: { type: Object, required: true },
    data: { type: [Object, Array], required: true },
    errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["uploaded"]);

const preview = ref("");
const fileInput = ref(null);

const imgPreviewConfig = {
    width: 200,
    height: 200,
};

onMounted(() => {
    preview.value = props.data?.item?.images?.[0]?.url || "";
});

const chooseFiles = () => fileInput.value?.click();
const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
        preview.value = URL.createObjectURL(file);
        emit("uploaded", file);
    }
};

const removePreview = () => {
    preview.value = "";
    fileInput.value.value = null;

    router.delete(
        route("admin.manufacturers.image.destroy", props.data.item.id),
        {
            preserveScroll: true,
            onSuccess: () => {},
        }
    );
};
</script>

<template>
    <div
        class="flex flex-col w-full space-y-4 bg-gray-50 border rounded-lg p-4 md:p-8"
    >
        <!-- Image Upload -->
        <div>
            <InputLabel
                for="image"
                :value="$t('Image')"
                class="flex items-center leading-6 font-semibold"
            />
            <div class="flex items-center">
                <div class="relative group">
                    <ImagePreview
                        :preview="preview"
                        :config="imgPreviewConfig"
                    />

                    <input
                        ref="fileInput"
                        type="file"
                        @change="previewImage"
                        hidden
                        accept="image/*"
                    />

                    <div
                        class="absolute hidden group-hover:flex items-center space-x-2 bottom-2 left-2 transition duration-150 ease-in-out"
                    >
                        <button
                            @click="chooseFiles"
                            type="button"
                            class="text-xs bg-blue-100 border border-blue-300 text-blue-500 py-1 px-2 rounded-md flex items-center space-x-1"
                        >
                            <IconPhotoPlus :stroke="2" :size="16" />
                            <span>{{ $t("New") }}</span>
                        </button>
                        <button
                            @click="removePreview"
                            type="button"
                            class="text-xs bg-orange-100 border border-orange-300 text-orange-500 py-1 px-2 rounded-md flex items-center space-x-1"
                        >
                            <IconPhotoX :stroke="2" :size="16" />
                            <span>{{ $t("Clear") }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Order Input -->
        <div>
            <InputLabel
                for="order"
                :value="$t('Order')"
                class="flex items-center leading-6 font-semibold"
            />
            <TextInput
                id="order"
                type="number"
                v-model="form.order"
                class="block w-full pr-4 text-start"
                :class="{ 'border-red-500': errors.order }"
            />
            <InputError class="mt-2" :message="errors.order" />
        </div>

        <!-- Status Toggle -->
        <div>
            <InputLabel
                for="public"
                :value="$t('Status')"
                class="flex items-center leading-6 font-semibold"
            />
            <CheckBoxSwitcher v-model="form.public" />
            <InputError class="mt-2" :message="errors.public" />
        </div>
    </div>
</template>

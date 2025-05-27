<template>
    <div class="p-4 rounded-lg border bg-gray-50">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col space-y-4">
                <div class="flex items-center justify-between">
                    <h1 class="text-lg font-semibold pb-2">
                        #{{ data.id }} – {{ data.attribute.title }} ({{
                            data.attribute_value.title
                        }})
                    </h1>
                    <!-- Status -->
                    <div>
                        <InputError class="mt-2" :message="errors.public" />
                        <div class="flex items-center space-x-2">
                            <CheckBoxSwitcher v-model="booleanPublic" />

                            <InputLabel
                                for="public"
                                :value="$t('Status')"
                                class="flex items-center leading-6 font-semibold"
                            />
                        </div>
                    </div>
                </div>

                <div
                    class="border rounded-lg p-4 flex flex-col space-y-4 bg-white"
                >
                    <!-- Stock Keeping Unit - unique identifier-->
                    <div>
                        <InputLabel
                            for="sku"
                            :value="$t('SKU')"
                            class="flex items-center leading-6 font-semibold"
                        />
                        <TextInput
                            id="sku"
                            type="text"
                            v-model="form.sku"
                            class="block w-full pr-4 text-start"
                            :class="{ 'border-red-500': errors.sku }"
                        />
                        <InputError class="mt-2" :message="errors.sku" />
                    </div>
                    <!-- Price -->
                    <div>
                        <InputLabel
                            for="price"
                            :value="$t('Price')"
                            class="flex items-center leading-6 font-semibold"
                        />
                        <TextInput
                            id="order"
                            type="number"
                            v-model="form.price"
                            class="block w-full pr-4 text-start"
                            :class="{ 'border-red-500': errors.price }"
                        />
                        <InputError class="mt-2" :message="errors.price" />
                    </div>

                    <!-- quantity -->
                    <div>
                        <InputLabel
                            for="quantity"
                            :value="$t('Quantity')"
                            class="flex items-center leading-6 font-semibold"
                        />
                        <TextInput
                            id="quantity"
                            type="number"
                            v-model="form.quantity"
                            class="block w-full pr-4 text-start"
                            :class="{ 'border-red-500': errors.quantity }"
                        />
                        <InputError class="mt-2" :message="errors.quantity" />
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

                    <div>
                        <ActionButton
                            action="delete"
                            @click="confirmDelete(form.id)"
                        >
                            <template #icon>
                                <IconTrashX :stroke="1" :size="18" />
                            </template>
                            <span>{{ $t("Delete") }}</span>
                        </ActionButton>
                        <ActionButton action="save" @click="actionUpdate">
                            <template #icon>
                                <IconDeviceFloppy :stroke="1" :size="18" />
                            </template>
                            <span>{{ $t("Save") }}</span>
                        </ActionButton>
                    </div>
                </div>
            </div>
            <div class="border rounded-lg p-4 col-span-2">
                <div class="w-full flex flex-col space-y-4">
                    <!-- Image List -->
                    <ImageList
                        :images="images || []"
                        @delete="deleteImage"
                        @reorder="handleReorder"
                    />

                    <!-- Image Uploader -->
                    <ImageUploader @uploaded="handleUpload" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from "vue";
import useMediaService from "@/Composables/useMediaService";
import useTranslatableForm from "@/Composables/useTranslatableForm";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import ImageList from "@/Components/Images/ImageList.vue";
import ImageUploader from "@/Components/Images/ImageUploader.vue";
import ActionButton from "@/Components/Themes/Admin/UI/Buttons/Actions/ActionButton.vue";
import { IconDeviceFloppy, IconTrashX } from "@tabler/icons-vue";
import Swal from "sweetalert2";

const props = defineProps({
    data: Object,
    errors: Object,
});

const emit = defineEmits(["edit", "delete"]);

const { form, fillForm } = useTranslatableForm();

// Завантажити початкові дані
onBeforeMount(() => {
    fillForm(props.data);
});

// Two-way binding for boolean field "public"
const booleanPublic = computed({
    get: () => !!form.public,
    set: (val) => (form.public = val),
});

const images = ref([]);

// Media service
const { getMedia, deleteMedia, sortMedia, uploadMedia } = useMediaService({
    model_type: "ProductVariant",
    model_id: props.data.id,
    collection: "images",
});

// Fetch images (optional: if dynamic reload is needed)
const fetchImages = async () => {
    const res = await getMedia(route("media.index"));
    images.value = res?.data?.media || [];
};

// Handle image upload
const handleUpload = async (files) => {
    const url = route("media.store"); // ensure this route exists
    await uploadMedia(url, files);
    await fetchImages();
};

// Handle reordering
const handleReorder = async (order) => {
    const url = route("media.sort");
    await sortMedia(url, order);
    await fetchImages();
};

// Delete image
const deleteImage = async (imageId) => {
    const url = route("media.destroy", imageId);
    console.log(url);
    await deleteMedia(url);
    // Optionally trigger refetch if you aren't syncing `data.images` manually
    await fetchImages();
};

onBeforeMount(() => fetchImages());

/**
 *
 */
const actionUpdate = () => {
    //
    emit("edit", form);
};

/**
 * Confirm before delete
 */
const confirmDelete = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This item will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        emit("delete", id);
    }
};
</script>

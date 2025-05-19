<template>
    <Modal :show="openModal" @close="openModal = false">
        <VariantModalForm
            v-model="form"
            @close="openModal = false"
            @save="saveForm"
            :errors="errorsRequests ?? errors"
            :is-editing="isEditing"
        />
    </Modal>

    <div class="grid grid-cols-1 gap-4 py-2">
        <div v-for="variant in variants" :key="variant.id">
            <VariantCard :data="variant" @refresh="fetchResult" />
        </div>

        <div
            @click.prevent="createItem"
            class="cursor-pointer bg-gray-100 border-2 border-dashed rounded-lg min-h-48 flex items-center justify-center text-gray-400 hover:bg-gray-200"
        >
            <IconCircleDashedPlus :stroke="1" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { IconCircleDashedPlus } from "@tabler/icons-vue";
import useApiResourceService from "@/Composables/useApiResourceService";

import Modal from "@/Components/Modal.vue";
import VariantModalForm from "./VariantModalForm.vue";
import VariantCard from "./Variant/VariantCard.vue";

const props = defineProps({
    dataId: { type: Number, required: true },
    errors: { type: Object, default: () => ({}) },
});

const isEditing = ref(false);
const openModal = ref(false);
const variants = ref([]);

const {
    loading,
    form,
    errorsRequests,
    initForm,
    fetchData,
    updateData,
    storeData,
} = useApiResourceService();

const fetchResult = async () => {
    const url = new URL(route("product-variants.index"));
    url.searchParams.append("product_id", props.dataId);
    const response = await fetchData(url.toString());
    variants.value = response.data || [];
};

const createItem = () => {
    initForm({
        product_id: props.dataId,
        attribute_id: null,
        attribute_value_id: null,
        sku: "",
        order: 1,
        price: 0,
        quantity: 0,
        public: true,
    });
    isEditing.value = false;
    openModal.value = true;
};

const saveForm = async () => {
    const url = isEditing.value
        ? route("product-variants.update", form.id)
        : route("product-variants.store");

    try {
        isEditing.value
            ? await updateData(url, form)
            : await storeData(url, form);

        await fetchResult();
        openModal.value = false;
    } catch (e) {
        console.error("Form saving error", e);
    }
};

onMounted(() => fetchResult());
</script>

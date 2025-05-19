<template>
    <button @click="createVariant" class="btn btn-primary">
        + Add Variant
    </button>

    <section class="flex flex-col gap-2">
        <VariantBlock
            v-if="items && items.length > 0"
            v-for="(item, index) in items"
            :key="item.id"
            :data="item"
            :errors="errors"
            @delete="deleteItems"
        />
    </section>

    <Modal :show="openModal" @close="openModal = false">
        <VariantForm
            v-model="form"
            @close="openModal = false"
            @save="saveForm"
            :errors="errorsRequests ?? errors"
            :is-editing="isEditing"
        />
    </Modal>

    <section v-if="!$page.props.app.env === 'local'">
        <VarDump :data="items" />
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import useTranslatableForm from "@/Composables/useTranslatableForm";
import VarDump from "@/Shared/VarDump.vue";
import VariantBlock from "./VariantBlock.vue";
import VariantForm from "./VariantForm.vue";
import Modal from "@/Components/Modal.vue";

// Пропси
const props = defineProps({
    productId: { type: Number, required: true },
    errors: { type: Object, default: () => ({}) },
});

const items = ref([]);
const isEditing = ref(null);
const openModal = ref(false);

const { errorsRequests, fetchData, storeData, deleteData } =
    useApiResourceService();
const { form, initForm } = useTranslatableForm();

const fetchItems = async () => {
    const url = new URL(route("product-variants.index"));
    url.searchParams.append("product_id", props.productId);
    const response = await fetchData(url.toString());
    items.value = response.data || [];
};

const createVariant = () => {
    isEditing.value = null;
    openModal.value = true;
    initForm({
        product_id: props.productId,
        attribute_id: null,
        attribute_value_id: null,
        sku: "",
        order: 1,
        price: 0,
        quantity: 0,
        public: true,
    });
};

const saveForm = async () => {
    const url = isEditing.value
        ? route("product-variants.update", form.id)
        : route("product-variants.store");

    try {
        if (isEditing.value) {
            await updateData(url, form);
        } else {
            await storeData(url, form);
        }
        await fetchItems();
        openModal.value = false;
    } catch (e) {
        console.error("Form saving error", e);
    }
};

const deleteItems = async (id) => {
    await deleteData(route("product-variants.destroy", id));
    await fetchItems();
};

onMounted(() => fetchItems());
</script>

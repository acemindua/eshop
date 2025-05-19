<template>
    <div class="space-y-4">
        <button @click="createVariant" class="btn btn-primary">
            + Add Variant
        </button>

        <VariantForm
            v-if="showForm"
            :initial-data="editingVariant"
            @saved="handleSaved"
            @cancel="resetForm"
        />

        <VariantCard
            v-for="variant in variants"
            :key="variant.id"
            :variant="variant"
            @edit="editVariant"
            @deleted="fetchVariants"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VariantCard from "./VariantCard.vue";
import VariantForm from "./VariantForm.vue";
import useApiResourceService from "@/Composables/useApiResourceService";

const variants = ref([]);
const showForm = ref(false);
const editingVariant = ref(null);

const { fetchData, storeData, updateData, destroyData } =
    useApiResourceService();

const fetchVariants = async () => {
    const url = route("product-variants.index");
    const response = await fetchData(url);
    variants.value = response.data;
};

const createVariant = () => {
    editingVariant.value = null;
    showForm.value = true;
};

const editVariant = (variant) => {
    editingVariant.value = { ...variant };
    showForm.value = true;
};

const handleSaved = () => {
    resetForm();
    fetchVariants();
};

const resetForm = () => {
    showForm.value = false;
    editingVariant.value = null;
};

onMounted(fetchVariants);
</script>

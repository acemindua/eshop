<script setup>
// Core imports
import { onMounted, ref } from "vue";
import { IconCircleDashedPlus } from "@tabler/icons-vue";

// Composables & Components
import useApiResourceService from "@/Composables/useApiResourceService";
import Modal from "@/Components/Modal.vue";
import VariantModalForm from "./VariantModalForm.vue";

// Props
const props = defineProps({
    dataId: { type: Number, required: true },
    errors: { type: Object, default: () => ({}) },
});

// State
const isEditing = ref(false);
const openModal = ref(false);
const attributes = ref([]);

// API & form service
const {
    loading,
    form,
    errorsRequests,
    initForm,
    fetchData,
    updateData,
    storeData,
} = useApiResourceService();

// Create item and open modal
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

// Load current product variants
const fetchResult = async () => {
    const url = new URL(route("product-variants.index"));
    url.searchParams.append("product_id", props.dataId);
    const response = await fetchData(url.toString());
    attributes.value = response.data || [];
};

// Save handler
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
        await fetchResult();
        openModal.value = false;
    } catch (e) {
        console.error("Form saving error", e);
    }
};

// Lifecycle
onMounted(() => {
    fetchResult();
});
</script>

<template>
    <!-- Preview for debugging -->
    <pre>{{ attributes }}</pre>

    <!-- Modal window -->
    <Modal :show="openModal" @close="openModal = false">
        <VariantModalForm
            v-model="form"
            @close="openModal = false"
            @save="saveForm"
            :errors="errorsRequests ?? errors"
            :is-editing="isEditing"
        />
    </Modal>

    <!-- Grid of variant cards -->
    <div class="grid grid-cols-1 w-full h-full gap-4 py-2">
        <div
            v-for="attr in attributes"
            :key="attr.id"
            class="border p-4 bg-white rounded-lg shadow"
        >
            <table class="w-full border divide-y rounded-lg">
                <tr class="divide-x">
                    <th class="text-end p-2 text-sm">SKU</th>
                    <td class="p-2">{{ attr.sku }}</td>
                </tr>
                <tr class="divide-x">
                    <th class="text-end p-2 text-sm">Price</th>
                    <td class="p-2">{{ attr.price }}</td>
                </tr>
                <tr class="divide-x">
                    <th class="text-end p-2 text-sm">Quantity</th>
                    <td class="p-2">{{ attr.quantity }}</td>
                </tr>
            </table>

            <div>
                <div v-for="value in attr.variant_values" :key="value.id">
                    <pre>
                        {{ value }}
                    </pre>
                </div>
            </div>
        </div>

        <!-- Add new variant trigger -->
        <div
            @click.prevent="createItem"
            class="cursor-pointer bg-gray-100 border-2 border-dashed rounded-lg min-h-48 flex items-center justify-center text-gray-400 hover:bg-gray-200"
        >
            <IconCircleDashedPlus :stroke="1" />
        </div>
    </div>
</template>

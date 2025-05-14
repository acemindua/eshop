<template>
    <div class="flex flex-col space-y-2">
        <!-- Add Button -->
        <div class="flex">
            <ActionButton action="add" @click="createItem">
                <template #icon>
                    <IconCircleDashedPlus :stroke="1" :size="18" />
                </template>
                <span>{{ $t("Add") }}</span>
            </ActionButton>
        </div>
    </div>

    <div class="mb-4 mt-2 bg-white p-4 border rounded-lg">
        <div v-if="items.length && items.length > 0">
            <div v-for="(item, index) in items" :key="item.id">
                <h2 class="text-xs font-semibold uppercase">
                    {{ item.title }}
                </h2>
                <TableVariants
                    :items="item.values"
                    :selected-items="selectedItems"
                    @update:selectedItems="selectedItems = $event"
                    @edit="editItem"
                    @delete="deleteValueItem"
                />
            </div>
        </div>
    </div>

    <!-- Modal Form -->
    <Modal :show="openModal" @close="openModal = false">
        <ModalForm
            v-model="form"
            :errors="errorsRequests ?? errors"
            :is-editing="isEditing"
            :attr="attributes"
            :attr-values="attributeValues"
            @close="openModal = false"
            @save="saveForm"
        />
    </Modal>

    <!-- Debug Info -->
    <div class="text-xs text-slate-400 overflow-hidden p-4 border rounded-lg">
        <pre class="overflow-x-auto">items: {{ items }}</pre>
        <pre class="overflow-x-auto">loading: {{ loading }}</pre>
        <pre class="overflow-x-auto">form: {{ form }}</pre>
        <pre class="overflow-x-auto">errorsRequests: {{ errorsRequests }}</pre>
        <pre class="overflow-x-auto">attributes: {{ attributes }}</pre>
    </div>
</template>

<script setup>
/**
 * Attribute Value Form Wrapper
 * ----------------------------
 * Loads and manages form data for creating/editing product attribute values.
 * Fetches available attributes and dependent attribute values.
 * Displays modal with a dynamic form.
 */

import { ref, onBeforeMount, watch } from "vue";
import { IconCircleDashedPlus } from "@tabler/icons-vue";

import Modal from "@/Components/Modal.vue";
import ModalForm from "./ModalForm.vue";
import ActionButton from "@/Shared/Themes/Components/Buttons/ActionButton.vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import TableVariants from "./TableVariants.vue";

const props = defineProps({
    dataId: { type: Number, required: true },
    errors: { type: Object, default: () => ({}) },
});

// State
const openModal = ref(false);
const isEditing = ref(false);
const attributes = ref([]);
const attributeValues = ref([]);
const items = ref({});
const selectedItems = ref([]);

// Resource form logic
const {
    loading,
    form,
    errorsRequests,
    initForm,
    fetchData,
    updateData,
    storeData,
} = useApiResourceService();

// Load attributes on mount
onBeforeMount(() => {
    loadAttributes();
    fetchResult();
});

const fetchResult = async () => {
    const url = new URL(route("product-variants.index"));
    url.searchParams.append("product_id", props.dataId);
    const response = await fetchData(url.toString());
    items.value = response.data || [];
};

// Fetch all attributes
const loadAttributes = async () => {
    try {
        const url = new URL(route("attributes.index"));
        const response = await fetchData(url.toString());
        attributes.value = response.data || [];
    } catch (e) {
        console.error("Failed to load attributes", e);
    }
};

// Fetch values for selected attribute
const loadAttributeValues = async () => {
    if (!form.attribute_id) return;
    try {
        const url = new URL(route("attribute-values.index"));
        url.searchParams.append("attribute_id", form.attribute_id);
        const response = await fetchData(url.toString());
        attributeValues.value = response.data || [];
    } catch (e) {
        console.error("Failed to load attribute values", e);
    }
};

// React on attribute change
watch(
    () => form.attribute_id,
    (newVal) => {
        attributeValues.value = [];
        form.attribute_value_id = null;
        if (newVal) loadAttributeValues();
    }
);

// Open modal with clean form
const createItem = () => {
    initForm({
        product_id: props.dataId,
        order: 1,
        public: true,
    });
    isEditing.value = false;
    openModal.value = true;
};

// Save action (stub)
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

const editItem = () => {};
const deleteValueItem = () => {};
</script>

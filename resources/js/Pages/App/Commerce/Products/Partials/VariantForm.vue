<template>
    <div
        class="flex flex-col space-y-4 space-x-2 p-4 pb-6 border rounded-lg border-dashed bg-white"
    >
        <!-- Кнопки дій -->
        <div class="flex items-center space-x-1 px-2">
            <ActionButton action="add" @click="createVariantModal">
                <template #icon>
                    <IconCircleDashedPlus :stroke="1" :size="18" />
                </template>
                <span>{{ $t("Add") }}</span>
            </ActionButton>
        </div>

        <section class="flex flex-col space-y-4">
            <VariantCard
                v-if="items && items.length > 0"
                v-for="(item, index) in items"
                :key="item.id"
                :data="item"
                :errors="errors"
                @edit="editItem"
                @delete="deleteValueItem"
            />
        </section>
    </div>

    <!-- -->
    <Modal :show="openModal" @close="openModal = false">
        <StoreEditVariantForm
            v-model="form"
            @close="openModal = false"
            @save="saveForm"
            :errors="errorsRequests ?? errors"
            :is-editing="isEditing"
        />
    </Modal>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Modal from "@/Components/Modal.vue";
import useTranslatableForm from "@/Composables/useTranslatableForm";
import useApiResourceService from "@/Composables/useApiResourceService";
import StoreEditVariantForm from "./Variant/StoreEditVariantForm.vue";
import VariantCard from "./Variant/VariantCard.vue";
import ActionButton from "@/Components/Themes/Admin/UI/Buttons/Actions/ActionButton.vue";
import { IconCircleDashedPlus } from "@tabler/icons-vue";
import Swal from "sweetalert2";

// Пропси
const props = defineProps({
    productId: { type: Number, required: true },
    errors: { type: Object, default: () => ({}) },
});

const items = ref([]);
const isEditing = ref(false);
const openModal = ref(false);

//
const { form, initForm } = useTranslatableForm();

const createVariantModal = () => {
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

const { errorsRequests, fetchData, storeData, updateData, deleteData } =
    useApiResourceService();

const fetchItems = async () => {
    const url = new URL(route("product-variants.index"));
    url.searchParams.append("product_id", props.productId);
    const response = await fetchData(url.toString());
    items.value = response.data || [];
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

//
const editItem = async (form) => {
    const url = route("product-variants.update", form.id);
    form._method = "PUT";
    await updateData(url, form);

    // ✅ Повідомлення про успішне збереження
    Swal.fire({
        icon: "success",
        title: "Успішно збережено!",
        text: "Варіант продукту успішно збережений.",
        timer: 2000,
        showConfirmButton: false,
    });
};
//
const deleteValueItem = async (id) => {
    await deleteData(route("product-variants.destroy", id));
    await fetchItems();
};

onBeforeMount(() => fetchItems());
</script>

<script setup>
import { onBeforeMount, ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import useApiResourceService from "@/Composables/useApiResourceService";

// Компоненти
import DataValueTable from "./DataValueTable.vue";
import ActionButton from "@/Shared/Themes/Components/Buttons/ActionButton.vue";
import Modal from "@/Components/Modal.vue";
import ModalValueForm from "./ModalValueForm.vue";
import { IconCircleDashedPlus, IconTrashX } from "@tabler/icons-vue";

// Пропси
const props = defineProps({
    attributeId: Number,
    errors: Object,
});

// Стани
const open = ref(false);
const isEditing = ref(false);
const selectedItems = ref([]);
const selectedLocale = ref(usePage().props.lang.default);
const items = ref([]);

// API-сервіс
const {
    loading,
    form,
    errorsRequests,
    locales,
    initForm,
    fillForm,
    storeData,
    fetchData,
    updateData,
    deleteData,
} = useApiResourceService(["title"]);

// Завантажити початкові дані
onBeforeMount(() => {
    fetchResult();
});

// Отримати список елементів
const fetchResult = async () => {
    const url = new URL(route("attribute-values.index"));
    url.searchParams.append("attribute_id", props.attributeId);
    const response = await fetchData(url.toString());
    items.value = response.data || [];
};

// Валідація форми
const validateForm = () => {
    let hasError = false;
    errorsRequests.value = {};

    for (const code in locales) {
        if (!form[code].title?.trim()) {
            errorsRequests.value[`${code}.title`] = "Поле є обов'язковим";
            hasError = true;
        }
    }

    return !hasError;
};

// Створити новий запис
const createItem = () => {
    initForm({
        attribute_id: props.attributeId,
        order: 1,
        public: true,
    });
    isEditing.value = false;
    open.value = true;
};

// Редагувати існуючий
const editItem = (item) => {
    initForm({
        _method: "put",
        id: item.id,
        order: item.order,
        public: item.public,
    });
    fillForm(item);
    isEditing.value = true;
    open.value = true;
};

// Зберегти форму (створення або оновлення)
const saveForm = async () => {
    if (!validateForm()) return;

    const url = isEditing.value
        ? route("attribute-values.update", form.id)
        : route("attribute-values.store");

    try {
        if (isEditing.value) {
            await updateData(url, form);
        } else {
            await storeData(url, form);
        }
        await fetchResult();
        open.value = false;
    } catch (e) {
        console.error("Form saving error", e);
    }
};

// Видалити обрані
const deleteSelected = async () => {
    if (!selectedItems.value.length) return;
    if (!confirm("Are you sure you want to delete the selected items?")) return;

    try {
        const url = route("attribute-values.destroy", 0);
        await deleteData(url, selectedItems.value);
        await fetchResult();
        selectedItems.value = [];
    } catch (e) {
        console.error("Error deleting selected items", e);
    }
};

// Видалення однієї позиції
const deleteValueItem = async (item) => {
    if (!confirm("Are you sure you want to delete the selected items?")) return;
    const url = route("attribute-values.destroy", 0);
    await deleteData(url, [item.id]);
    await fetchResult();
};
</script>

<template>
    <div class="w-full flex flex-col">
        <!-- Кнопки дій -->
        <div class="flex items-center space-x-1">
            <ActionButton action="add" @click="createItem">
                <template #icon>
                    <IconCircleDashedPlus :stroke="1" :size="18" />
                </template>
                <span>{{ $t("Add") }}</span>
            </ActionButton>

            <ActionButton action="delete" @click="deleteSelected">
                <template #icon>
                    <IconTrashX :stroke="1" :size="18" />
                </template>
                <span>{{ $t("Delete") }}</span>
            </ActionButton>
        </div>

        <!-- Таблиця значень -->
        <DataValueTable
            :items="items"
            :selected-items="selectedItems"
            @update:selectedItems="selectedItems = $event"
            @edit="editItem"
            @delete="deleteValueItem"
        />

        <!-- Debug -->
        <!-- <pre>{{ form }}</pre> -->
    </div>

    <!-- Модальне вікно -->
    <Modal :show="open" @close="open = false">
        <ModalValueForm
            :code="selectedLocale"
            v-model="form"
            :errors="errorsRequests ?? errors"
            :is-editing="isEditing"
            @close="open = false"
            @save="saveForm"
        />
    </Modal>
</template>

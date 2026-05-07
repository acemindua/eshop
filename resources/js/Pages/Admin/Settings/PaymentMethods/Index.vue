<template>
    <Head :title="$t('Payment Methods')" />

    <div class="flex flex-col space-y-2 w-full">
        <section
            class="md:flex items-center justify-between pt-4 gap-4 space-y-2"
        >
            <InputSearch v-model="searchText" />
            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <section>
            <DataTable
                :items="items"
                :meta="meta"
                :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event"
                @delete="deletePaymentMethod"
                model="payment-methods"
            />
        </section>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="data" />
        </section>
    </div>
</template>

<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue"; // Використовуємо лейаут налаштувань
import DataTable from "./Partials/DataTable.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed, ref, watch } from "vue";
import { router, Head } from "@inertiajs/vue3";
import debounce from "lodash.debounce";
import InputSearch from "@/Components/UI/InputSearch.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";

// Використовуємо Layout для налаштувань
defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: {
        type: Object,
    },
    filters: Object,
});

// Адаптація даних під вашу структуру Ace Admin
const items = computed(() => props.data?.paymentMethods?.data || []);
const meta = computed(() => props.data?.paymentMethods?.meta || []);
const searchText = ref(props.filters?.search || "");
const selectedItems = ref([]);

// Пошук з дебаунсом (синхронізовано з вашою групою маршрутів admin.settings)
watch(
    searchText,
    debounce((value) => {
        router.get(
            route("admin.settings.payment-methods.index"),
            { search: value },
            { preserveState: true, replace: true },
        );
    }, 500),
);

// Видалення
const deletePaymentMethod = (item) => {
    router.delete(route("admin.settings.payment-methods.destroy", item.id), {
        onBefore: () =>
            confirm($t("Are you sure you want to delete this payment method?")),
    });
};

// Створення
const handleCreate = () => {
    router.visit(route("admin.settings.payment-methods.create"));
};

// Кнопки дій у вашому стилі
const actionButtons = [
    {
        label: "create",
        action: handleCreate,
        type: "primary",
        icon: "IconCirclePlus",
    },
];
</script>

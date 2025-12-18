<template>
    {{ locale }}
    <div v-show="visible" class="absolute z-50 top-full left-0 right-0 mt-1">
        <!-- Overlay для закриття при кліку поза межами -->
        <div class="fixed inset-0 bg-gray-800/20" @click="onClose" />

        <!-- Контейнер меню -->
        <div class="relative max-w-7xl mx-auto p-4">
            <ul
                class="w-full shadow-2xl bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
                <li v-if="loading" class="p-4 text-center text-gray-500">
                    {{ $t("Loading categories...") }}
                </li>

                <li
                    v-else-if="!items.length"
                    class="p-4 text-center text-gray-500"
                >
                    {{ $t("No categories found.") }}
                </li>

                <li
                    v-else
                    v-for="item in items"
                    :key="item.id"
                    class="border-b last:border-b-0"
                >
                    <!-- ✅ Використовуємо лише власну подію @close -->
                    <MenuItem :data="item" @close="onClose" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import MenuItem from "./UI/MenuItem.vue";

const props = defineProps({
    locale: {
        type: String,
        default: "en",
    },
    visible: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);
const onClose = () => emit("close");

// --- Завантаження категорій ---
const currentLocale = computed(() => props.locale || "en");
const items = ref([]);
const { loading, fetchData } = useApiResourceService();

const getCategories = async () => {
    items.value = [];

    try {
        const url = route("api.get.categories", {
            locale: currentLocale.value,
        });
        const res = await fetchData(url);

        if (res && res.data && Array.isArray(res.data.items)) {
            items.value = res.data.items;
        } else {
            console.error(
                "API returned invalid or empty menu items array.",
                res
            );
        }
    } catch (e) {
        console.error("Failed to fetch categories:", e);
    }
};

// --- Спостерігаємо за зміною локалі ---
watch(
    currentLocale,
    (newLocale, oldLocale) => {
        if (newLocale !== oldLocale || items.value.length === 0) {
            getCategories();
        }
    },
    { immediate: true }
);
</script>

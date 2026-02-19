<script setup>
import { computed, watch } from "vue";
import MenuItem from "./UI/MenuItem.vue";
import { useCategoryStore } from "@/Stores/categoryStore";

const props = defineProps({
    locale: { type: String, default: "en" },
});

const emit = defineEmits(["close"]);
const categoryStore = useCategoryStore();

// Отримуємо категорії саме для поточної локалі зі стору
const items = computed(() => categoryStore.categories[props.locale] || []);
// Функція для запиту
const loadData = () => {
    categoryStore.fetchCategories(props.locale);
};
// Стежимо за обома змінами
watch(
    () => props.locale,
    (newLocale) => {
        loadData();
    },
    { immediate: true } // Спрацює при ініціалізації компонента
);
const onClose = () => emit("close");
</script>

<template>
    <div class="bg-white absolute left-0 top-full w-full">
        <div class="container mx-auto">
            <div
                v-if="categoryStore.isLoading && items.length === 0"
                class="p-10 text-center text-gray-400"
            >
                Loading...
            </div>

            <div v-else class="border my-4 mx-2">
                <ul class="grid grid-cols-4 divide-x gap-4 md:gap-6">
                    <li v-for="item in items" :key="item.id" class="p-4">
                        <Link
                            :href="`/category__${item.slug}`"
                            @click="onClose"
                            class="font-semibold border-b block pb-2 hover:underline"
                            >{{ item.title }}</Link
                        >

                        <ul v-if="item.childs?.length" class="mt-2">
                            <li
                                v-for="child in item.childs"
                                :key="child.id"
                                class="py-1"
                            >
                                <Link
                                    :href="`/category__${child.slug}`"
                                    class="hover:underline"
                                    @click="onClose"
                                    >{{ child.title }}</Link
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

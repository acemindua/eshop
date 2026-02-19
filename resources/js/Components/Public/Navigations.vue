<template>
    <nav class="flex items-center space-x-2 justify-between text-sm capitalize">
        <!-- Use a conditional check to ensure 'items' is ready before rendering -->

        <div v-if="loading" class="text-gray-500">Loading menu...</div>
        <div v-else>
            <ul v-if="items.length > 0" class="flex items-center space-x-4">
                <li
                    v-for="item in items"
                    :key="item.slug"
                    class="hover:text-indigo-600 transition duration-150"
                >
                    <!-- Assuming 'Link' is the Inertia/Vue component for navigation -->
                    <Link :href="`/${item.slug}`">{{ item.title }}</Link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import useApiResourceService from "@/Composables/useApiResourceService";
import { computed, ref, watch } from "vue";

const props = defineProps({
    locale: {
        type: String,
        default: "en",
    },
});
const { loading, fetchData } = useApiResourceService();

const items = ref([]);

const currentLocale = computed(() => {
    return props.locale || "en";
});

const getMenu = async () => {
    items.value = [];

    try {
        const url = route("api.get.menu", { locale: currentLocale.value });
        const res = await fetchData(url);

        if (res && res.data && Array.isArray(res.data.items)) {
            items.value = [...items.value, ...res.data.items];
        } else {
            console.error(
                "API returned invalid or empty menu items array.",
                res
            );
        }
    } catch (e) {
        console.error("Failed to fetch menu:", e);
    }
};

watch(
    currentLocale,
    (newLocale, oldLocale) => {
        // Якщо нова локаль відрізняється від старої, викликаємо оновлення
        if (newLocale !== oldLocale) {
            getMenu();
        }
    },
    { immediate: true }
);
</script>

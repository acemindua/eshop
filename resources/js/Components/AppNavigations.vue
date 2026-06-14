<template>
    <div>
        <div
            v-if="loading && menuItems.length === 0"
            class="py-2 text-gray-400 italic text-xs"
        >
            Loading navigation...
        </div>

        <div v-else-if="menuItems.length > 0" class="mx-auto container">
            <NavigationTree :list="menuItems" />
        </div>

        <div v-else class="text-xs text-gray-400 italic py-2">
            Navigation "{{ props.slug }}" is empty.
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, defineComponent, h } from "vue";
import { Link } from "@inertiajs/vue3";
import useApiResourceService from "@/Composables/useApiResourceService";

const props = defineProps({
    slug: {
        type: String,
        default: () => "header",
    },
    locale: {
        type: String,
        default: () => "en",
    },
});

const { fetchData, loading } = useApiResourceService();
const menuItems = ref([]);

// Функція завантаження структури меню з API
const loadData = async () => {
    try {
        const url = route("api.get.menu", {
            locale: props.locale,
            slug: props.slug,
        });

        const res = await fetchData(url);

        // Перевіряємо валідність структури відповіді
        if (
            res &&
            res.data &&
            res.data.items &&
            Array.isArray(res.data.items.tree)
        ) {
            menuItems.value = res.data.items.tree;
        } else {
            menuItems.value = [];
            console.error(
                "API returned invalid structure or empty tree array.",
                res,
            );
        }
    } catch (e) {
        menuItems.value = [];
        console.error("Failed to fetch menu:", e);
    }
};

// Ініціалізація при монтуванні компонента
onMounted(() => {
    loadData();
});

// Відстежуємо зміну мови (locale) для реактивного оновлення посилань
watch(
    () => props.locale,
    () => {
        loadData();
    },
);

// --- РЕКУРСИВНИЙ КОМПОНЕНТ ДЛЯ ПУБЛІЧНОЇ НАВІГАЦІЇ ---
const NavigationTree = defineComponent({
    name: "NavigationTree",
    props: {
        list: { type: Array, required: true },
        isSubmenu: { type: Boolean, default: false },
    },
    setup(nestedProps) {
        return () =>
            h(
                "ul",
                {
                    class: nestedProps.isSubmenu
                        ? "absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg p-2 hidden group-hover:block z-50 flex flex-col space-y-1"
                        : "flex flex-row flex-wrap items-center gap-6",
                },
                nestedProps.list.map((item) => {
                    // 1. Безпечне формування URL для запобігання помилок конструктора URL в Inertia
                    let itemUrl = "/";
                    if (item.url) {
                        itemUrl = item.url;
                    } else if (item.slug) {
                        itemUrl = item.slug.startsWith("/")
                            ? item.slug
                            : `/${item.slug}`;
                    }

                    // 2. Визначення локалізованого заголовка (динамічні моделі або кастомні лінки)
                    const itemTitle =
                        item.title || item.name || item.label || "No Title";

                    // 3. Перевірка наявності вкладеного підменю
                    const hasChildren =
                        item.children && item.children.length > 0;

                    return h("li", { class: "relative group py-2" }, [
                        h(
                            Link,
                            {
                                href: itemUrl,
                                class: nestedProps.isSubmenu
                                    ? "block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded transition"
                                    : "text-sm font-medium text-gray-700 hover:text-indigo-600 transition",
                            },
                            () => itemTitle,
                        ),

                        // Рекурсивний рендер підменю (якщо children існує)
                        hasChildren
                            ? h(NavigationTree, {
                                  list: item.children,
                                  isSubmenu: true,
                              })
                            : null,
                    ]);
                }),
            );
    },
});
</script>

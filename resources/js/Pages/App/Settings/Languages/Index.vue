<template>
    <Layout>
        <div>
            <section class="overflow-x-auto m-4 border bg-white">
                <table class="w-full text-sm">
                    <thead>
                        <tr
                            class="text-xs uppercase text-slate-600 text-thin divide-x"
                        >
                            <th scope="col" class="p-2">Active</th>
                            <th scope="col" class="p-2">Flag</th>
                            <th scope="col" class="p-2 text-start">Native</th>
                            <th scope="col" class="p-2">Code</th>
                            <th scope="col" class="p-2 text-start">Comment</th>
                            <th scope="col" class="p-2">Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-if="items.length > 0"
                            v-for="item in items"
                            :key="item.id"
                            class="hover:bg-slate-50 border-t border-slate-200 dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"
                        >
                            <td scope="row" class="p-2 text-center">
                                <input
                                    :id="`checkbox-${item.code}`"
                                    name="active"
                                    type="checkbox"
                                    :value="item.code"
                                    :checked="item.code === def"
                                    v-model="form.codes"
                                    @change="submit"
                                    class="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                />
                            </td>
                            <td scope="row" class="p-2 text-center">
                                <flag
                                    :iso="getParsedRegion(item.description)"
                                    :title="
                                        getParsedDescription(item.description)
                                            .native
                                    "
                                    class="rounded-full text-xl"
                                />
                            </td>
                            <td scope="row" class="p-2 text-start capitalize">
                                {{
                                    getParsedDescription(item.description)
                                        .native
                                }}
                            </td>
                            <td scope="row" class="p-2 text-center uppercase">
                                {{ item.code }}
                            </td>
                            <td scope="row" class="p-2 text-start">
                                <span
                                    v-if="item.code === def"
                                    class="text-xs text-slate-600"
                                    >Default (Doesn't remove)</span
                                >
                            </td>
                            <td scope="row" class="p-2 text-center">
                                {{ item.id }}
                            </td>
                        </tr>
                        <tr v-else>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot v-if="data.links">
                        <tr>
                            <td scope="row" colspan="100%">
                                <Pagination
                                    :links="data.links"
                                    :total="data.total"
                                    :from="data.from"
                                    :to="data.to"
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </div>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Shared/Themes/Layouts/SettingLayout.vue";
import { computed, ref, reactive } from "vue";
import Pagination from "@/Components/Pagination.vue";
import { router, usePage } from "@inertiajs/vue3";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: Object,
});

const items = computed(() => {
    return props.data.data || [];
});

// Отримання значень із сторінки
const page = usePage();
const languages = page.props.lang.locales;
const def = page.props.lang.default;

// Створення масиву активних кодів мов
const codes_active = Object.keys(languages); // Отримуємо всі активні мови
const codes = ref(codes_active); // Перетворюємо на реф, щоб змінювати стан

// Форм для зберігання вибраних мов
const form = reactive({
    codes: codes.value, // Моделюємо вибрані мови
});

// Функція для парсингу JSON-опису
function getParsedDescription(description) {
    try {
        return JSON.parse(description);
    } catch (e) {
        console.error("Invalid JSON format:", e);
        return {
            native: "N/A",
            regional: "N/A",
        }; // Значення за замовчуванням
    }
}

// Функція для отримання регіону з опису
function getParsedRegion(description) {
    const parsed = getParsedDescription(description);
    return parsed.regional
        ? parsed.regional.split("_")[1].toLowerCase()
        : "unknown";
}

// Функція для надсилання форми
function submit() {
    router.post(route("admin.languages.store"), form, {
        forceFormData: true,
        preserveState: true,
    });
}

// Функція для оновлення сторінки
function refreshPage() {
    router.reload();
}

// Функція для видалення вибраних елементів
function deleteSelected() {
    const selectedItems = form.codes; // доступ до вибраних кодів
    if (selectedItems.length === 0) {
        alert("No items selected");
        return;
    }

    // Викликаємо API для видалення
    router.post(
        route("languages.delete"),
        {
            codes: selectedItems,
        },
        {
            onSuccess: () => {
                console.log("Items deleted successfully");
            },
            onError: (error) => {
                console.error("Error deleting items:", error);
            },
        }
    );
}

function isChecked(code) {
    if (def === code) return true;

    // Використовуємо includes для перевірки наявності коду в масиві
    return codes.value.includes(code);
}
</script>

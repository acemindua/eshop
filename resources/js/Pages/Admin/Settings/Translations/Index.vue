<script setup>
import { ref, computed } from "vue";
import { useForm } from "@inertiajs/vue3";
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";

const props = defineProps({ translations: Array, locales: Array });
const form = useForm({ items: props.translations });
const search = ref("");

const filtered = computed(() =>
    form.items.filter(
        (i) =>
            i.key.toLowerCase().includes(search.value.toLowerCase()) ||
            Object.values(i.values).some((v) =>
                String(v).toLowerCase().includes(search.value.toLowerCase()),
            ),
    ),
);

const submit = () =>
    form.post(route("admin.translations.update_all"), { preserveScroll: true });
</script>

<template>
    <Layout>
        <div class="p-4 bg-white rounded-lg shadow">
            <div class="flex justify-between mb-4">
                <h1 class="text-xl font-bold">Локалізація (JSON)</h1>
                <button
                    @click="submit"
                    :disabled="form.processing"
                    class="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {{ form.processing ? "..." : "Зберегти" }}
                </button>
            </div>

            <input
                v-model="search"
                placeholder="Пошук..."
                class="w-full mb-4 border-gray-300 rounded"
            />

            <div class="overflow-auto max-h-[70vh]">
                <table class="w-full text-left border-collapse">
                    <thead class="sticky top-0 bg-gray-100">
                        <tr>
                            <th class="p-2 border">Ключ</th>
                            <th
                                v-for="l in locales"
                                :key="l"
                                class="p-2 border uppercase"
                            >
                                {{ l }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in filtered"
                            :key="item.key"
                            :class="{
                                'bg-red-50': Object.values(item.values).some(
                                    (v) => !v,
                                ),
                            }"
                        >
                            <td class="p-2 border font-mono text-xs">
                                {{ item.key }}
                            </td>
                            <td
                                v-for="l in locales"
                                :key="l"
                                class="p-2 border"
                            >
                                <textarea
                                    v-model="item.values[l]"
                                    rows="1"
                                    class="w-full border-0 focus:ring-1 p-1 text-sm resize-none"
                                    @input="
                                        (e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height =
                                                e.target.scrollHeight + 'px';
                                        }
                                    "
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
</template>

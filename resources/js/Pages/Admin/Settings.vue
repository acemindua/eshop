<template>
    <Head :title="$t('Settings')" />
    <div class="flex flex-col space-y-2">
        <form
            @submit.prevent="submit"
            class="space-y-6 bg-white p-6 shadow-md rounded-lg"
        >
            <section
                v-if="form.settings && Object.keys(form.settings).length > 0"
            >
                <div
                    v-for="(option, key) in form.settings"
                    :key="option.id"
                    class="border-b border-gray-200 pb-4 mb-4"
                >
                    <label
                        :for="key"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {{
                            option.description ||
                            key.toUpperCase().replace(/_/g, " ")
                        }}
                    </label>

                    <p
                        v-if="option.description"
                        class="text-xs text-gray-500 mb-2"
                    >
                        Ключ: <code>{{ key }}</code>
                    </p>

                    <template v-if="option.value && option.value.length > 50">
                        <textarea
                            :id="key"
                            v-model="option.value"
                            rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                    </template>
                    <template v-else>
                        <input
                            :id="key"
                            type="text"
                            v-model="option.value"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </template>

                    <p
                        class="mt-1 text-sm text-red-500"
                        v-if="form.errors[`settings.${key}.value`]"
                    >
                        {{ form.errors[`settings.${key}.value`] }}
                    </p>
                </div>
            </section>

            <div class="pt-4">
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {{
                        form.processing ? $t("Saving...") : $t("Save Settings")
                    }}
                </button>
            </div>
        </form>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="data" />
        </section>
    </div>
</template>

<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { useForm } from "@inertiajs/vue3";
import { computed } from "vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

// 1. Обчислюємо початкові налаштування з props, щоб передати їх у форму
const initialSettings = computed(() => {
    // Перетворюємо масив на об'єкт, де ключ - це 'key' опції (для зручності доступу у v-for)
    return (
        props.data?.settings.reduce((acc, option) => {
            acc[option.key] = option;
            return acc;
        }, {}) || {}
    );
});

// 2. Створюємо форму Inertia.js
const form = useForm({
    settings: initialSettings.value, // Заповнюємо форму початковими даними
});

// 3. Метод відправки форми
const submit = () => {
    // Відправляємо дані на оновлення.
    // Використовуйте POST/PUT/PATCH метод та відповідний URL маршруту.
    form.post(route("admin.settings.update"), {
        preserveScroll: true,
        // Обробка успіху чи невдачі може бути додана тут
    });
};
</script>

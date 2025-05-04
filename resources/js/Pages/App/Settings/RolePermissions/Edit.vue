<template>
    <Layout>
        <Head title="Edit role" />
        <h1 class="font-semibold border-b p-4">
            Edit role: {{ data.role.name }}
        </h1>
        <section class="grid grid-cols-4 gap-2 p-4">
            <div
                v-for="group in groupedPermissions"
                :key="group.model"
                class="border p-4"
            >
                <h2 class="font-bold">{{ capitalize(group.model) }}</h2>
                <div
                    v-for="action in group.actions"
                    :key="action"
                    class="flex items-center gap-2"
                >
                    <input
                        type="checkbox"
                        :id="`${group.model}-${action}`"
                        :value="`${group.model}-${action}`"
                        v-model="selectedPermissions"
                        class="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                    />
                    <label :for="`${group.model}-${action}`">{{
                        capitalize(action)
                    }}</label>
                </div>
            </div>
        </section>

        <form @submit.prevent="submit" class="py-4">
            <div class="flex items-center gap-4 m-4">
                <PrimaryButton :disabled="loading">Save</PrimaryButton>
                <p
                    v-if="recentlySuccessful"
                    class="text-sm text-gray-500 dark:text-green-500"
                >
                    Saved.
                </p>
            </div>
        </form>

        <!-- Розділ для дебагу -->
        <section>
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Shared/Themes/Layouts/SettingLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed, ref, reactive } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { router } from "@inertiajs/vue3";

const props = defineProps({
    data: Object,
});

const loading = ref(false);
const recentlySuccessful = ref(false);

const permissions = computed(() => props.data.permissions || []);
const modelPermissions = computed(
    () => props.data.modelPermissions.map((p) => p.name) || []
);

// Групування дозволів за моделями
const groupedPermissions = computed(() => {
    const groups = {};
    permissions.value.forEach((permission) => {
        const [model, action] = permission.split("-");
        if (!groups[model]) {
            groups[model] = new Set();
        }
        groups[model].add(action);
    });
    return Object.entries(groups).map(([model, actionsSet]) => ({
        model,
        actions: Array.from(actionsSet),
    }));
});

// Відмічені дозволи
const selectedPermissions = ref([...modelPermissions.value]);

// Функція для капіталізації першої літери рядка
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const form = reactive({
    _method: "put",
    name: props.data.role,
    permissions: selectedPermissions,
});

const submit = () => {
    router.post(route("admin.roles.update", props.data.role), form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => (loading.value = true),
        onSuccess: () => {
            recentlySuccessful.value = true;
            setTimeout(() => (recentlySuccessful.value = false), 3000);
        },
        onFinish: () => (loading.value = false),
    });
};
</script>

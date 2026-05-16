<script setup>
import { router } from "@inertiajs/vue3";
import { reactive, ref } from "vue";
// Layout and UI Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import StickyActions from "@/Components/StickyActions.vue";

/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    errors: Object,
});

const model = "users";
const modelId = props.data?.user?.id || null;
const loading = ref(false);
const isEditing = ref(!!modelId);

const form = reactive({
    name: "",
    email: "",
    last_name: "",
    phone: "",
    description: "",
    avatar: null,
});

const handleCancel = () => {
    router.visit(route(`admin.${model}.index`));
};
const handleSave = () => {
    const url = isEditing.value
        ? route(`admin.${model}.update`, modelId)
        : route(`admin.${model}.store`);

    router.post(url, form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => (loading.value = true),
        onFinish: () => (loading.value = false),
        onSuccess: () => {
            // Опціонально: сповіщення про успіх
        },
    });
};

const actionButtons = [
    {
        label: "cancel",
        action: handleCancel,
        type: "secondary",
        icon: "IconCancel",
    },
    {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
    },
];

defineOptions({ layout: DashboardAdminLayout });
</script>

<template>
    <div class="flex flex-col">
        <StickyActions :buttons="actionButtons">
            <section class="min-h-screen"></section>
        </StickyActions>

        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>

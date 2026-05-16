<script setup>
import { router } from "@inertiajs/vue3";
import { reactive } from "vue";
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
    _method: "put",
    id: modelId || null,
    name: props.data.user.name || "",
    email: props.data.user.email || "",
    last_name: props.data.user.last_name || "",
    phone: props.data.user.phone || "",
    description: props.data.user.description || "",
    avatar: null,
});

const handleCancel = () => {
    router.visit(route(`admin.${model}.index`));
};
const handleSave = () => {
    router.post(route(`admin.${model}.update`, modelId), form, {
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

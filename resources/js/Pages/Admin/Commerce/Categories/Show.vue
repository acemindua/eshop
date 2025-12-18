<template>
    <div class="flex flex-col space-y-2">
        <!-- Action Buttons -->
        <section class="flex items-center justify-between pt-4">
            <span></span>
            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <section></section>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="data" />
        </section>
    </div>
</template>
<script setup>
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import Layout from "@/Layouts/Admin/CommerceAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: {
        type: Object,
    },
});

const actionButtons = [];
</script>

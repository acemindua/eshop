<template>
    <div class="flex flex-col space-y-2 w-full py-4">
        <section class="flex flex-col items-center justify-center">
            <ImageDataView
                :src="user?.avatar"
                :configs="{ width: '100px', height: '100px' }"
            />

            <p class="font-semibold text-xl mt-6">{{ user.name }}</p>
            <p>
                <a
                    :href="`mailto:${user.email}`"
                    class="text-gray-500 text-sm"
                    >{{ user.email }}</a
                >
            </p>
        </section>

        <!-- VArDump -->
        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>
<script setup>
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed } from "vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: {
        type: Object,
    },
});

const user = computed(() => props.data.user || {});
</script>

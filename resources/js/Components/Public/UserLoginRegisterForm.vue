<script setup>
import { usePage } from "@inertiajs/vue3";
import { IconUserCircle } from "@tabler/icons-vue";

const user = usePage().props?.auth?.user || null;
</script>

<template>
    <div class="text-xs">
        <div v-if="user"></div>
        <div v-else>
            <button
                @click="open = !open"
                class="flex items-center space-x-2 border rounded-lg p-2 px-4"
            >
                <IconUserCircle stroke="{2}" :size="24" />
                <span>{{ $t("actions.log_in") }}</span>
            </button>
        </div>
    </div>
</template>

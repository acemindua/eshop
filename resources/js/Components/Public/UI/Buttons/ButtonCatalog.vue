<script setup>
import { IconCategory, IconX } from "@tabler/icons-vue";

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div>
        <button
            class="flex w-full items-center justify-center bg-brand text-white h-full p-2 px-6 font-semibold rounded-lg"
        >
            <div class="flex gap-2 items-center">
                <IconCategory v-if="!open" :size="20" />
                <IconX v-else :size="20" />
                <span>{{ $t("Catalog") }}</span>
            </div>
        </button>
    </div>
</template>

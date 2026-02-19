<script setup>
import { IconShoppingBag } from "@tabler/icons-vue";
</script>

<template>
    <button
        type="button"
        class="bg-brand px-4 py-2 rounded-lg text-white inline-flex items-center justify-center gap-2"
    >
        <IconShoppingBag :stroke="2" :size="32" />
        <span>{{ $t("Buy") }}</span>
    </button>
</template>

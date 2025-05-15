<template>
    <pre>
        {{ item }}
    </pre>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    data: Object,
});

const item = computed(() => props.data.item.data || {});
</script>

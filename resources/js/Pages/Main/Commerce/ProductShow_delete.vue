<template>
    <div class="text-xs overflow-x-auto">
        <pre>
        {{ data }}
    </pre
        >
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    data: Object,
});

const item = computed(() => props.data.item.data || {});
</script>

<template>
    <div
        class="text-xs text-slate-400 overflow-hidden rounded-lg p-6 border my-6"
    >
        <div class="w-full max-h-screen overflow-auto">
            <pre>
            {{ data }}
        </pre
            >
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: [Array, Object],
});
</script>

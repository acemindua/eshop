<script setup>
defineProps({
    links: Array,
    from: Number,
    to: Number,
    total: Number,
});
defineEmits(["change"]); // Подія для виклику getData
</script>

<template>
    <div
        v-if="links && links.length > 3"
        class="flex items-center justify-between py-3 text-xs text-slate-600"
    >
        <div>Показано від {{ from }} до {{ to }} з {{ total }} позицій</div>
        <div class="flex items-center space-x-1">
            <button
                v-for="(link, index) in links"
                :key="index"
                @click.prevent="$emit('change', link)"
                :disabled="!link.url || link.active"
                class="px-3 py-2 border rounded duration-300"
                :class="{
                    'bg-gray-800 text-white font-bold': link.active,
                    'hover:border-violet-600 hover:text-violet-600':
                        link.url && !link.active,
                    'text-gray-300 cursor-not-allowed': !link.url,
                }"
                v-html="link.label"
            ></button>
        </div>
    </div>
</template>

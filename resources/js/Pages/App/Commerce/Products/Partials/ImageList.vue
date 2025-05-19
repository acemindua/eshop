<template>
    <div class="md:px-8">
        <div ref="sortableContainer" class="flex flex-wrap gap-2">
            <div
                v-for="(image, index) in images"
                :key="image.id"
                :data-id="image.id"
                class="border cursor-move rounded-lg overflow-hidden w-48 h-48 relative p-2 bg-white"
            >
                <img :src="image.url" class="w-full h-full" />

                <!-- Tooltip for first image -->
                <div
                    v-if="index === 0"
                    class="absolute top-1 left-1 bg-green-600/75 text-white text-xs px-2 py-1 rounded shadow"
                >
                    Main Image
                </div>

                <PrimaryButton
                    @click.prevent="$emit('delete', image.id)"
                    class="absolute shadow top-1 w-4 text-white bg-slate-900/25 right-1 hover:bg-red-500 rounded-full flex items-center justify-center"
                    title="Delete image"
                >
                    ×
                </PrimaryButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sortable from "sortablejs";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    loading: Boolean,
    errors: Object,
    images: Array,
});

const emit = defineEmits(["reorder", "delete"]);
const sortableContainer = ref(null);

onMounted(() => {
    if (sortableContainer.value) {
        Sortable.create(sortableContainer.value, {
            animation: 150,
            onEnd: () => {
                const order = {};
                Array.from(sortableContainer.value.children).forEach(
                    (child, index) => {
                        order[child.dataset.id] = index + 1;
                    }
                );
                emit("reorder", order);
            },
        });
    }
});
</script>

<style scoped>
/* Additional styling as needed */
</style>

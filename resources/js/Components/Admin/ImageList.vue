<template>
    <div ref="sortableContainer" class="flex flex-wrap gap-4">
        <div
            v-for="(image, index) in images"
            :key="image.id"
            :data-id="image.id"
            class="group relative border rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-sm"
            :class="[
                index === 0
                    ? 'w-64 h-64 ring-2 ring-blue-500'
                    : 'w-40 h-40 hover:border-blue-300',
                image.isUploading ? 'cursor-wait' : 'cursor-move',
            ]"
        >
            <img
                :src="image.url"
                :alt="image.name || 'Product image'"
                class="w-full h-full object-cover select-none transition-all duration-500"
                :class="{
                    'grayscale blur-[2px] opacity-50': image.isUploading,
                }"
            />

            <div
                v-if="image.isUploading"
                class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
            >
                <div class="relative w-16 h-16">
                    <svg class="w-full h-full transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="transparent"
                            class="text-white/30"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="transparent"
                            stroke-linecap="round"
                            :stroke-dasharray="175.93"
                            :stroke-dashoffset="
                                175.93 * (1 - image.progress / 100)
                            "
                            class="text-white transition-all duration-300 ease-out"
                        />
                    </svg>
                    <span
                        class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white"
                    >
                        {{ image.progress }}%
                    </span>
                </div>
            </div>

            <div
                v-if="index === 0 && !image.isUploading"
                class="absolute top-2 left-2 z-10 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md"
            >
                Main
            </div>

            <button
                v-if="!image.isUploading"
                type="button"
                aria-label="Delete image"
                @click.stop="$emit('delete', image.id)"
                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
                ✕
            </button>
        </div>
    </div>
</template>

<script setup>
import Sortable from "sortablejs";
import { onMounted, onUnmounted, ref, nextTick } from "vue";

const props = defineProps({
    images: { type: Array, required: true },
});

const emit = defineEmits(["reorder", "delete"]);
const sortableContainer = ref(null);
let sortableInstance = null;

onMounted(() => {
    if (!sortableContainer.value) return;

    sortableInstance = new Sortable(sortableContainer.value, {
        animation: 250,
        ghostClass: "opacity-10",
        filter: ".cursor-wait",
        onEnd: async (evt) => {
            const { oldIndex, newIndex } = evt;
            if (oldIndex === newIndex) return;

            // 1. Блокуємо Sortable, щоб він не міняв DOM до того, як Vue перемалює список
            sortableInstance.option("disabled", true);

            // 2. Створюємо новий масив
            const updatedImages = [...props.images];
            const [movedItem] = updatedImages.splice(oldIndex, 1);
            updatedImages.splice(newIndex, 0, movedItem);

            // 3. Емітимо оновлення батьківському компоненту
            emit("reorder", updatedImages);

            // 4. Дочекаємося, поки Vue оновить DOM, і повертаємо контроль Sortable
            await nextTick();
            sortableInstance.option("disabled", false);
        },
    });
});

onUnmounted(() => {
    sortableInstance?.destroy();
});
</script>

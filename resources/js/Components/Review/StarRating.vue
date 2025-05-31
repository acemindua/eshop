<template>
    <div class="flex items-center text-2xl">
        <span
            v-for="star in maxStars"
            :key="star"
            class="cursor-pointer transition-colors duration-200"
            :class="{
                'text-yellow-400': star <= currentRating, // Заповнені зірки
                'text-gray-300': star > currentRating, // Незаповнені зірки
                'hover:text-yellow-500': !readOnly, // Ефект при наведенні для інтерактивних зірок
            }"
            @click="setRating(star)"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
        >
            &#9733;
        </span>
        <span
            v-if="showAverage && averageRating > 0"
            class="ml-2 text-sm text-gray-600"
        >
            ({{ averageRating.toFixed(1) }})
        </span>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

// Визначення пропсів
const props = defineProps({
    modelValue: {
        // Для v-model, якщо використовуємо для вводу
        type: Number,
        default: 0,
    },
    initialRating: {
        // Для відображення вже існуючого рейтингу (read-only)
        type: Number,
        default: 0,
    },
    maxStars: {
        type: Number,
        default: 5,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    showAverage: {
        type: Boolean,
        default: false,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
});

// Визначення емітів
const emit = defineEmits(["update:modelValue", "rating-selected"]);

// Реактивні змінні
const internalRating = ref(props.modelValue || props.initialRating);
const hoverRating = ref(0);

// Обчислювана властивість для відображення зірок (враховує hover)
const currentRating = computed(() => hoverRating.value || internalRating.value);

// Спостерігач за modelValue або initialRating
watch(
    () => props.modelValue,
    (newVal) => {
        internalRating.value = newVal;
    }
);

watch(
    () => props.initialRating,
    (newVal) => {
        if (props.readOnly) {
            internalRating.value = newVal;
        }
    }
);

// Методи
const setRating = (star) => {
    if (!props.readOnly) {
        internalRating.value = star;
        emit("update:modelValue", star);
        emit("rating-selected", star);
    }
};
</script>

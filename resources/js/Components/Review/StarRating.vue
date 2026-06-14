<template>
    <div class="flex items-center">
        <span
            v-for="star in maxStars"
            :key="star"
            class="cursor-pointer transition-colors duration-200"
            :class="starColorClass(star)"
            @mouseenter="onHover(star)"
            @mouseleave="onLeave"
            @click="setRating(star)"
        >
            <!-- Повна -->
            <IconStarFilled v-if="star <= fullStars" :size="size" />

            <!-- Половина -->
            <IconStarHalfFilled
                v-else-if="star === fullStars + 1 && hasHalfStar"
                :size="size"
            />

            <!-- Порожня -->
            <IconStar v-else :size="size" />
        </span>
    </div>
</template>

<script setup>
import {
    IconStar,
    IconStarFilled,
    IconStarHalfFilled,
} from "@tabler/icons-vue";
import { ref, computed } from "vue";

const props = defineProps({
    modelValue: { type: Number, default: 0 },
    maxStars: { type: Number, default: 5 },
    readOnly: { type: Boolean, default: true },
    showAverage: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 },
    size: { type: [Number, String], default: 24 },
});

const emit = defineEmits(["update:modelValue", "rating-selected"]);

const hoverRating = ref(0);

// 🔢 Поточний рейтинг
const currentRating = computed(() => {
    if (hoverRating.value > 0) return hoverRating.value;

    if (props.modelValue > 0) return props.modelValue;

    if (props.readOnly && props.showAverage) {
        return props.averageRating;
    }

    return 0;
});

// ⭐ Повні зірки
const fullStars = computed(() => Math.floor(currentRating.value));

// ⭐ Є половинка?
const hasHalfStar = computed(() => currentRating.value % 1 >= 0.5);

// 🎨 Колір
const starColorClass = (star) => {
    if (star <= Math.ceil(currentRating.value)) {
        return ["text-orange-500", !props.readOnly && "hover:text-orange-400"];
    }

    return ["text-gray-300", !props.readOnly && "hover:text-orange-400"];
};

// 🖱 Hover
const onHover = (star) => {
    if (!props.readOnly) {
        hoverRating.value = star;
    }
};

const onLeave = () => {
    if (!props.readOnly) {
        hoverRating.value = 0;
    }
};

// 🖱 Click
const setRating = (star) => {
    if (!props.readOnly) {
        emit("update:modelValue", star);
        emit("rating-selected", star);
    }
};
</script>

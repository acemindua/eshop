<template>
    <div>
        <!-- Основний пункт меню -->
        <Link
            :href="`/category__${data.slug}`"
            class="flex items-center justify-between p-3 transition-colors hover:bg-indigo-50/50"
            @click="onClose"
        >
            <span class="font-medium text-gray-800">{{ data.title }}</span>
        </Link>

        <!-- Підкатегорії -->
        <div
            v-if="data.childs && data.childs.length"
            class="pl-4 pr-1 py-1 bg-gray-50/50"
        >
            <ul class="space-y-1">
                <li v-for="item in data.childs" :key="item.id">
                    <MenuItem :data="item" @close="onClose" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import MenuItem from "./MenuItem.vue"; // для рекурсивного виклику

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

// Події, які компонент може емітити
const emit = defineEmits(["close"]);

// Викликається при кліку на пункт меню
const onClose = () => {
    emit("close");
};
</script>

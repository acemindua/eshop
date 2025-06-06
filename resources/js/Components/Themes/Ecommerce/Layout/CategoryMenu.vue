// CategoryMenu.vue
<template>
    <div v-show="visible">
        <div class="fixed inset-0 bg-gray-800/10" @click="onClose" />
        <div
            class="bg-white p-4 w-full absolute left-0 top-20 z-50 border-t duration-150 shadow-sm"
        >
            <div class="rounded-lg max-w-7xl mx-auto">
                <CategoryTree :categories="categories" />
            </div>
        </div>
    </div>
</template>

<script setup>
import CategoryTree from "@/Components/Themes/Ecommerce/CategoryTree.vue";

defineProps({
    categories: Array,
    visible: Boolean,
});
const emit = defineEmits(["close"]);
const onClose = () => emit("close");
</script>

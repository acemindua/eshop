<script setup>
import { defineProps } from "vue";

const props = defineProps({
    categories: [Array, Object],
});
</script>

<template>
    <div class="flex items-center gap-8 text-sm">
        <div v-for="category in categories" :key="category.id">
            <Link :href="`/category__${category.slug}/`">
                <span>{{ category.title }}</span>
            </Link>
            <CategoryTree
                v-if="category.childs && category.childs.length"
                :categories="category.childs"
                class="subcategory-list"
            />
        </div>
    </div>
</template>

<style scoped>
.subcategory-list {
    list-style: none;
    padding-top: 4px;
}
</style>

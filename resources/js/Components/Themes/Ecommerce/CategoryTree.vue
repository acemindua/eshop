<script setup>
import { defineProps } from "vue";

const props = defineProps({
    categories: [Array, Object],
});
</script>

<template>
    <ul class="text-sm py-2">
        <li v-for="category in categories" :key="category.id" class="py-1">
            <Link :href="`/category__${category.slug}/`">
                <span :class="{ 'font-semibold': !category.parent }">{{
                    category.title
                }}</span>
            </Link>
            <CategoryTree
                v-if="category.childs && category.childs.length"
                :categories="category.childs"
                class="subcategory-list"
            />
        </li>
    </ul>
</template>

<style scoped>
.subcategory-list {
    list-style: none;
    padding: 4px 10px;
}
</style>

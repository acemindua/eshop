<script setup>
import { defineProps } from "vue";

const props = defineProps({
    categories: Array,
});
</script>

<template>
    <ul class="category-list">
        <li v-for="category in categories" :key="category.id">
            <Link :href="`/category__${category.slug}/`">
                <span class="font-bold">{{ category.title }}</span>
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
.category-list {
    list-style: none;
    padding-left: 10px;
}

.subcategory-list {
    padding-left: 15px;
    border-left: 1px solid #ccc;
    margin-top: 5px;
}
</style>

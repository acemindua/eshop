<script setup>
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import PopularProducts from "./Commerce/Components/PopularProducts.vue";

defineOptions({ layout: Layout });
</script>

<template>
    <div>
        <section class="mb-8">
            <PopularProducts />
        </section>
    </div>
</template>

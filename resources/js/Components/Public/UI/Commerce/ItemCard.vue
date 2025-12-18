<template>
    <div>
        <div class="w-full h-64">
            <div v-if="data.images && data.images.length > 0">
                <img
                    v-for="image in data.images"
                    :src="image.url"
                    :alt="data.title + `.` + image.id"
                    :key="image.id"
                />
            </div>
        </div>
        <Link :href="`/${data.slug}`">{{ data.title }}</Link>

        <div>{{ data.price }}</div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    data: Object,
});
</script>

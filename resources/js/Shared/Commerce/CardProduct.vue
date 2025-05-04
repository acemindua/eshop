<template>
    <div class="flex flex-col w-full h-full bg-white rounded-md">
        <div class="bg-slate-100 m-3 rounded-lg overflow-hidden">
            <ImageSwiper
                :images="images"
                :url="route('product.show', [item.slug, item.id])"
            />
        </div>
        <div class="relative grow px-4">
            <p class="text-sm text-gray-900 mb-0">
                <Link :href="route('product.show', [item.slug, item.id])">
                    {{ title }}
                </Link>
            </p>
        </div>
        <div class="p-4"></div>
    </div>
</template>

<script setup>
import ImageSwiper from "@/Components/ImageSwiper.vue";
import { computed } from "vue";

const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
});

const item = computed(() => (props.product.data ? props.product.data : []));

const title = computed(() => {
    const title = "";
    if (item.value.variant && item.value.variant.data.title) {
        return item.value.title + " (" + item.value.variant.data.title + ")";
    }
    return item.value.title;
});

const images = computed(() => {
    let list = item.value.images || [];

    if (item.value.image) {
        const result = [item.value.image[0], ...list];
        return result;
    }

    return list;
});
</script>

<style scope></style>

<template>
    <div
        class="w-full h-full rounded-lg flex flex-col space-y-2 text-sm p-2"
        :class="
            data.status
                ? 'bg-white text-gray-800 shadow'
                : 'bg-gray-50 text-slate-400'
        "
    >
        <div class="bg-gray-100 rounded-lg w-full h-60 mb-2 relative">
            <Link
                :href="`/${data.slug.product}${
                    data.slug.variant ? '/' + data.slug.variant : ''
                }`"
                class="flex items-center justify-center text-slate-300 overflow-hidden h-full"
            >
                <ImageViewSlider />
            </Link>
        </div>
        <Link
            class="grow"
            :href="`/${data.slug.product}${
                data.slug.variant ? '/' + data.slug.variant : ''
            }`"
        >
            <h4 class="px-3">{{ data.title }}</h4>
        </Link>
        <!--    <small class="px-3 text-xs text-slate-400">/{{ data.slug }}</small> -->
        <div class="flex items-center justify-between px-3">
            <span class="text-xl">{{ data.price }} $</span>
        </div>
        <span
            v-if="data.quantity > 0 && data.status"
            class="text-xs px-3 text-green-500"
        >
            {{ `${$t("In stock")}` }}
        </span>
    </div>
</template>

<script setup>
import ImageViewSlider from "./UI/ImageViewSlider.vue";

defineProps({
    data: {
        type: Object,
        requared: true,
        default: {},
    },
});
</script>

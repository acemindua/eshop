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
                :href="
                    route('product.show', {
                        productSlug: data.slug.product,
                        variantSlug: data.slug.variant,
                    })
                "
                class="flex items-center justify-center text-slate-300 overflow-hidden h-full"
            >
                <img
                    v-if="data.images && data.images.length"
                    :src="data.images[0].preview"
                    :alt="data.title"
                    class="w-[100%] h-auto object-cover object-center"
                />

                <div v-else>
                    <IconPhoto :stroke="1" :size="48" />
                    <p class="py-1 uppercase text-xs">{{ $t("No image") }}</p>
                </div>
            </Link>
        </div>

        <h4 class="grow px-3">{{ data.title }}</h4>
        <small class="px-3 text-xs text-slate-400">/{{ data.slug }}</small>
        <div class="flex items-center justify-between px-3">
            <span class="text-xl">{{ data.price }} $</span>
        </div>
        <span
            class="text-xs px-3"
            :class="data.status ? 'text-green-500' : 'text-slate-400'"
        >
            {{ data.status ? `${$t("in_stock")}` : `${$t("deactive")}` }}
        </span>
    </div>
</template>

<script setup>
import { IconPhoto } from "@tabler/icons-vue";

defineProps({
    data: {
        type: Object,
        requared: true,
        default: {},
    },
});
</script>

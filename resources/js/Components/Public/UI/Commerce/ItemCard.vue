<template>
    <div
        :class="[
            'bg-white border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md group',
            viewMode === 'list'
                ? 'flex flex-row h-48 md:h-56'
                : 'flex flex-col',
        ]"
    >
        <div
            :class="[
                'relative bg-gray-50 flex items-center justify-center shrink-0',
                viewMode === 'list'
                    ? 'w-40 md:w-64 h-full border-r'
                    : 'w-full aspect-square border-b',
            ]"
        >
            <div
                v-if="data.images && data.images.length > 0"
                class="w-full h-full p-2"
            >
                <img
                    :src="data.images[0].url"
                    :alt="data.title"
                    class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div v-else class="text-gray-300">
                <svg
                    class="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                </svg>
            </div>
        </div>

        <div class="p-4 flex flex-col justify-between flex-1 min-w-0">
            <div>
                <Link
                    :href="`/${data.slug}`"
                    class="text-sm md:text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2"
                >
                    {{ data.title }}
                </Link>

                <p
                    v-if="viewMode === 'list' && data.description"
                    class="mt-2 text-sm text-gray-500 line-clamp-3 hidden md:block"
                >
                    {{ data.description }}
                </p>
            </div>

            <div
                :class="[
                    'flex items-center justify-between',
                    viewMode === 'list' ? 'mt-4' : 'mt-auto pt-4',
                ]"
            >
                <div class="flex flex-col">
                    <span class="text-lg font-bold text-gray-900 leading-none">
                        {{ data.price }}
                        <small class="text-xs font-normal">₴</small>
                    </span>
                    <span
                        v-if="data.old_price && data.old_price > 0"
                        class="text-xs text-red-500 line-through"
                    >
                        {{ data.old_price }} ₴
                    </span>
                </div>

                <button
                    class="bg-gray-800 text-white p-2 rounded-lg hover:bg-black transition-colors"
                    title="Додати у кошик"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    data: Object,
    viewMode: {
        type: String,
        default: "grid",
    },
});
</script>

<style scoped>
/* Додаткові стилі за потреби */
</style>

<script setup>
import { Link } from "@inertiajs/vue3";
import BuyButton from "./BuyButton.vue";

defineProps({
    data: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div
        class="bg-white border border-gray-100 hover:border-gray-200 rounded-lg overflow-hidden relative group flex flex-col justify-between transition-all duration-300 h-full"
    >
        <div
            class="bg-gray-50 w-full aspect-square md:h-[300px] md:aspect-auto flex items-center justify-center overflow-hidden"
        >
            <img
                v-if="data.images?.length"
                :src="data.images[0].url"
                :alt="data.title"
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div
                v-else
                class="text-gray-300 flex items-center justify-center h-full"
            >
                <svg
                    class="w-12 h-12 stroke-[1.2]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
                    />
                </svg>
            </div>
        </div>

        <div
            class="p-2 flex flex-col space-y-2 flex-grow justify-between relative z-20 pointer-events-none"
        >
            <h3
                class="text-sm font-medium text-gray-800 transition-colors group-hover:text-brand group-hover:underline line-clamp-2 h-12"
            >
                {{ data.title }}
            </h3>

            <div
                class="flex items-center justify-between pt-2 min-h-[44px] pointer-events-auto"
            >
                <div class="flex flex-col justify-end">
                    <span
                        v-if="
                            data.old_price &&
                            Number(data.old_price) > Number(data.price)
                        "
                        class="text-xs text-gray-400 line-through leading-tight"
                    >
                        {{ data.old_price }}
                    </span>
                    <span
                        class="text-lg font-bold text-black font-['Exo_2'] leading-none"
                    >
                        {{ data.price }}
                    </span>
                </div>

                <BuyButton
                    :data="data"
                    class="scale-90 origin-right relative z-30"
                />
            </div>
        </div>

        <Link
            v-if="data.slug"
            :href="route('page.show', data.slug)"
            class="absolute inset-0 z-10"
            aria-label="Переглянути товар"
        ></Link>
    </div>
</template>

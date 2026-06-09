<script setup>
import { Link } from "@inertiajs/vue3";
import { IconStarFilled } from "@tabler/icons-vue";
import BuyButton from "./BuyButton.vue";
import { computed } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

// Безпечно вираховуємо кількість зображень, захищаючи від undefined/null
const imagesCount = computed(() => props.data?.images?.length || 0);
</script>

<template>
    <div
        class="border-b border-r overflow-hidden relative group flex flex-col justify-between transition-all duration-300 h-full p-4"
    >
        <template v-if="data">
            <div
                class="bg-gray-50 w-full aspect-square md:h-[300px] md:aspect-auto flex items-center justify-center overflow-hidden relative"
            >
                <div
                    v-if="
                        data.old_price &&
                        Number(data.old_price) > Number(data.price)
                    "
                    class="absolute top-2 left-2 z-30 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm"
                >
                    -{{
                        Math.round(
                            ((data.old_price - data.price) / data.old_price) *
                                100,
                        )
                    }}%
                </div>
                <template v-if="imagesCount > 0">
                    <img
                        :src="data.images[0].url"
                        :alt="data.title"
                        class="w-full h-full object-contain absolute inset-0 z-10 pointer-events-none transition-all duration-700 ease-in-out"
                        :class="{
                            relative: imagesCount === 1,
                            // Ефекти ховеру додаються лише якщо картинок 2 або більше
                            'group-hover:opacity-0 group-hover:scale-105':
                                imagesCount > 1,
                        }"
                    />

                    <img
                        v-if="imagesCount > 1"
                        :src="data.images[1].url"
                        :alt="data.title"
                        class="w-full h-full object-contain absolute inset-0 opacity-0 z-0 pointer-events-none transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105 group-hover:z-20"
                    />
                </template>

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
                class="p-2 flex flex-col flex-grow justify-between relative z-20 pointer-events-none"
            >
                <div class="flex flex-col space-y-1.5">
                    <div
                        class="flex items-center space-x-1 text-xs min-h-[18px]"
                    >
                        <template v-if="data.average_reviews?.count > 0">
                            <IconStarFilled
                                class="w-3.5 h-3.5 text-orange-400 flex-shrink-0"
                            />
                            <span class="font-bold text-gray-900 leading-none">
                                {{ data.average_reviews.rating }}
                            </span>
                            <span
                                class="text-gray-400 font-normal leading-none"
                            >
                                ({{ data.average_reviews.count }} відгуків)
                            </span>
                        </template>

                        <template v-else>
                            <IconStarFilled
                                class="w-3.5 h-3.5 text-gray-200 flex-shrink-0"
                            />
                            <span
                                class="text-gray-400 font-normal leading-none text-[11px]"
                            >
                                Залишити відгук
                            </span>
                        </template>
                    </div>

                    <h3
                        class="text-sm font-medium text-gray-800 transition-colors group-hover:text-brand group-hover:underline line-clamp-2 h-12"
                    >
                        {{ data.title }}
                    </h3>
                </div>

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
                            {{ $formatPrice(data.old_price) }}
                        </span>
                        <span
                            class="text-2xl font-bold text-black font-['Exo_2'] leading-none"
                        >
                            {{ $formatPrice(data.price) }}
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
        </template>

        <div
            v-else
            class="h-full w-full flex items-center justify-center text-gray-400"
        >
            Завантаження...
        </div>
    </div>
</template>

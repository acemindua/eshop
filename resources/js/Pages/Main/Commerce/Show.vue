<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useHead } from "@vueuse/head";
import { generateHeadMeta, formatPrice } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import ImageSwiperThumbs from "@/Components/Themes/Ecommerce/UI/ImageSwiperThumbs.vue";
import { IconCircleCheckFilled } from "@tabler/icons-vue";

const props = defineProps({
    data: Object,
});

// Основні дані
const item = computed(() => props.data.item?.data || {});
const variant = computed(() => props.data.variant?.data || null);

// Дані до відображення (якщо є варіант — він в пріоритеті)
const displayItem = computed(() => {
    if (variant.value) {
        return {
            ...item.value,
            ...variant.value,
            title: item.value.title,
            description: item.value.description,
            slug: item.value.slug,
            attributes: item.value.attributes,
        };
    }
    return item.value;
});

// Зображення
const images = computed(() => props.data.images);

// Форматована ціна
const formattedPrice = computed(() =>
    formatPrice(displayItem.value.price, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);

// Мета-теги
const headMeta = computed(() =>
    generateHeadMeta(displayItem.value, usePage().props.app.name)
);
useHead(headMeta);
</script>

<template>
    <MainLayout>
        <section>
            <div class="p-4 bg-white md:hidden">
                <h1 class="font-semibold">
                    {{ displayItem.title }}
                </h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 md:gap-2 relative">
                <!-- Зображення -->
                <div class="md:p-4 bg-white col-span-5">
                    <ImageSwiperThumbs :images="images" />
                </div>

                <!-- Інформація -->
                <div class="flex flex-col col-span-7">
                    <div class="p-4 md:p-8 bg-white rounded">
                        <div class="flex-col gap-2 hidden md:flex">
                            <h1 class="text-3xl font-semibold">
                                {{ displayItem.title }}
                            </h1>
                            <h4 class="text-gray-600">
                                {{ displayItem.description }}
                            </h4>
                        </div>

                        <div class="grid grid-cols-2 mt-4 text-xs">
                            <div class="flex">
                                <div
                                    v-if="
                                        parseInt(displayItem.quantity) > 0 &&
                                        displayItem.status
                                    "
                                    class="flex items-center space-x-2 bg-green-50 px-2 py-1 rounded-md border border-green-200 text-green-600"
                                >
                                    <IconCircleCheckFilled class="w-5 h-5" />
                                    <span>{{ $t("В наявності") }}</span>
                                </div>
                            </div>
                            <div class="text-gray-600 text-end">
                                {{ `${$t("Код")}: ${displayItem.sku}` }}
                            </div>
                        </div>
                    </div>

                    <!-- Варіанти -->
                    <div v-if="variant" class="p-4 md:p-8 bg-white my-2">
                        <div
                            v-for="(
                                variantAttr, index
                            ) in displayItem.attributes"
                            :key="index"
                        >
                            <h4 class="font-semibold mb-2">
                                {{ variantAttr.title }}
                            </h4>
                            <ul class="flex items-center space-x-3">
                                <li
                                    v-for="value in variantAttr.values"
                                    :key="value.id"
                                >
                                    <Link
                                        class="block p-2 border rounded-md px-4"
                                        :class="{
                                            'bg-gray-200 font-semibold border-black':
                                                displayItem.values?.slug ===
                                                value.slug,
                                            'hover:bg-gray-100':
                                                displayItem.values?.slug !==
                                                value.slug,
                                        }"
                                        :href="
                                            route('dynamic.route', {
                                                slug: displayItem.slug.product,
                                                optional: value.slug,
                                            })
                                        "
                                    >
                                        {{ value.title }}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Ціна -->
                    <div class="p-4 md:p-8 m-3 md:m-0 bg-white">
                        <div
                            class="flex items-end space-x-2 font-montserrat font-semibold"
                        >
                            <span class="text-4xl">{{ formattedPrice }}</span>
                            <span class="text-2xl">₴</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Debug -->
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="displayItem" />
        </section>
    </MainLayout>
</template>

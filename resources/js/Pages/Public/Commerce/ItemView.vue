<template>
    <SeoMeta />

    <section class="w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div class="lg:col-span-5 space-y-2">
                <div
                    class="bg-white border p-2 rounded-xl h-[500px] flex items-center justify-center overflow-hidden"
                >
                    <img
                        v-if="item.images?.length"
                        :src="item.images[0].url"
                        :alt="`${item.title} — головне фото`"
                        :title="item.title"
                        class="max-h-full object-contain"
                    />
                </div>

                <div class="flex flex-wrap rounded-xl gap-2">
                    <div
                        v-for="(img, index) in item.images"
                        :key="img.id || index"
                        class="w-24 h-24 border bg-white overflow-hidden flex items-center justify-center rounded-xl cursor-pointer hover:border-blue-500 transition"
                    >
                        <img
                            :src="img.url"
                            :alt="`${item.title} — фото ${index + 1}`"
                            :title="`${item.title} — вигляд ${index + 1}`"
                            class="max-h-full object-cover rounded-xl"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <div class="lg:col-span-4 space-y-6">
                <h1 class="font-bold text-3xl">{{ title }}</h1>
                <p class="text-gray-600">{{ item.description }}</p>

                <Link
                    :key="item.category.id"
                    :href="route('category.show', { slug: item.category.slug })"
                    :title="`Переглянути товари в категорії ${item.category.title}`"
                    class="hover:text-blue-600"
                >
                    {{ item.category.title }}
                </Link>
            </div>

            <div class="lg:col-span-3 lg:sticky lg:top-24">
                <div class="bg-white border p-6 rounded-xl shadow-sm space-y-4">
                    <div class="text-2xl font-bold">{{ item.price }} грн</div>
                    <button
                        class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                    >
                        Додати в кошик
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Layout from "@/Layouts/Public/Default/IndexLayout.vue";
import SeoMeta from "@/Components/SeoMeta.vue";
import { computed } from "vue";
import { Head } from "@inertiajs/vue3"; // Не забудьте імпорт Head

defineOptions({ layout: Layout });

const props = defineProps({
    data: { type: Object, required: true },
});

// Безпечне отримання даних
const item = computed(() => props.data?.item?.data || props.data?.item || {});
const title = computed(
    () => item.value?.seo?.title || item.value?.title || "Товар",
);
</script>

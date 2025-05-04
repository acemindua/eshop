<template>
    <Layout>
        <div class="py-4">
            <h1 class="font-semibold text-xl">{{ item.data.title }}</h1>
        </div>
        <div class="grid grid-cols-5 gap-1 my-4">
            <div class="col-span-2 bg-white p-2 rounded-md">
                <ImageSwiper :images="images" />
            </div>
            <div class="col-span-3 flex flex-col space-y-1">
                <div class="p-2 bg-white h-full rounded-md"></div>
                <div
                    class="p-2 bg-white h-full rounded-md"
                    v-if="variants.length"
                >
                    <ul class="grid grid-cols-4">
                        <li
                            v-for="variant in variants"
                            :key="variant.id"
                            class="p-1"
                        >
                            <Link
                                :href="
                                    route('product.show', [
                                        variant.slug,
                                        variant.id,
                                    ])
                                "
                                class="block bg-slate-200 border p-2 rounded-md relative"
                                :class="{
                                    'bg-blue-400': variant.id == selected.id,
                                }"
                            >
                                {{ variant.title }}

                                <div
                                    class="absolute w-12 h-12 -top-4 right-2 bg-white rounded-md shadow-md flex items-center justify-center p-2"
                                >
                                    <img
                                        :src="variant.image[0].preview"
                                        alt=""
                                        class="h-12 w-auto object-cover"
                                    />
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <section
            v-if="$page.props.app.env === 'local'"
            class="mx-auto max-w-7xl"
        >
            <VarDump :data="variants" />
        </section>
    </Layout>
</template>

<script setup>
import { computed, ref } from "vue";
import Layout from "@/Layouts/MainLayout.vue";
import ImageSwiper from "@/Components/ImageSwiper.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});

const item = computed(() => (props.data.item ? props.data.item : []));
const selected = ref(
    item.value.data.variants.find((el) => el.slug === item.value.data.slug)
);
const variants = computed(() => item.value.data.variants || []);
const images = computed(() => {
    let list = [];

    // Add images from item if they exist
    if (item.value.data.images) {
        list = [...item.value.data.images, ...list];
    }

    // Add the selected image if it exists
    if (selected.value && selected.value.image) {
        list = [selected.value.image[0], ...list];
    }

    return list;
});
</script>

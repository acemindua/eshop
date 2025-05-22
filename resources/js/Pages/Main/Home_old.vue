<template>
    <Layout>
        <!-- <div>
            <ul v-if="categories.length">
                <li v-for="category in categories" :key="category.id">
                    <Link :href="`/category__${category.slug}/`">
                        <span class="font-bold">{{ category.title }}</span>
                    </Link>

                    <CategoryTree
                        v-if="category.childs && category.childs.length"
                        :categories="category.childs"
                        class="p-2"
                    />
                </li>
            </ul>
        </div> -->

        <!--         <section class="mx-auto max-w-7xl mb-3">
            <h1 class="font-semibold p-4">Home</h1>
            <div class="flex">
                <div class="flex flex-col space-y-4 w-1/3">
                    <h2 class="font-bold mb-2 text-lime-600">
                        {{ $t("Categories") }}
                    </h2>

                    <ul v-if="categories.length">
                        <li v-for="category in categories" :key="category.id">
                            <span class="font-bold">{{ category.title }}</span>

                            <CategoryTree
                                v-if="category.childs && category.childs.length"
                                :categories="category.childs"
                                class="p-2"
                            />
                        </li>
                    </ul>
                </div>

                <div class="grid grid-cols-3 gap-3 w-full">
                    <div v-for="item in items" :key="item.id">
                        <CardProduct :data="item" />
                    </div>
                </div>
            </div>
        </section>

        <section class="mx-auto max-w-7xl mb-3">
            <hr />
            <h2 class="font-semibold mb-4">{{ $t("Manufacturers") }}</h2>

            <div class="flex gap-2">
                <ImageUploadPreview
                    v-for="item in manufacturers"
                    :key="item.id"
                    :src="item.image"
                    :title="item.title"
                    :config="imaConfig"
                />
            </div>
        </section>

       -->
        <div class="flex flex-col space-y-4 w-1/3">
            <h2 class="font-bold mb-2 text-lime-600">
                {{ $t("Categories") }}
            </h2>

            <ul v-if="categories.length">
                <li v-for="category in categories" :key="category.id">
                    <Link :href="`/category__${category.slug}/`">
                        <span class="font-bold">{{ category.title }}</span>
                    </Link>

                    <CategoryTree
                        v-if="category.childs && category.childs.length"
                        :categories="category.childs"
                        class="p-2"
                    />
                </li>
            </ul>
        </div>
        <div class="grid grid-cols-4 w-full gap-1">
            <div v-for="item in items" :key="item.id" class="relative">
                <CardProduct :product="item" />
            </div>
        </div>
        <section
            v-if="$page.props.app.env === 'local'"
            class="mx-auto max-w-7xl"
        >
            <VarDump :data="items" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/MainLayout.vue";
import CardProduct from "@/Shared/Commerce/CardProduct.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed } from "vue";
const props = defineProps({
    data: Object,
});

const categories = computed(() => {
    return props.data.categories.data || [];
});

const manufacturers = computed(() => {
    return props.data.manufacturers.data || [];
});

const items = computed(() => {
    return props.data.items || [];
});

const imaConfig = {
    width: 160,
    height: 160,
};
</script>

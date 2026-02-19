<script setup>
import LandingLayout from "@/Layouts/Public/Landing/Layout.vue";
import { Link } from "@inertiajs/vue3";
const props = defineProps({ products: Object, seo: Object });
</script>

<template>
    <LandingLayout :seo="seo">
        <section class="p-6 md:p-12 lg:p-20 border-b-[1px] border-black">
            <h1
                class="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter italic"
            >
                Fertilizer <br />
                <span class="text-gray-100 italic">Solutions</span>
            </h1>
        </section>

        <section
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black gap-[1px] border-b-[1px] border-black"
        >
            <div
                v-for="(product, index) in products.data"
                :key="product.id"
                class="bg-white p-10 group hover:bg-gray-50 transition-colors relative"
            >
                <span
                    class="text-[9px] font-bold absolute top-6 left-6 text-gray-300 italic tracking-widest"
                    >0{{ index + 1 }}</span
                >

                <div
                    class="aspect-[4/5] my-8 flex items-center justify-center grayscale"
                >
                    <img
                        :src="
                            product.images?.[0]?.preview ||
                            '/img/placeholder.png'
                        "
                        class="max-h-full object-contain"
                    />
                </div>

                <div class="space-y-4">
                    <h3
                        class="text-xl font-black uppercase italic tracking-tighter h-12 overflow-hidden"
                    >
                        {{ product.title }}
                    </h3>
                    <div
                        class="flex items-baseline justify-between pt-6 border-t-[1px] border-black"
                    >
                        <span class="text-lg font-black tracking-tighter"
                            >{{ product.price }} ₴</span
                        >
                        <Link
                            :href="`/${product.slug}`"
                            class="text-[9px] font-black uppercase tracking-widest underline underline-offset-4"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </LandingLayout>
</template>

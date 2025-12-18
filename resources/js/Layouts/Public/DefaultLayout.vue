<script setup>
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import FooterComponent from "@/Components/Public/FooterComponent.vue";
import HeaderComponent from "@/Components/Public/HeaderComponent.vue";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();
const currentLocale = computed(() => {
    return page.props?.config?.currentLocale || "en";
});

const isHomePage = computed(() => {
    const url = page.url;
    return /^\/(?:[a-z]{2}\/?)?$/.test(url);
});
</script>

<template>
    <div class="w-full h-full min-h-screen flex flex-col">
        <header class="sticky top-0 z-50 bg-white">
            <div class="mx-auto container">
                <HeaderComponent :locale="currentLocale" />
            </div>
        </header>

        <main class="flex-grow">
            <div class="mx-auto container">
                <div v-if="!isHomePage" class="capitalize border-b py-2">
                    <Breadcrumbs />
                </div>
                <div class="">
                    <slot />
                </div>
            </div>
        </main>
        <footer>
            <div class="mx-auto container">
                <FooterComponent :locale="currentLocale" />
            </div>
        </footer>
    </div>
</template>

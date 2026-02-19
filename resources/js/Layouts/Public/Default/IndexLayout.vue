<template>
    <Head>
        <title>{{ settings ? settings?.site_tagline : "" }}</title>
    </Head>
    <div class="w-full min-h-screen flex flex-col">
        <!--header-->
        <header class="sticky top-0 z-50 bg-white">
            <div class="mx-auto container">
                <NavComponent :locale="currentLocale" />
            </div>
        </header>

        <!--main-->
        <main class="flex-grow">
            <div class="mx-auto container">
                <div
                    v-if="!isHomePage && $page.props?.breadcrumbs?.length"
                    class="pt-4 px-2"
                >
                    <Breadcrumbs />
                </div>
                <div class="py-4 px-2">
                    <slot />
                </div>
            </div>
        </main>

        <div class="h-screen" />

        <!--footer-->
        <footer>
            <div class="mx-auto container">
                <FooterComponent :locale="currentLocale" />
            </div>
        </footer>

        <VarDump :data="$page.props || {}" />
    </div>
</template>

<script setup>
import VarDump from "@/Shared/VarDump.vue";
import FooterComponent from "@/Components/Public/FooterComponent.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import NavComponent from "@/Components/Public/NavComponent.vue";
import ButtonCatalog from "@/Components/Public/UI/Buttons/ButtonCatalog.vue";

const page = usePage();
const currentLocale = computed(() => {
    return page.props?.config?.currentLocale || "en";
});
const settings = computed(() => {
    return page.props?.settings || {};
});

const isHomePage = computed(() => {
    const url = page.url;
    return /^\/(?:[a-z]{2}\/?)?$/.test(url);
});
</script>

<template>
    <div class="w-full h-full min-h-screen flex flex-col bg-gray-100">
        <header class="border-b bg-white sticky top-0 z-50">
            <!-- <div class="flex py-2 border-b bg-gray-100 px-4">
                <div class="w-full max-w-7xl mx-auto">
                    <LocaleSwicher />
                </div>
            </div> -->
            <div class="w-full max-w-7xl mx-auto px-4 py-2">
                <HeaderComponent :data="responseData" />
            </div>
        </header>

        <nav>
            <div class="w-full max-w-7xl mx-auto px-4">
                <Navigations :data="responseData" />
            </div>
            <div
                v-if="!route().current('home')"
                class="w-full max-w-7xl mx-auto px-4 py-4"
            >
                <Breadcrumbs />
            </div>
        </nav>
        <main class="grow">
            <div class="grow w-full max-w-7xl mx-auto md:px-4">
                <slot />
            </div>
        </main>
        <footer class="border-t bg-gray-100 text-slate-800">
            <div class="w-full max-w-7xl mx-auto px-4">
                <FooterComponent :data="responseData" />
            </div>
        </footer>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";

import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import HeaderComponent from "@/Components/Themes/Main/HeaderComponent.vue";
import Navigations from "@/Components/Themes/Main/Navigations.vue";
import LocaleSwicher from "@/Components/Themes/Main/LocaleSwicher.vue";

// Отримання глобальних даних з props
const { props } = usePage();
const responseData = computed(() => props.responseData || {});
</script>

<template>
    <div class="w-full h-full min-h-screen flex flex-col bg-gray-100">
        <header>
            <div class="w-full max-w-7xl mx-auto">
                <HeaderComponent :data="responseData" />
            </div>
        </header>

        >
        <nav>
            <div class="w-full max-w-7xl mx-auto">
                <Navigations :data="responseData" />
            </div>
            <div
                v-if="!route().current('home')"
                class="w-full max-w-7xl mx-auto py-4"
            >
                <Breadcrumbs />
            </div>
        </nav>
        <main>
            <div class="grow w-full max-w-7xl mx-auto">
                <slot />
            </div>
        </main>
        <footer>
            <div class="w-full max-w-7xl mx-auto border-t">
                <FooterComponent :data="responseData" />
            </div>
        </footer>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { usePage, Head } from "@inertiajs/vue3";

import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import HeaderComponent from "@/Components/Themes/Main/HeaderComponent.vue";
import Navigations from "@/Components/Themes/Main/Navigations.vue";

// Отримання глобальних даних з props
const { props } = usePage();
const responseData = computed(() => props.responseData || {});
const locales = computed(() => props.lang?.locales || {});
</script>

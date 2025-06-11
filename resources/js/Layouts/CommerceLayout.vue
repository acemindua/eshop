<template>
    <div class="flex flex-col w-full h-full min-h-screen bg-gray-100">
        <header class="bg-white">
            <div class="container mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    class="flex items-center space-x-4 md:mr-8 w-full max-w-xl"
                >
                    <ApplicationLogo
                        class="block h-11 w-auto fill-current text-[#368D02]"
                    />
                    <p class="hidden md:block font-semibold">
                        <span>{{ $page.props.app.name }}</span>
                    </p>
                </Link>
            </div>
        </header>

        <main class="grow h-full w-full">
            <slot />
        </main>

        <footer><FooterComponent /></footer>
    </div>
</template>

<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import { Link, usePage } from "@inertiajs/vue3";
import { inject, onMounted } from "vue";

// Підключення cartStore
const cartStore = inject("cartStore");
const { props } = usePage();

// Завантажити дані при монтуванні
onMounted(() => {
    cartStore?.fetchCart?.();
});
</script>

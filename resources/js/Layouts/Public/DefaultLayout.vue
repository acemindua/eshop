<script setup>
import { Head, Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import LangSwitcher from "@/Components/Public/LangSwitcher.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CartButton from "@/Components/Public/Commerce/CartButton.vue";
import VarDump from "@/Shared/VarDump.vue";
import UserLoginRegisterForm from "@/Components/Public/UserLoginRegisterForm.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";

const page = usePage();

const title = computed(() => {
    const breadcrumbs = page.props.breadcrumbs;
    return breadcrumbs?.length
        ? (breadcrumbs[breadcrumbs.length - 1]?.title ?? "Home")
        : "Home";
});

const currentYear = new Date().getFullYear();

const isHomePage = computed(() => {
    const url = page.url;
    return /^\/(?:[a-z]{2}\/?)?$/.test(url);
});
</script>

<template>
    <Head
        :title="
            page.props.app?.name ? `${title} - ${page.props.app.name}` : title
        "
    />

    <div class="flex flex-col min-h-screen bg-white">
        <div class="bg-white border-b border-gray-100">
            <nav
                class="container mx-auto px-4 border-x py-2"
                aria-label="Utility navigation"
            >
                <LangSwitcher />
            </nav>
        </div>

        <header
            class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm"
        >
            <div class="container mx-auto px-4 border-x">
                <div class="flex items-center justify-between py-3">
                    <div class="flex items-center gap-2">
                        <Link
                            href="/"
                            class="flex items-center gap-2 group outline-none"
                        >
                            <ApplicationLogo
                                class="w-10 h-10 bg-brand fill-current transition-transform group-hover:scale-105"
                            />
                            <span
                                class="hidden md:block text-lg font-bold text-gray-800"
                            >
                                {{ page.props.app?.name }}
                            </span>
                        </Link>
                    </div>

                    <div class="flex items-center gap-4">
                        <UserLoginRegisterForm />
                        <CartButton />
                    </div>
                </div>
            </div>
        </header>

        <main class="flex-grow container mx-auto px-4 border-x bg-white">
            <div class="flex flex-col pb-8">
                <nav
                    v-if="!isHomePage && page.props?.breadcrumbs?.length"
                    class="py-4"
                    aria-label="Breadcrumb"
                >
                    <Breadcrumbs />
                </nav>

                <slot />
            </div>
        </main>

        <section
            v-if="page.props.app?.mode === 'local'"
            class="container mx-auto px-4 py-8 border-x bg-gray-50"
        >
            <VarDump :data="$page" />
        </section>

        <footer class="py-8 border-t border-gray-200 bg-gray-50">
            <div class="container mx-auto px-4">
                <div
                    class="flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <Link href="/" class="outline-none">
                        <ApplicationLogo
                            class="w-8 h-8 bg-brand fill-current"
                        />
                    </Link>
                    <p class="text-sm text-gray-500">
                        &copy; {{ currentYear }} {{ page.props.app?.name }}.
                        {{ $t("All rights reserved.") }}
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

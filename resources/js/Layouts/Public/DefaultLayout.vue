<script setup>
import { Head, Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import LangSwitcher from "@/Components/Public/LangSwitcher.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CartButton from "@/Components/Public/Commerce/CartButton.vue";
import VarDump from "@/Shared/VarDump.vue";
import UserLoginRegisterForm from "@/Components/Public/UserLoginRegisterForm.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import AppNavigations from "@/Components/AppNavigations.vue";
const page = usePage();

// Безпечне отримання заголовку сторінки
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

    <div
        class="w-full min-h-screen flex flex-col justify-between"
    >
        <!-- <div class="bg-gray-100">
            <div class="container mx-auto px-4">
                <div
                    class="flex items-center justify-between w-full "
                >
                    <AppNavigations
                        :slug="`header`"
                        :locale="$page.props?.config?.currentLocale || 'en'"
                    />
                   
                </div>
            </div>
        </div> -->
        <div>
            <header class="py-3 border-b border-gray-100 bg-white">
                <div class="container mx-auto px-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Link
                                href="/"
                                class="flex items-center gap-2 group"
                            >
                                <ApplicationLogo
                                    class="w-10 h-10 bg-brand fill-current transition-transform"
                                />
                                <span
                                    class="hidden md:block text-lg font-bold text-gray-800"
                                >
                                    {{ page.props.app?.name }}
                                </span>
                            </Link>
                            <lang-switcher />
                        </div>

                        <div class="flex items-center gap-4">
                            <user-login-register-form />
                            <cart-button />
                        </div>
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-4 py-6">
                <div class="flex flex-col space-y-4">
                    <div v-if="!isHomePage && $page.props?.breadcrumbs?.length">
                        <Breadcrumbs />
                    </div>

                    <slot />
                </div>
            </main>
        </div>

        <div
            v-if="page.props.app?.mode === 'local'"
            class="container mx-auto px-4 my-4 opacity-70"
        >
            <VarDump :data="$page" />
        </div>

        <footer class="py-6 border-t border-gray-200 bg-gray-50 mt-auto">
            <div class="container mx-auto px-4">
                <div
                    class="flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <Link href="/" class="flex items-center gap-2">
                        <ApplicationLogo
                            class="w-8 h-8 bg-brand fill-current"
                        />
                    </Link>
                    <div class="text-sm text-gray-500">
                        &copy; {{ currentYear }} {{ page.props.app?.name }}. All
                        rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

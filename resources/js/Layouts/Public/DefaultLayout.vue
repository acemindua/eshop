<script setup>
import { Head, Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import LangSwitcher from "@/Components/Public/LangSwitcher.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CartButton from "@/Components/Public/Commerce/CartButton.vue";
import VarDump from "@/Shared/VarDump.vue";
import PopularProducts from "@/Pages/Public/Commerce/Components/PopularProducts.vue";

const page = usePage();

// Безпечне отримання заголовку сторінки
const title = computed(() => {
    const breadcrumbs = page.props.breadcrumbs;
    return breadcrumbs?.length
        ? (breadcrumbs[breadcrumbs.length - 1]?.title ?? "Home")
        : "Home";
});
const currentYear = new Date().getFullYear();
</script>

<template>
    <Head
        :title="
            page.props.app?.name ? `${title} - ${page.props.app.name}` : title
        "
    />

    <div class="bg-white w-full min-h-screen flex flex-col justify-between">
        <div>
            <header class="py-2 border-b border-gray-100">
                <div class="container mx-auto px-4">
                    <div class="flex items-center justify-between">
                        <Link href="/" class="flex items-center gap-2 group">
                            <ApplicationLogo
                                class="w-10 h-10 bg-brand fill-current transition-transform"
                            />
                            <span
                                class="text-lg font-bold uppercase text-gray-800"
                            >
                                {{ page.props.app?.name }}
                            </span>
                        </Link>

                        <div class="flex items-center gap-3">
                            <CartButton />
                            <LangSwitcher />
                        </div>
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-4 py-6">
                <div>
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
                        <span class="text-lg font-bold uppercase text-gray-750">
                            {{ page.props.app?.name }}
                        </span>
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

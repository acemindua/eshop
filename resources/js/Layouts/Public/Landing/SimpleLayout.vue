<template>
    <div class="flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2">
        <header class="bg-white p-4">
            <div class="w-full mx-auto">
                <nav
                    class="inline-flex gap-4 justify-between items-center w-full px-4"
                >
                    <Link
                        href="/"
                        class="flex items-center gap-2 shrink-0 group md:pr-12"
                    >
                        <div class="">
                            <ApplicationLogo
                                class="w-10 h-10 bg-brand fill-current"
                            />
                        </div>

                        <span class="font-semibold hidden md:block">{{
                            $page.props?.app?.name
                        }}</span>
                    </Link>
                    <div class="hidden md:flex items-center gap-4">
                        <lang-switcher />
                    </div>
                </nav>
            </div>
        </header>
        <main><slot /></main>
        <footer></footer>
    </div>
</template>

<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import LangSwitcher from "@/Components/Public/LangSwitcher.vue";
</script>

<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import LocaleSwicher from "@/Components/LocaleSwicher.vue";
import LoginRegisterFormModal from "@/Shared/Profile/LoginRegisterFormModal.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
</script>

<template>
    <div class="bg-gray-100 w-full min-h-screen flex flex-col">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto">
                <div class="py-4">
                    <div class="flex w-full items-center space-x-8 text-sm">
                        <Link :href="`/`">
                            <ApplicationLogo
                                class="block h-9 w-auto fill-current text-red-600"
                            />
                        </Link>
                        <div class="flex items-center justify-between w-full">
                            <ul class="flex items-center space-x-4">
                                <li>
                                    <Link :href="`/`"> {{ $t("Home") }} </Link>
                                </li>
                            </ul>
                            <ul class="flex items-center space-x-4">
                                <li><LoginRegisterFormModal /></li>
                                <li><LocaleSwicher /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <nav>
            <div class="max-w-7xl mx-auto">
                <div class="py-4">nav</div>
            </div>
        </nav>

        <main class="grow">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col">
                    <div class=""><Breadcrumbs /></div>
                    <div class=""><slot /></div>
                </div>
            </div>
        </main>

        <footer class="bg-slate-100">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between py-4">
                    <div class="text-xs">
                        ©{{ $page.props.app.year }} {{ $page.props.app.name }}.
                        All rights reserved.
                    </div>
                    <ul class="flex items-center gap-x-2 text-xs">
                        <li>GLOBAL</li>
                        <li
                            v-for="(lang, index) in $page.props.lang.locales"
                            :key="index"
                        >
                            <Link :href="route('home')">
                                <flag
                                    :iso="lang.flag"
                                    :title="lang.native"
                                    class="rounded-full text-xl"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>

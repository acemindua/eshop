<script setup>
import AdminSidebar from "@/Components/Admin/AdminSidebar.vue";
import UserSmallCard from "@/Components/UserSmallCard.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import { usePage } from "@inertiajs/vue3";
import { IconChevronLeft } from "@tabler/icons-vue";
import { computed, ref } from "vue";
import AlertMessage from "@/Components/AlertMessage.vue";

// Get the page data and current year
const page = usePage();
const currentYear = new Date().getFullYear();

// Get the page title from breadcrumbs or default to 'Dashboard'
const title = computed(() => {
    const breadcrumbs = page.props.breadcrumbs;
    return breadcrumbs?.length
        ? breadcrumbs[breadcrumbs.length - 1]?.title ?? "Dashboard"
        : "Dashboard";
});

// Track visibility of the aside panels
const isSidebarVisible = ref(true);
const isSecondarySidebarVisible = ref(true);
</script>

<template>
    <Head :title="title" />

    <!-- Background overlay for mobile when the sidebar is visible -->
    <div
        v-if="!isSidebarVisible"
        @click="isSidebarVisible = true"
        class="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
    />

    <div
        class="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 w-full min-h-screen"
    >
        <div class="flex w-full h-full relative">
            <!-- Sidebar -->
            <aside
                class="border-r dark:border-slate-800 dark:shadow-2xl"
                :class="[
                    isSidebarVisible
                        ? 'hidden md:flex'
                        : 'flex absolute h-full',
                ]"
            >
                <Transition name="sidebar-slide-fade">
                    <div
                        class="bg-gray-50 dark:bg-slate-900 p-2 flex flex-col z-[60]"
                    >
                        <AdminSidebar />
                    </div>
                </Transition>

                <!-- Secondary Sidebar (optional content) -->
                <Transition name="sidebar-slide-fade">
                    <div
                        v-if="$slots.sidenav"
                        v-show="isSecondarySidebarVisible"
                        class="w-60 border-l dark:border-slate-800 bg-white dark:bg-slate-900 z-50 p-4"
                    >
                        <slot name="sidenav" />
                    </div>
                </Transition>
            </aside>

            <!-- Main content area -->
            <div class="flex flex-col w-full h-screen overflow-y-auto">
                <!-- Header -->
                <header
                    class="text-xs text-gray-600 dark:text-slate-300 dark:border-slate-700 border-b"
                >
                    <div class="px-2 md:px-4 lg:px-8">
                        <div
                            class="flex justify-between items-center space-x-2"
                        >
                            <div class="flex items-center">
                                <!-- Mobile burger menu -->
                                <button
                                    @click.prevent="
                                        isSidebarVisible = !isSidebarVisible
                                    "
                                    class="group inline-flex md:hidden p-2 text-slate-800 items-center justify-center rounded transition"
                                >
                                    <span class="sr-only">Menu</span>
                                    <svg
                                        class="w-6 h-6 fill-current pointer-events-none"
                                        viewBox="0 0 16 16"
                                    >
                                        <rect
                                            class="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 group-[aria-pressed=true]:translate-x-0 group-[aria-pressed=true]:translate-y-0 group-[aria-pressed=true]:rotate-[315deg]"
                                            y="7"
                                            width="9"
                                            height="2"
                                            rx="1"
                                        />
                                        <rect
                                            class="origin-center transition-all duration-300 group-[aria-pressed=true]:rotate-45"
                                            y="7"
                                            width="16"
                                            height="2"
                                            rx="1"
                                        />
                                        <rect
                                            class="origin-center translate-y-[5px] transition-all duration-300 group-[aria-pressed=true]:translate-y-0 group-[aria-pressed=true]:rotate-[135deg]"
                                            y="7"
                                            width="9"
                                            height="2"
                                            rx="1"
                                        />
                                    </svg>
                                </button>

                                <!-- Toggle 2nd sidebar -->
                                <button
                                    @click.prevent="
                                        isSecondarySidebarVisible =
                                            !isSecondarySidebarVisible
                                    "
                                    class="hidden md:flex border dark:border-gray-800 transition hover:bg-gray-200 dark:hover:bg-slate-900 rounded-lg p-2"
                                >
                                    <IconChevronLeft
                                        :stroke="2"
                                        :class="[
                                            isSecondarySidebarVisible
                                                ? ''
                                                : 'rotate-180',
                                        ]"
                                    />
                                </button>

                                <div class="p-2">
                                    <h1
                                        class="font-semibold text-gray-800 dark:text-slate-300 text-base"
                                    >
                                        {{ title }}
                                    </h1>
                                    <Breadcrumbs />
                                </div>
                            </div>

                            <UserSmallCard :data="$page.props.auth.user" />
                        </div>
                    </div>
                </header>

                <!-- Main content -->
                <main class="flex-grow py-4">
                    <AlertMessage />
                    <div class="px-2 md:px-4 lg:px-8">
                        <Transition name="slot-fade" mode="out-in" appear>
                            <div>
                                <slot />
                            </div>
                        </Transition>
                    </div>
                </main>

                <!-- Footer -->
                <footer
                    class="text-xs text-gray-600 dark:text-slate-400 border-t dark:border-slate-700 py-4"
                >
                    <div class="px-2 md:px-4 lg:px-8">
                        <p
                            class="text-center md:text-end"
                            v-html="
                                `&copy; ${currentYear} ${$page.props.app.name}. Version ${$page.props.app.version}`
                            "
                        ></p>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Sidebar slide-in/out animation */
.sidebar-slide-fade-enter-active,
.sidebar-slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.sidebar-slide-fade-enter-from,
.sidebar-slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
.sidebar-slide-fade-enter-to,
.sidebar-slide-fade-leave-from {
    opacity: 1;
    transform: translateX(0);
}

/* Slot fade animation */
.slot-fade-enter-active,
.slot-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.slot-fade-enter-from,
.slot-fade-leave-to {
    opacity: 0;
    transform: translateY(10%);
}
.slot-fade-enter-to,
.slot-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>

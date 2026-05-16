<script setup>
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import { usePage, Head } from "@inertiajs/vue3";
import { IconChevronLeft, IconLogout } from "@tabler/icons-vue";
import { computed, ref } from "vue";
import AlertMessage from "@/Components/AlertMessage.vue";
import AdminSidebar from "@/Shared/AdminSidebar.vue";

// Синхронізація видимості сайдбару з батьківським компонентом
const isSidebarVisible = defineModel("isSidebarVisible", { default: true });
const isSecondarySidebarVisible = ref(true);

const page = usePage();
const currentYear = new Date().getFullYear();

const title = computed(() => {
    const breadcrumbs = page.props.breadcrumbs;
    return breadcrumbs?.length
        ? (breadcrumbs[breadcrumbs.length - 1]?.title ?? "Dashboard")
        : "Dashboard";
});
</script>

<template>
    <div
        v-if="!isSidebarVisible"
        @click="isSidebarVisible = true"
        class="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
    />

    <div
        class="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 w-full min-h-screen"
    >
        <div class="flex w-full h-full relative">
            <aside
                class="border-r dark:border-slate-800 dark:shadow-2xl"
                :class="[
                    isSidebarVisible
                        ? 'hidden md:flex relative'
                        : 'flex absolute h-full',
                ]"
            >
                <Transition name="sidebar-slide-fade">
                    <div
                        class="bg-gray-50 dark:bg-slate-900 flex flex-col z-[60]"
                    >
                        <AdminSidebar />
                    </div>
                </Transition>

                <button
                    @click.prevent="
                        isSecondarySidebarVisible = !isSecondarySidebarVisible
                    "
                    class="bg-white dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-150 absolute z-[60] top-11 -right-3 w-6 h-6 border dark:border-slate-600 rounded-full flex items-center justify-center"
                >
                    <IconChevronLeft
                        :size="16"
                        :stroke="1.5"
                        :class="[isSecondarySidebarVisible ? '' : 'rotate-180']"
                    />
                </button>

                <Transition name="sidebar-slide-fade">
                    <div
                        v-if="$slots.sidenav"
                        v-show="isSecondarySidebarVisible"
                        class="w-[200px] border-l dark:border-slate-800 bg-white dark:bg-slate-900 z-50 relative"
                    >
                        <slot name="sidenav" />
                    </div>
                </Transition>
            </aside>

            <div class="flex flex-col w-full h-screen overflow-y-auto">
                <header
                    class="w-full h-14 border-b text-xs text-gray-600 dark:text-slate-300 dark:border-slate-700"
                >
                    <div class="px-2 md:px-4 lg:px-8 h-full">
                        <div
                            class="flex justify-between items-center h-full space-x-2 border-l border-r"
                        >
                            <div class="flex items-center">
                                <button
                                    @click.prevent="
                                        isSidebarVisible = !isSidebarVisible
                                    "
                                    class="group inline-flex md:hidden p-2 text-slate-800 dark:text-slate-200 items-center justify-center rounded transition"
                                >
                                    <svg
                                        class="w-6 h-6 fill-current"
                                        viewBox="0 0 16 16"
                                    >
                                        <rect
                                            class="origin-center"
                                            y="3"
                                            width="16"
                                            height="2"
                                            rx="1"
                                        />
                                        <rect
                                            class="origin-center"
                                            y="7"
                                            width="16"
                                            height="2"
                                            rx="1"
                                        />
                                        <rect
                                            class="origin-center"
                                            y="11"
                                            width="16"
                                            height="2"
                                            rx="1"
                                        />
                                    </svg>
                                </button>

                                <div class="p-2 ml-2">
                                    <h1
                                        class="font-semibold text-gray-800 dark:text-slate-300 text-base"
                                    >
                                        {{ title }}
                                    </h1>
                                    <Breadcrumbs />
                                </div>
                            </div>
                            <Link
                                v-tooltip="{
                                    content: $t('Log out'),
                                    placement: 'bottom',
                                }"
                                method="post"
                                href="/logout"
                                class="px-4 hover:text-gray-800 duration-150"
                                ><IconLogout stroke="{2}"
                            /></Link>
                        </div>
                    </div>
                </header>

                <main class="flex-grow">
                    <AlertMessage />
                    <div class="px-2 md:px-4 lg:px-8 w-full h-full">
                        <Transition name="slot-fade" mode="out-in" appear>
                            <div class="border-l border-r h-full p-4">
                                <slot />
                            </div>
                        </Transition>
                    </div>
                </main>

                <footer
                    class="text-xs text-gray-600 dark:text-slate-400 border-t dark:border-slate-700"
                >
                    <div class="px-2 md:px-4 lg:px-8">
                        <p
                            class="text-center md:text-end border-l border-r h-full p-4"
                        >
                            &copy; {{ currentYear }} {{ $page.props.app.name }}.
                            Version {{ $page.props.app.version }}
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Стилі анімацій залишаються без змін */
.sidebar-slide-fade-enter-active,
.sidebar-slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.sidebar-slide-fade-enter-from,
.sidebar-slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
.slot-fade-enter-active,
.slot-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.slot-fade-enter-from,
.slot-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>

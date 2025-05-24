<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";

// Іконки
import {
    IconMessageCircle,
    IconSettings,
    IconShoppingCart,
} from "@tabler/icons-vue";

// Компоненти
import AlertMessage from "@/Components/AlertMessage.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import UserAvatar from "@/Components/UserAvatar.vue";

// Спільні компоненти
import AppAsideButton from "@/Shared/Themes/App/Components/AppAsideButton.vue";

const page = usePage();

const user = computed(() => ({
    ...(page.props.auth.user || {}),
    online: true,
}));

const title = computed(() => {
    const breadcrumbs = page.props.breadcrumbs || [];
    return breadcrumbs.at(-1)?.title || "";
});
</script>

<template>
    <Head :title="title" />

    <div class="bg-gray-100 dark:bg-slate-900 w-full min-h-screen flex">
        <div class="hidden md:flex">
            <!-- Sidebar -->
            <aside
                class="bg-white text-slate-900 min-h-screen flex flex-col border-r py-4 px-2"
            >
                <Link
                    :href="route('admin.dashboard')"
                    class="flex justify-center items-center bg-slate-800 w-10 h-10 rounded-lg text-white p-1"
                >
                    <ApplicationLogo class="h-7 w-auto fill-current" />
                </Link>

                <!-- Main nav buttons -->
                <nav
                    class="flex flex-col items-center flex-grow py-6 space-y-2"
                >
                    <AppAsideButton
                        :href="route('admin.orders.index')"
                        :active="$page.url.startsWith('/commerce')"
                    >
                        <IconShoppingCart :stroke="1" class="w-6 h-6" />
                    </AppAsideButton>
                    <AppAsideButton
                        :href="route('admin.chat.rooms')"
                        :active="$page.url.startsWith('/messages')"
                    >
                        <IconMessageCircle :stroke="1" class="w-6 h-6" />

                        <span
                            class="text-xs bg-orange-600 text-white font-semibold w-4 h-4 shadow-sm absolute bottom-1 right-1 rounded-full text-center"
                        >
                            5
                        </span>
                    </AppAsideButton>
                </nav>

                <!-- Bottom nav -->
                <div class="flex flex-col items-center space-y-4">
                    <AppAsideButton
                        v-if="can('setting-view') || is('super-user')"
                        :href="route('admin.settings.index')"
                        :active="$page.url.startsWith('/settings')"
                    >
                        <IconSettings :stroke="1" class="w-6 h-6" />
                    </AppAsideButton>
                    <Link :href="route('admin.users.edit', user)">
                        <UserAvatar :data-user="user" :max-width="34" />
                    </Link>
                </div>
            </aside>

            <!-- Side navigation slot -->
            <aside
                v-if="$slots.sidenav"
                class="flex flex-col p-4 border-r bg-white w-64"
            >
                <slot name="sidenav" />
            </aside>
        </div>

        <!-- Main content -->
        <div class="flex flex-col flex-grow h-screen overflow-x-auto">
            <!-- Header -->
            <header
                class="flex items-start justify-between px-4 py-4 md:px-8 mb-4"
            >
                <div v-if="!route().current('admin.dashboard')">
                    <h1 class="font-semibold text-xl">
                        {{ title !== "Dashboard" ? $t(title) : "Dashboard" }}
                    </h1>
                    <Breadcrumbs class="mt-1" />
                </div>
                <div></div>
                <div class="flex items-center space-x-2">
                    <AppAsideButton
                        :href="route('admin.chat.rooms')"
                        :active="$page.url.startsWith('/messages')"
                    >
                        <IconMessageCircle :stroke="1" class="w-6 h-6" />

                        <span
                            class="text-xs bg-orange-600 text-white font-semibold w-4 h-4 shadow-sm absolute bottom-1 right-1 rounded-full text-center"
                        >
                            5
                        </span>
                    </AppAsideButton>

                    <Link :href="route('admin.users.edit', user)">
                        <UserAvatar :data-user="user" :max-width="34" />
                    </Link>
                </div>
            </header>

            <!-- Page content -->
            <main class="flex-grow px-4 md:px-8">
                <slot />
            </main>

            <!-- Footer -->
            <footer class="mt-4 md:mt-8">
                <AlertMessage />
            </footer>
        </div>
    </div>
</template>

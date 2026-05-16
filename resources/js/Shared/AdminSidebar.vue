<template>
    <div class="flex flex-col w-full h-full">
        <Link
            :href="route('admin.dashboard')"
            class="flex justify-center items-center border-b h-14 w-14 p-2"
        >
            <ApplicationLogo class="w-full h-full bg-brand" />
        </Link>

        <nav class="flex flex-col items-center flex-grow py-6 space-y-2">
            <AdminNavButton
                v-tooltip="{
                    content: $t('Dashboard'),
                    placement: 'right',
                }"
                :href="route('admin.dashboard')"
                :active="
                    $page.component === 'Admin/Dashboard/Index' ||
                    $page.url.startsWith('/users') ||
                    $page.url.startsWith('/pages') ||
                    $page.url.startsWith('/menus')
                "
            >
                <component
                    :is="
                        $page.component === 'Admin/Dashboard/Index' ||
                        $page.url.startsWith('/users') ||
                        $page.url.startsWith('/pages') ||
                        $page.url.startsWith('/menus')
                            ? IconLayoutDashboardFilled
                            : IconLayoutDashboard
                    "
                    :stroke="1"
                    class="w-6 h-6"
                />
            </AdminNavButton>
            <AdminNavButton
                v-tooltip="{
                    content: $t('Commerce'),
                    placement: 'right',
                }"
                :href="route('admin.commerce.orders.index')"
                :active="$page.url.startsWith('/commerce')"
            >
                <component
                    :is="
                        $page.url.startsWith('/commerce')
                            ? IconShoppingCartFilled
                            : IconShoppingCart
                    "
                    :stroke="1"
                    class="w-6 h-6"
                />
            </AdminNavButton>

            <AdminNavButton
                v-tooltip="{
                    content: $t('Messages'),
                    placement: 'right',
                }"
                :href="route('admin.dashboard')"
                :active="false"
            >
                <IconMessageCircle :stroke="1" class="w-6 h-6" />
            </AdminNavButton>
        </nav>

        <div class="flex flex-col items-center space-y-4 py-2">
            <AdminNavButton
                v-tooltip="{
                    content: $t('Settings'),
                    placement: 'right',
                }"
                :href="route('admin.settings.index')"
                :active="$page.url.startsWith('/settings')"
            >
                <IconSettings :stroke="1" class="w-6 h-6" />
            </AdminNavButton>
        </div>
    </div>
</template>

<script setup>
import {
    IconLayoutDashboard,
    IconLayoutDashboardFilled,
    IconMessageCircle,
    IconSettings,
    IconShoppingBag,
    IconShoppingCart,
    IconShoppingCartFilled,
} from "@tabler/icons-vue";
import { Link } from "@inertiajs/vue3"; // Переконайтеся, що Link імпортовано
import AdminNavButton from "@/Components/UI/Buttons/Admin/AdminNavButton.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

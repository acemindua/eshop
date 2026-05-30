<template>
    <div class="flex flex-col w-full h-full">
        <Link
            :href="route('admin.dashboard')"
            class="flex justify-center items-center border-b border-slate-700 h-14 w-14 p-2"
        >
            <ApplicationLogo class="w-full h-full bg-brand" />
        </Link>

        <nav
            class="flex flex-col items-center justify-center flex-grow py-6 space-y-2"
        >
            <AdminNavButton
                v-tooltip="{
                    content: $t('Dashboard'),
                    placement: 'right',
                }"
                :href="route('admin.dashboard')"
                :active="isDashboardActive"
            >
                <component
                    :is="
                        isDashboardActive
                            ? IconLayoutDashboardFilled
                            : IconLayoutDashboard
                    "
                    :stroke="1"
                    class="w-6 h-6"
                />
            </AdminNavButton>
        </nav>

        <div class="flex flex-col items-center space-y-4 py-2">
            <AdminNavButton
                v-tooltip="{
                    content: $t('System'),
                    placement: 'right',
                }"
                :href="route('admin.settings.options')"
                :active="$page.url.startsWith('/settings')"
            >
                <component
                    :is="
                        $page.url.startsWith('/settings')
                            ? IconSettingsFilled
                            : IconSettings
                    "
                    :stroke="1"
                    class="w-6 h-6"
                />
            </AdminNavButton>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import {
    IconLayoutDashboard,
    IconLayoutDashboardFilled,
    IconSettings,
    IconSettingsFilled,
    // Наступні іконки можна видалити з імпорту, якщо вони тимчасово не використовуються
    IconShoppingCart,
    IconShoppingCartFilled,
} from "@tabler/icons-vue";
import { Link } from "@inertiajs/vue3";
import AdminNavButton from "@/Components/UI/Buttons/Admin/AdminNavButton.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";

const page = usePage();

// Виносимо складну логіку перевірки активного роуту в computed-властивість
const isDashboardActive = computed(() => {
    return (
        page.component === "Admin/Dashboard" ||
        page.url.startsWith("/users") ||
        page.url.startsWith("/pages") ||
        page.url.startsWith("/menus")
    );
});
</script>

<script setup>
import { IconDashboard, IconSettings } from "@tabler/icons-vue";
import ApplicationLogo from "../ApplicationLogo.vue";
import AdminNavButton from "../UI/Buttons/Admin/AdminNavButton.vue";
</script>

<template>
    <aside class="bg-white min-h-screen flex flex-col border-r py-4 px-2">
        <Link
            :href="route('admin.dashboard')"
            class="flex justify-center items-center"
        >
            <ApplicationLogo class="w-10 h-10" />
        </Link>

        <!-- Main nav buttons -->
        <nav class="flex flex-col items-center flex-grow py-6 space-y-2">
            <AdminNavButton
                :href="route('admin.dashboard')"
                :active="route().current('admin.dashboard')"
            >
                <IconDashboard :stroke="1" class="w-6 h-6" />
            </AdminNavButton>
        </nav>

        <!-- Bottom nav -->
        <div class="flex flex-col items-center space-y-4">
            <AdminNavButton
                :href="route('admin.settings')"
                :active="$page.url.startsWith('/settings')"
            >
                <IconSettings :stroke="1" class="w-6 h-6" />
            </AdminNavButton>
        </div>
    </aside>
</template>

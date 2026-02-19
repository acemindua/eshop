<script setup>
import { IconSettings, IconShoppingBag } from "@tabler/icons-vue";
import ApplicationLogo from "../ApplicationLogo.vue";
import AdminNavButton from "../UI/Buttons/Admin/AdminNavButton.vue";
</script>

<template>
    <Link
        :href="route('admin.dashboard')"
        class="flex justify-center items-center"
    >
        <ApplicationLogo class="w-10 h-10 bg-brand" />
    </Link>

    <!-- Main nav buttons -->
    <nav class="flex flex-col items-center flex-grow py-6 space-y-2">
        <AdminNavButton
            v-tooltip="{
                content: $t('Commerce'),
                placement: 'right',
            }"
            :href="route('admin.items.index')"
            :active="$page.url.startsWith('/commerce')"
        >
            <IconShoppingBag :stroke="1" class="w-6 h-6" />
        </AdminNavButton>
    </nav>

    <!-- Bottom nav -->
    <div class="flex flex-col items-center space-y-4">
        <AdminNavButton
            v-tooltip="{
                content: $t('Settings'),
                placement: 'right',
            }"
            :href="route('admin.settings')"
            :active="$page.url.startsWith('/settings')"
        >
            <IconSettings :stroke="1" class="w-6 h-6" />
        </AdminNavButton>
    </div>
</template>

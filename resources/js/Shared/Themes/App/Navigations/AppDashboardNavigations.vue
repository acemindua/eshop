<template>
    <div class="inline-flex items-center px-1 mt-2 mb-4">
        <span class="text-blue-600"> app. </span>
        <span class="text-light text-gray-900 font-semibold">{{
            $page.props.app.name
        }}</span>
    </div>

    <NavigationLink
        :href="route('admin.dashboard')"
        :active="route().current('admin.dashboard')"
    >
        <template #icon>
            <IconDashboard :stroke="1" width="20" />
        </template>
        <span>Dashboard</span>
    </NavigationLink>
    <NavigationLink
        v-if="can('user-view') || is('super-user')"
        :href="route('admin.users.index')"
        :active="$page.url.startsWith('/users')"
    >
        <template #icon>
            <IconUsers :stroke="1" width="20" />
        </template>
        <span>{{ $t("Users") }}</span>
    </NavigationLink>
    <NavigationLink
        v-if="can('page-view') || is('super-user')"
        :href="route('admin.pages.index')"
        :active="$page.url.startsWith('/pages')"
    >
        <template #icon>
            <IconToiletPaper :stroke="1" width="20" />
        </template>
        <span>{{ $t("Pages") }}</span>
    </NavigationLink>
</template>

<script setup>
import { IconDashboard, IconUsers, IconToiletPaper } from "@tabler/icons-vue";
import NavigationLink from "../Components/NavigationLink.vue";
</script>

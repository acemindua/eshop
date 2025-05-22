<template>
    <div class="inline-flex items-center px-1 mt-2 mb-4 font-semibold">
        <span class="text-light text-gray-900">{{ $t("Settings") }}</span>
    </div>
    <NavigationLink
        v-if="can('messangers-view') || is('super-user')"
        :href="route('admin.messangers.index')"
        :active="$page.url.startsWith('/settings/messangers')"
    >
        <template #icon>
            <IconMessages :stroke="1" width="20" />
        </template>
        <span>{{ $t("Messangers") }}</span>
    </NavigationLink>
    <NavigationLink
        v-if="can('role-view') || is('super-user')"
        :href="route('admin.roles.index')"
        :active="$page.url.startsWith('/settings/roles')"
    >
        <template #icon>
            <IconShieldCheck :stroke="1" width="20" />
        </template>
        <span>{{ $t("Roles") }}</span>
    </NavigationLink>
    <NavigationLink
        v-if="can('language-view') || is('super-user')"
        :href="route('admin.languages.index')"
        :active="$page.url.startsWith('/settings/languages')"
    >
        <template #icon>
            <IconLanguage :stroke="1" width="20" />
        </template>
        <span>{{ $t("Languages") }}</span>
    </NavigationLink>
</template>

<script setup>
import { IconShieldCheck, IconLanguage, IconMessages } from "@tabler/icons-vue";
import NavigationLink from "../Components/NavigationLink.vue";
</script>

<template>
    <Layout>
        <template #sidenav>
            <h4 class="uppercase text-xs font-semibold py-2 text-gray-600">
                Dashboard
            </h4>
            <ul class="mt-4 w-full">
                <li class="">
                    <AdminNavLink
                        :href="route('admin.users.index')"
                        :active="$page.url.startsWith('/users')"
                    >
                        <template #icon>
                            <IconUsers stroke="{2}" />
                        </template>
                        <span>{{ $t("Users") }}</span>
                    </AdminNavLink>
                </li>
                <li>
                    <AdminNavLink
                        :href="route('admin.pages.index')"
                        :active="$page.url.startsWith('/pages')"
                    >
                        <template #icon>
                            <IconBook stroke="{2}" />
                        </template>
                        <span>{{ $t("Pages") }}</span>
                    </AdminNavLink>
                </li>
            </ul>
        </template>

        <div>
            <slot />
        </div>
    </Layout>
</template>

<script setup>
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";
import Layout from "@/Layouts/Admin/AdminLayout.vue";
import { IconBook, IconUsers } from "@tabler/icons-vue";
</script>

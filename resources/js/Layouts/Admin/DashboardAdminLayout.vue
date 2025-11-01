<template>
    <Layout>
        <template #sidenav>
            <ul>
                <li>
                    <AdminNavLink
                        :href="route('admin.users.index')"
                        :active="$page.url.startsWith('/users')"
                    >
                        {{ $t("Users") }}
                    </AdminNavLink>
                </li>
                <li>
                    <AdminNavLink
                        :href="route('admin.pages.index')"
                        :active="$page.url.startsWith('/pages')"
                    >
                        {{ $t("Pages") }}
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
</script>

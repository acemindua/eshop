<template>
    <Layout>
        <template #sidenav>
            <ul>
                <li>
                    <AdminNavLink :href="route('admin.users.index')">
                        {{ $t("Users") }}
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

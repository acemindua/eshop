<template>
    <Layout>
        <template #sidenav>
            <h4 class="uppercase text-xs font-semibold py-2 text-gray-600">
                Commerce
            </h4>
            <ul class="mt-4">
                <li>
                    <AdminNavLink
                        :href="route('admin.items.index')"
                        :active="$page.url.startsWith('/commerce/items')"
                    >
                        <template #icon>
                            <IconPlant2 stroke="{2}" />
                        </template>
                        <span>{{ $t("Items") }}</span>
                    </AdminNavLink>
                </li>
                <li>
                    <AdminNavLink
                        :href="route('admin.categories.index')"
                        :active="$page.url.startsWith('/commerce/categories')"
                    >
                        <template #icon>
                            <IconCategory stroke="{2}" />
                        </template>
                        <span>{{ $t("Categories") }}</span>
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
import {
    IconCategory,
    IconPlant2,
    IconShoppingBag,
    IconUsers,
} from "@tabler/icons-vue";
</script>

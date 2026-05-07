<template>
    <Layout>
        <template #sidenav>
            <div class="w-full h-14 border-b flex items-center p-4">
                <h4
                    class="uppercase text-[12px] tracking-widest font-bold text-gray-500"
                >
                    <span>{{ $t("Commerce") }}</span>
                </h4>
            </div>

            <ul class="flex flex-col w-full px-3 py-4">
                <li></li>
                <li>
                    <AdminNavLink
                        :href="route('admin.commerce.orders.index')"
                        :active="$page.url.startsWith('/admin/commerce/orders')"
                    >
                        <template #icon>
                            <IconShoppingBag stroke="2" />
                        </template>
                        <span>{{ $t("Orders") }}</span>
                    </AdminNavLink>
                </li>
                <li>
                    <AdminNavLink
                        :href="route('admin.commerce.items.index')"
                        :active="$page.url.startsWith('/admin/commerce/items')"
                    >
                        <template #icon>
                            <IconPlant2 stroke="2" />
                        </template>
                        <span>{{ $t("Items") }}</span>
                    </AdminNavLink>
                </li>
                <li>
                    <AdminNavLink
                        :href="route('admin.commerce.categories.index')"
                        :active="
                            $page.url.startsWith('/admin/commerce/categories')
                        "
                    >
                        <template #icon>
                            <IconCategory stroke="2" />
                        </template>
                        <span>{{ $t("Categories") }}</span>
                    </AdminNavLink>
                </li>
                <li>
                    <AdminNavLink
                        :href="route('admin.commerce.manufacturers.index')"
                        :active="
                            $page.url.startsWith(
                                '/admin/commerce/manufacturers',
                            )
                        "
                    >
                        <template #icon>
                            <IconBuildingFactory2 stroke="2" />
                        </template>
                        <span>{{ $t("Manufacturers") }}</span>
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
    IconBuildingFactory2,
    IconCategory,
    IconPlant2,
    IconShoppingBag,
} from "@tabler/icons-vue";
</script>

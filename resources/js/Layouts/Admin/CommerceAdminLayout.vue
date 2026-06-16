<template>
    <AdminLayout>
        <template #sidenav>
            <div class="w-full h-14 border-b flex items-center p-4">
                <h4
                    class="uppercase text-[12px] tracking-widest font-bold text-gray-500"
                >
                    <span>Dashboard</span>
                </h4>
            </div>
            <ul class="flex flex-col w-full border-b divide-y">
                <li class="uppercase text-xs pt-2 pb-2 px-4 text-brand">
                    <span>{{ $t("Apps") }}</span>
                </li>

                <AdminNavLink
                    :href="route('admin.commerce.items.index')"
                    :active="$page.url.startsWith('/commerce/items')"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/commerce/items')
                                    ? IconBasketFilled
                                    : IconBasket
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Items") }}
                </AdminNavLink>
                <AdminNavLink
                    :href="route('admin.commerce.categories.index')"
                    :active="$page.url.startsWith('/commerce/categories')"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/commerce/categories')
                                    ? IconCategoryFilled
                                    : IconCategory
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Categories") }}
                </AdminNavLink>
                <AdminNavLink
                    :href="route('admin.commerce.brands.index')"
                    :active="$page.url.startsWith('/commerce/brands')"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/commerce/brands')
                                    ? IconBrandAppleFilled
                                    : IconBrandApple
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Brands") }}
                </AdminNavLink>
            </ul>
        </template>

        <!-- 
    <AdminLayout v-model:isSidebarVisible="isSidebarVisible">
        <template #sidenav>
            <div class="w-full h-14 border-b flex items-center p-4">
                <h4
                    class="uppercase text-[12px] tracking-widest font-bold text-gray-500"
                >
                    <span>{{ $t("Commerce") }}</span>
                </h4>
            </div>

            <ul class="flex flex-col w-full border-b divide-y">
              
                <AdminNavLink
                    :href="route('admin.commerce.orders.index')"
                    :active="$page.url == '/commerce/orders'"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url == '/commerce/orders'
                                    ? IconBasketFilled
                                    : IconBasket
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Orders") }}
                </AdminNavLink>

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
-->
        <div>
            <slot />
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import {
    IconBasket,
    IconBasketFilled,
    IconBrandApple,
    IconBrandAppleFilled,
    IconCategory,
    IconCategoryFilled,
} from "@tabler/icons-vue";
import { ref } from "vue";

// Оголошуємо стан тут, щоб він був доступний у шаблоні DashboardAdminLayout
const isSidebarVisible = ref(true);
</script>

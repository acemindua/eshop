<template>
    <div class="inline-flex items-center px-1 mt-2 mb-4 font-semibold">
        <span class="text-light text-gray-900">{{ $t("Commerce") }}</span>
    </div>

    <NavigationLink
        v-if="can('order-view') || is('super-user')"
        :href="route('admin.orders.index')"
        :active="$page.url.startsWith('/commerce/orders')"
    >
        <template #icon>
            <IconShoppingBag :stroke="1" width="20" />
        </template>

        <span>{{ $t("Orders") }}</span>
    </NavigationLink>

    <NavigationLink
        v-if="can('category-view') || is('super-user')"
        :href="route('admin.categories.index')"
        :active="$page.url.startsWith('/commerce/categories')"
    >
        <template #icon>
            <IconCategory :stroke="1" width="20" />
        </template>

        <span>{{ $t("Categories") }}</span>
    </NavigationLink>

    <NavigationLink
        v-if="can('manufacturer-view') || is('super-user')"
        :href="route('admin.manufacturers.index')"
        :active="$page.url.startsWith('/commerce/manufacturers')"
    >
        <template #icon>
            <IconBuildingFactory :stroke="1" width="20" />
        </template>
        <span>{{ $t("Manufacturers") }}</span>
    </NavigationLink>

    <NavigationLink
        v-if="can('product-view') || is('super-user')"
        :href="route('admin.products.index')"
        :active="$page.url.startsWith('/commerce/products')"
    >
        <template #icon>
            <IconBrandSuperhuman :stroke="1" width="20" />
        </template>
        <span>{{ $t("Products") }}</span>
    </NavigationLink>
</template>

<script setup>
import {
    IconShoppingBag,
    IconCategory,
    IconBrandSuperhuman,
    IconBuildingFactory,
} from "@tabler/icons-vue";
import NavigationLink from "../Components/NavigationLink.vue";
</script>

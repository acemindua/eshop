<script setup>
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue";
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";
import {
    IconBuildingWarehouse,
    IconCreditCard,
    IconCreditCardFilled,
    IconDirections,
    IconDirectionsFilled,
    IconSettings,
    IconSettingsFilled,
    IconTruck,
    IconTruckFilled,
    IconWorld,
    IconWorldFilled,
} from "@tabler/icons-vue";
</script>

<template>
    <AdminLayout>
        <template #sidenav>
            <div class="w-full h-14 border-b flex items-center p-4">
                <h4
                    class="uppercase text-[12px] tracking-widest font-bold text-gray-500"
                >
                    <span>{{ $t("Settings") }}</span>
                </h4>
            </div>

            <ul class="flex flex-col w-full border-b divide-y">
                <!-- Core Section -->
                <li class="uppercase text-xs pt-2 pb-2 px-4 text-brand">
                    <span>{{ $t("Core") }}</span>
                </li>

                <AdminNavLink
                    :href="route('admin.settings.options')"
                    :active="$page.url === '/settings'"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url === '/settings'
                                    ? IconSettingsFilled
                                    : IconSettings
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("General") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="route('admin.settings.translations.index')"
                    :active="$page.url.startsWith('/settings/translations')"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/settings/translations')
                                    ? IconWorldFilled
                                    : IconWorld
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("Translations") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="route('admin.settings.versions.index')"
                    :active="$page.url.startsWith('/settings/versions')"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/settings/versions')
                                    ? IconDirectionsFilled
                                    : IconDirections
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("Roadmap & versions") }}
                </AdminNavLink>

                <!-- Commerce Section -->
                <li class="uppercase text-xs pt-2 pb-2 px-4 text-brand">
                    <span>{{ $t("Commerce") }}</span>
                </li>

                <AdminNavLink
                    :href="route('admin.settings.commerce.warehouses.index')"
                    :active="
                        $page.url.startsWith('/settings/commerce/warehouses')
                    "
                >
                    <template #icon>
                        <!-- Використовуємо реальну іконку складу замість вішалки -->
                        <component
                            :is="IconBuildingWarehouse"
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("Warehouses") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="
                        route('admin.settings.commerce.shipping-methods.index')
                    "
                    :active="
                        $page.url.startsWith(
                            '/settings/commerce/shipping-methods',
                        )
                    "
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith(
                                    '/settings/commerce/shipping-methods',
                                )
                                    ? IconTruckFilled
                                    : IconTruck
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("Shippings") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="
                        route('admin.settings.commerce.payment-methods.index')
                    "
                    :active="
                        $page.url.startsWith(
                            '/settings/commerce/payment-methods',
                        )
                    "
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith(
                                    '/settings/commerce/payment-methods',
                                )
                                    ? IconCreditCardFilled
                                    : IconCreditCard
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("Payment Methods") }}
                </AdminNavLink>
            </ul>
        </template>

        <div>
            <slot />
        </div>
    </AdminLayout>
</template>

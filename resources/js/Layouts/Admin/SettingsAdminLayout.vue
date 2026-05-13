<script setup>
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue"; // Шлях залежить від вашої структури
import { ref } from "vue";
import {
    IconBuildingWarehouse,
    IconCreditCard,
    IconCreditCardFilled,
    IconDirections,
    IconDirectionsFilled,
    IconHanger2,
    IconHanger2Filled,
    IconLanguageHiragana,
    IconSettings,
    IconSettingsFilled,
    IconTruck,
    IconTruckDelivery,
    IconTruckFilled,
    IconUser,
    IconUserFilled,
    IconWorld,
    IconWorldFilled,
} from "@tabler/icons-vue";
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";
// Оголошуємо стан тут, щоб він був доступний у шаблоні DashboardAdminLayout
const isSidebarVisible = ref(true);
</script>

<template>
    <AdminLayout v-model:isSidebarVisible="isSidebarVisible">
        <template #sidenav>
            <div class="w-full h-14 border-b flex items-center p-4">
                <h4
                    class="uppercase text-[12px] tracking-widest font-bold text-gray-500"
                >
                    <span>{{ $t("Settings") }}</span>
                </h4>
            </div>

            <ul class="flex flex-col w-full border-b divide-y">
                <AdminNavLink
                    :href="route('admin.settings.index')"
                    :active="$page.url == '/settings'"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url == '/settings'
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
                    :active="$page.url === '/settings/translations'"
                    :show-text="isSidebarVisible"
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
                    :href="route('admin.settings.warehouses.index')"
                    :active="$page.url.startsWith('/settings/warehouses')"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/settings/warehouses')
                                    ? IconHanger2Filled
                                    : IconHanger2
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Warehouses") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="route('admin.settings.shippings.index')"
                    :active="$page.url === '/settings/shippings'"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/settings/shippings')
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
                    :href="route('admin.settings.payment-methods.index')"
                    :active="$page.url === '/settings/payment-methods'"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith(
                                    '/settings/payment-methods',
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

                <AdminNavLink
                    :href="route('admin.settings.versions.index')"
                    :active="$page.url === '/settings/versions'"
                    :show-text="isSidebarVisible"
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
                <!--  
              

                

                <AdminNavLink
                    :href="route('admin.settings.payment-methods.index')"
                    :active="
                        $page.url.startsWith('/admin/settings/payment-methods')
                    "
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith(
                                    '/settings/payment-methods',
                                )
                                    ? IconCreditCardFilled
                                    : IconCreditCard
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    <span>{{ $t("Payment Methods") }}</span>
                </AdminNavLink>

                <AdminNavLink
                    :href="route('admin.settings.versions.index')"
                    :active="$page.url.startsWith('/admin/settings/versions')"
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
                    <span>{{ $t("Roadmap & versions") }}</span>
                </AdminNavLink> -->
            </ul>
        </template>

        <div>
            <slot />
        </div>
    </AdminLayout>
</template>

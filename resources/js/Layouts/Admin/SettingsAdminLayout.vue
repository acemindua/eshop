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

            <ul class="flex flex-col w-full px-3 py-4">
                <li>
                    <AdminNavLink
                        :href="route('admin.settings.index')"
                        :active="$page.url === '/admin/settings'"
                    >
                        <template #icon>
                            <IconSettings stroke="2" />
                        </template>
                        <span>{{ $t("General") }}</span>
                    </AdminNavLink>
                </li>

                <li>
                    <AdminNavLink
                        :href="route('admin.settings.translations.index')"
                        :active="
                            $page.url.startsWith('/admin/settings/translations')
                        "
                    >
                        <template #icon>
                            <IconLanguageHiragana stroke="2" />
                        </template>
                        <span>{{ $t("Translations") }}</span>
                    </AdminNavLink>
                </li>

                <li>
                    <AdminNavLink
                        :href="route('admin.settings.shippings.index')"
                        :active="
                            $page.url.startsWith('/admin/settings/shippings')
                        "
                    >
                        <template #icon>
                            <IconTruckDelivery stroke="2" />
                        </template>
                        <span>{{ $t("Shippings") }}</span>
                    </AdminNavLink>
                </li>

                <li>
                    <AdminNavLink
                        :href="route('admin.settings.payment-methods.index')"
                        :active="
                            $page.url.startsWith(
                                '/admin/settings/payment-methods',
                            )
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
                </li>

                <li>
                    <AdminNavLink
                        :href="route('admin.settings.versions.index')"
                        :active="
                            $page.url.startsWith('/admin/settings/versions')
                        "
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
                    </AdminNavLink>
                </li>
            </ul>
        </template>

        <div>
            <slot />
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue"; // Шлях залежить від вашої структури
import { ref } from "vue";
import {
    IconCreditCard,
    IconCreditCardFilled,
    IconDirections,
    IconDirectionsFilled,
    IconLanguageHiragana,
    IconSettings,
    IconTruckDelivery,
} from "@tabler/icons-vue";
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";

// Оголошуємо стан тут, щоб він був доступний у шаблоні DashboardAdminLayout
const isSidebarVisible = ref(true);
</script>

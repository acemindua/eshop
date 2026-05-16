<script setup>
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue"; // Шлях залежить від вашої структури
import { ref } from "vue";
import {
    IconClipboard,
    IconClipboardFilled,
    IconManualGearbox,
    IconManualGearboxFilled,
    IconMenu2,
    IconUser,
    IconUserFilled,
} from "@tabler/icons-vue";
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import useLocales from "@/Composables/useLocales";

// Оголошуємо стан тут, щоб він був доступний у шаблоні DashboardAdminLayout
const isSidebarVisible = ref(true);

const { state } = useLocales();

const page = usePage();
const auth_user = computed(() => page.props?.auth?.user?.data || []);

// Отримуємо ISO код країни для прапора
const userFlag = computed(() => {
    if (!auth_user.value) return "gb";

    const userLocale = auth_user.value.locale; // наприклад, 'uk'

    // Пріоритет 1: Дивимось у localesMapping (uk -> ua)
    if (state.mapping[userLocale]) {
        return state.mapping[userLocale];
    }

    // Пріоритет 2: Дивимось у supportedLocales -> regional (uk_UA -> ua)
    const supported = state.locales[userLocale];
    if (supported && supported.regional) {
        return supported.regional.split("_")[1].toLowerCase();
    }

    // Пріоритет 3: Повертаємо саму локаль як фолбек
    return userLocale;
});
</script>

<template>
    <AdminLayout v-model:isSidebarVisible="isSidebarVisible">
        <template #sidenav>
            <div class="w-full h-14 border-b flex items-center p-4">
                <h4
                    class="uppercase text-[12px] tracking-widest font-bold text-gray-500"
                >
                    <span>Dashboard</span>
                </h4>
            </div>

            <ul class="flex flex-col w-full border-b divide-y">
                <AdminNavLink
                    :href="route('admin.users.index')"
                    :active="$page.url.startsWith('/users')"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/users')
                                    ? IconUserFilled
                                    : IconUser
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Users") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="route('admin.pages.index')"
                    :active="$page.url.startsWith('/pages')"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/pages')
                                    ? IconClipboardFilled
                                    : IconClipboard
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Pages") }}
                </AdminNavLink>

                <AdminNavLink
                    :href="route('admin.menus.index')"
                    :active="$page.url.startsWith('/menus')"
                    :show-text="isSidebarVisible"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/menus')
                                    ? IconManualGearboxFilled
                                    : IconManualGearbox
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>
                    {{ $t("Menus") }}
                </AdminNavLink>
            </ul>
        </template>

        <div>
            <slot />
        </div>
    </AdminLayout>
</template>

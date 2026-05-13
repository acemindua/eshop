<script setup>
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue"; // Шлях залежить від вашої структури
import { ref } from "vue";
import {
    IconClipboard,
    IconClipboardFilled,
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
                <li v-if="auth_user" class="mb-2">
                    <div
                        class="m-4 flex flex-col gap-2 items-center justify-center text-xs"
                    >
                        <div class="relative flex items-center justify-center">
                            <!-- Аватар користувача -->
                            <img
                                :src="
                                    auth_user.avatar ||
                                    '/images/default-avatar.png'
                                "
                                :alt="auth_user.full_name"
                                class="rounded-xl w-14 h-14 object-cover border border-gray-100 shadow-sm"
                            />

                            <div
                                class="absolute -top-1 -right-1 border-0 rounded-full w-5 h-5 flex items-center justify-center bg-white"
                            >
                                <!-- Прапорець як бейдж -->
                                <flag
                                    :iso="userFlag"
                                    :title="auth_user.locale"
                                    class="rounded-full"
                                />
                            </div>
                        </div>
                        <p class="font-semibold">{{ auth_user.full_name }}</p>
                        <p
                            class="flex items-center justify-center bg-gray-600 rounded-full h-5 px-2 relative"
                        >
                            <span
                                class="text-xs text-gray-50 -top-[2px] relative"
                            >
                                {{ auth_user.role }}
                            </span>
                        </p>
                        <p class="text-gray-400 truncate w-full text-center">
                            {{ auth_user.email }}
                        </p>
                    </div>
                </li>

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
            </ul>
        </template>

        <div>
            <slot />
        </div>
    </AdminLayout>
</template>

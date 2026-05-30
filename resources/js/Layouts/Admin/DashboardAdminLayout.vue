<script setup>
import AdminLayout from "@/Layouts/Admin/AdminLayout.vue"; // Шлях залежить від вашої структури
import AdminNavLink from "@/Components/Admin/AdminNavLink.vue";
import {
    IconUser,
    IconUserFilled,
    IconManualGearbox,
    IconManualGearboxFilled,
    IconArticle,
    IconArticleFilled,
    IconMenu2Filled,
    IconMenu2,
} from "@tabler/icons-vue";
</script>

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
                    :href="route('admin.users.index')"
                    :active="$page.url.startsWith('/users')"
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
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/pages')
                                    ? IconArticleFilled
                                    : IconArticle
                            "
                            stroke="1"
                            class="w-5 h-5"
                        />
                    </template>

                    {{ $t("Pages") }}
                </AdminNavLink>
                <li class="uppercase text-xs pt-2 pb-2 px-4 text-brand">
                    <span>{{ $t("Options") }}</span>
                </li>
                <AdminNavLink
                    :href="route('admin.menus.index')"
                    :active="$page.url.startsWith('/menus')"
                >
                    <template #icon>
                        <component
                            :is="
                                $page.url.startsWith('/menus')
                                    ? IconMenu2Filled
                                    : IconMenu2
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

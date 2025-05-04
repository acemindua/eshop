<template>
    <Layout>
        <Head title="Role & Permissions" />
        <h1 class="font-semibold border-b p-4">Role & Permissions</h1>

        <section class="overflow-x-auto m-4 border bg-white">
            <div>
                <table class="w-full text-sm table-auto">
                    <thead>
                        <tr class="text-xs uppercase text-slate-600 divide-x">
                            <th scope="col" class="p-2">Models/Roles</th>
                            <th
                                scope="col"
                                class="p-2"
                                v-for="role in roles"
                                :key="role.id"
                            >
                                <Link
                                    :href="route('admin.roles.edit', role.id)"
                                    class=""
                                >
                                    {{ role.name }}
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="group in groupedPermissions"
                            :key="group.model"
                            class="hover:bg-slate-50 border-t border-slate-200 divide-x dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"
                        >
                            <td scope="row" class="p-2 text-center">
                                <span class="capitalize font-semibold">{{
                                    group.model
                                }}</span>
                            </td>
                            <td
                                v-for="role in roles"
                                :key="role.id"
                                class="text-center p-2"
                            >
                                <div class="grid grid-cols-4">
                                    <div
                                        v-for="action in group.actions"
                                        :key="action"
                                    >
                                        <div class="flex flex-col items-center">
                                            <component
                                                :size="22"
                                                :class="
                                                    role.permissions[
                                                        `${group.model}-${action}`
                                                    ]
                                                        ? 'text-green-500'
                                                        : 'text-slate-300'
                                                "
                                                :is="
                                                    role.permissions[
                                                        `${group.model}-${action}`
                                                    ]
                                                        ? IconCircleCheckFilled
                                                        : IconCircle
                                                "
                                                :stroke="1"
                                            />
                                            <p
                                                class="text-xs capitalize text-slate-500"
                                            >
                                                {{ action }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Розділ для дебагу -->
        <section>
            <VarDump :data="groupedPermissions" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Shared/Themes/Layouts/SettingLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed } from "vue";
import { IconCircleCheckFilled, IconCircle, IconEdit } from "@tabler/icons-vue";

const props = defineProps({
    data: Object,
});

// Ролі та дозволи з пропсів
const roles = computed(() => props.data.roles || []);
const permissions = computed(() => props.data.permissions || []);

// Обчислення кількості ролей (максимум 12)
//const rolesCount = computed(() => Math.min(roles.value.length, 12));
//const gridColsClass = computed(() => `grid-cols-${rolesCount.value}`);

// Групування дозволів за моделями з використанням Set для унікальності
const groupedPermissions = computed(() => {
    const groups = {};
    permissions.value.forEach((permission) => {
        const [model, action] = permission.split("-");
        if (!groups[model]) {
            groups[model] = new Set();
        }
        groups[model].add(action);
    });
    return Object.entries(groups).map(([model, actionsSet]) => ({
        model,
        actions: Array.from(actionsSet),
    }));
});

// Функція для капіталізації першої літери рядка
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

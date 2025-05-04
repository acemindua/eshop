<!-- ../Pages/App/Users/Partials/UserTable -->
<script setup>
import { IconEdit, IconSettings } from "@tabler/icons-vue";
import Pagination from "@/Components/Pagination.vue";
import Checkbox from "@/Components/Checkbox.vue";
import UserAvatar from "@/Components/UserAvatar.vue";

const props = defineProps({
    items: Array,
    meta: Object,
});
</script>

<template>
    <section class="overflow-x-auto my-4 border bg-white rounded-lg">
        <table class="w-full text-sm">
            <thead>
                <tr class="text-xs uppercase text-slate-600 text-thin divide-x">
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" :checked="false" />
                    </th>
                    <th scope="col" class="p-2 w-[80px]">Avatar</th>
                    <th scope="col" class="p-2 text-start">Name</th>
                    <th scope="col" class="p-2 text-start">Contacts</th>
                    <th scope="col" class="p-2">Role</th>
                    <th scope="col" class="p-2">
                        <IconSettings stroke="{2}" size="18" class="mx-auto" />
                    </th>
                    <th scope="col" class="p-2">Id</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="items.length > 0"
                    v-for="item in items"
                    :key="item.id"
                    class="hover:bg-slate-50 border-t border-slate-200 dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"
                >
                    <td class="p-2 text-center">
                        <Checkbox class="mx-auto" :checked="false" />
                    </td>
                    <td scope="row" class="p-2">
                        <UserAvatar :data-user="item" />
                    </td>
                    <td scope="row" class="p-2 text-start">
                        <p>{{ item.full_name }}</p>
                        <p
                            v-if="item.last_seen && !item.online"
                            class="text-xs text-slate-500"
                        >
                            {{ item.last_seen }}
                        </p>
                        <p v-else>
                            <span
                                v-if="item.online"
                                class="text-xs text-green-500"
                                >Online</span
                            >
                        </p>
                    </td>

                    <td scope="row" class="p-2">
                        <p>
                            <a
                                :href="`mailto:${item.email}`"
                                class="text-blue-500 hover:text-blue-500 hover:underline"
                                >{{ item.email }}</a
                            >
                        </p>
                        <p class="text-slate-500">{{ item.phone }}</p>
                    </td>
                    <td scope="row" class="flex justify-center pt-4">
                        <BadgeRole :role="item.role" />
                    </td>

                    <td scope="row">
                        <div class="flex space-x-2 items-center justify-center">
                            <Link :href="route('admin.users.edit', item.id)">
                                <IconEdit
                                    stroke="{2}"
                                    size="18"
                                    class="text-blue-500"
                                />
                            </Link>
                        </div>
                    </td>
                    <td scope="row" class="p-2 text-center text-slate-500">
                        {{ item.id }}
                    </td>
                </tr>
                <tr v-else>
                    <td></td>
                </tr>
            </tbody>
            <tfoot v-if="meta.links && meta.links.length > 3">
                <tr>
                    <td scope="row" colspan="100%" class="border-t px-4">
                        <Pagination
                            :links="meta.links"
                            :total="meta.total"
                            :from="meta.from"
                            :to="meta.to"
                        />
                    </td>
                </tr>
            </tfoot>
        </table>
    </section>
</template>

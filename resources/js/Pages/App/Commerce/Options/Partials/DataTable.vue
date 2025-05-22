<script setup>
import { router } from "@inertiajs/vue3";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-vue";
import Checkbox from "@/Components/Checkbox.vue";
import BadgeStatus from "@/Components/BadgeStatus.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    items: Array,
    meta: Object,
});

function handleDelete(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        router.delete(route("admin.options.destroy", id));
    }
}
</script>

<template>
    <section class="overflow-x-auto my-4 border bg-white rounded-lg">
        <table class="w-full text-sm">
            <thead>
                <tr class="text-xs uppercase text-slate-600 text-thin divide-x">
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" :checked="false" />
                    </th>

                    <th class="p-3 text-start">Title</th>
                    <th class="p-3 text-center w-48">Status</th>
                    <th class="p-3 w-48">
                        <IconSettings :stroke="2" size="18" class="mx-auto" />
                    </th>
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
                    <td class="p-2">{{ item.title }}</td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.status" />
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center space-x-2">
                            <Link :href="route('admin.options.edit', item.id)">
                                <IconEdit
                                    :stroke="1"
                                    size="18"
                                    class="text-indigo-500"
                                />
                            </Link>
                            <button
                                class="text-red-500"
                                preserve-scroll
                                preserve-state
                                @click.prevent="handleDelete(item.id)"
                            >
                                <IconTrash
                                    :stroke="1"
                                    size="18"
                                    class="text-red-500"
                                />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="meta.links && meta.links.length > 3">
                <tr>
                    <td colspan="100%" class="border-t px-4">
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

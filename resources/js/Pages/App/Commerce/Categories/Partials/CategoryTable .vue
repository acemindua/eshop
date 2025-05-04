<script setup>
import { IconEdit, IconSettings } from "@tabler/icons-vue";
import Checkbox from "@/Components/Checkbox.vue";
import BadgeStatus from "@/Components/BadgeStatus.vue";
import Pagination from "@/Components/Pagination.vue";
import ImagePreview from "@/Components/ImagePreview.vue";

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
                    <th class="p-3 w-[80px]">Img</th>
                    <th class="p-3 text-start">Title</th>
                    <th class="p-3 text-start">{{ $t("Parent") }}</th>
                    <th class="p-3 text-center">Status</th>
                    <th class="p-3">
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
                    <td class="p-1">
                        <ImagePreview class="mx-auto" :data="item" />
                    </td>
                    <td class="p-2">{{ item.title }}</td>
                    <td class="p-2">
                        <span v-if="item.parent" class="text-xs text-slate-500">
                            {{ item.parent.title }}
                        </span>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.status" />
                        </div>
                    </td>
                    <td class="p-2">
                        <Link :href="route('admin.categories.edit', item.id)">
                            <IconEdit
                                :stroke="2"
                                size="18"
                                class="text-indigo-500 mx-auto"
                            />
                        </Link>
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

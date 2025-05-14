<script setup>
// Встановлені бібліотеки
import { IconEdit, IconSettings } from "@tabler/icons-vue";
import { Link } from "@inertiajs/vue3";

// Загальні UI-компоненти
import Checkbox from "@/Components/Checkbox.vue";
import Pagination from "@/Components/Pagination.vue";

// Візуальні елементи/бейджі
import BadgeStatus from "@/Components/BadgeStatus.vue";
import BadgeCountStatus from "@/Components/BadgeCountStatus.vue";

// Компонент для зображень
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
                <tr class="text-xs uppercase text-slate-600 divide-x">
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" :checked="false" />
                    </th>
                    <th class="p-3 w-[80px]">Img</th>
                    <th class="p-3 text-start">Title</th>
                    <th class="p-3 text-end">Price</th>
                    <th class="p-3 text-end">Quantity</th>
                    <th class="p-3">Status</th>
                    <th class="p-3">
                        <IconSettings :stroke="2" size="18" class="mx-auto" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="items.length"
                    v-for="item in items"
                    :key="item.id"
                    class="hover:bg-slate-50 border-t odd:bg-white even:bg-slate-50"
                >
                    <td class="p-2 text-center">
                        <Checkbox class="mx-auto" :checked="false" />
                    </td>
                    <td class="p-1">
                        <ImagePreview class="mx-auto" :data="item" />
                    </td>
                    <td class="p-2">
                        <span class="">{{ item.title }}</span>
                        <p v-if="item.category" class="text-slate-500 text-xs">
                            Category:
                            <span class="text-blue-400">{{
                                item.category.title
                            }}</span>
                        </p>
                    </td>
                    <td class="p-2 text-end">0</td>
                    <td class="p-2 text-end">
                        <BadgeCountStatus :count="0" />
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.status" />
                        </div>
                    </td>
                    <td class="p-2">
                        <Link :href="route('admin.products.edit', item.id)">
                            <IconEdit
                                :stroke="1"
                                size="18"
                                class="text-indigo-500 mx-auto"
                            />
                        </Link>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="meta.links?.length > 3">
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

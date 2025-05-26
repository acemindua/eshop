<script setup>
import { watch, ref } from "vue";
import Swal from "sweetalert2";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-vue";
import Checkbox from "@/Components/Checkbox.vue";
import BadgeStatus from "@/Components/BadgeStatus.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    items: Array,
    selectedItems: Array,
    meta: Object,
});

const emit = defineEmits(["update:selectedItems", "edit", "delete"]);

const toggleAll = ref(false);

watch(toggleAll, (val) => {
    if (val) {
        emit(
            "update:selectedItems",
            props.items.map((i) => i.id)
        );
    } else {
        emit("update:selectedItems", []);
    }
});

const toggleItem = (id) => {
    const updated = props.selectedItems.includes(id)
        ? props.selectedItems.filter((itemId) => itemId !== id)
        : [...props.selectedItems, id];
    emit("update:selectedItems", updated);
};

/**
 * Confirm before delete
 */
const confirmDelete = async (item) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This item will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        emit("delete", item);
    }
};
</script>

<template>
    <section class="overflow-x-auto my-4 border bg-white rounded-lg">
        <table class="w-full text-sm">
            <thead>
                <tr class="text-xs uppercase text-slate-600 text-thin divide-x">
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
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
                        <Checkbox
                            class="mx-auto"
                            :checked="selectedItems.includes(item.id)"
                            @update:checked="() => toggleItem(item.id)"
                        />
                    </td>
                    <td class="p-2">{{ item.title }}</td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus
                                :active="item.status"
                                v-if="item.id !== 1"
                            />
                            <div v-else class="text-xs text-gray-500">
                                default (SEO page)
                            </div>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center space-x-2">
                            <Link :href="route('admin.pages.edit', item.id)">
                                <IconEdit
                                    :stroke="1"
                                    size="18"
                                    class="text-indigo-500"
                                />
                            </Link>
                            <IconTrash
                                v-if="item.id !== 1"
                                :stroke="1"
                                size="18"
                                class="text-red-500 cursor-pointer"
                                preserve-scroll
                                preserve-state
                                @click.prevent="confirmDelete(item)"
                            />
                            <IconTrash
                                v-else
                                :stroke="1"
                                size="18"
                                class="text-gray-500"
                            />
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

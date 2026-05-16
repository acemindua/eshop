<script setup>
import { watch, ref } from "vue";
import Swal from "sweetalert2";
import { Link } from "@inertiajs/vue3";
import {
    IconEdit,
    IconSearch,
    IconSettings,
    IconTrash,
} from "@tabler/icons-vue";
import Checkbox from "./UI/Checkbox.vue";
import Pagination from "./Pagination.vue";

/**
 * Component Props
 * @property {Array} items - List of records to display in the table
 * @property {Array} selectedItems - Array of IDs of currently selected rows
 * @property {Object} meta - Pagination metadata from Laravel/Inertia
 * @property {String} model - The model name used to generate resource routes
 */
const props = defineProps({
    items: { type: Array, default: () => [] },
    selectedItems: { type: Array, default: () => [] },
    meta: Object,
    model: String,
    sortField: String,
    sortDirection: String,
});

const emit = defineEmits(["update:selectedItems", "delete"]);

// State for the "Select All" checkbox
const toggleAll = ref(false);

/**
 * Watch for changes in the "toggleAll" checkbox state.
 * If checked, emits all current item IDs. If unchecked, clears the selection.
 */
watch(toggleAll, (val) => {
    if (val) {
        emit(
            "update:selectedItems",
            props.items.map((i) => i.id),
        );
    } else {
        emit("update:selectedItems", []);
    }
});

/**
 * Toggles selection for an individual row
 * @param {Number|String} id - The unique identifier of the item
 */
const toggleItem = (id) => {
    const updated = props.selectedItems.includes(id)
        ? props.selectedItems.filter((itemId) => itemId !== id)
        : [...props.selectedItems, id];
    emit("update:selectedItems", updated);
};

/**
 * Emits the delete event for a specific item
 * @param {Object} item - The item object to be deleted
 */
const confirmDelete = (item) => {
    Swal.fire({
        title: "Delete record?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#000000", // Black for a minimal look
        cancelButtonColor: "#ffffff", // White
        customClass: {
            confirmButton: "order-2", // Modern alignment
            cancelButton: "order-1 text-gray-500",
        },
        buttonsStyling: true,
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            emit("delete", item);
        }
    });
};
</script>

<template>
    <div class="overflow-x-auto border bg-white rounded-lg">
        <table class="w-full text-sm min-w-[500px]">
            <thead>
                <tr class="text-xs uppercase text-thin divide-x bg-gray-50">
                    <th class="p-2 w-12">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
                    </th>
                    <!-- Dynamic headers slot -->
                    <slot name="headers"></slot>
                    <th class="p-2 w-48">
                        <IconSettings :stroke="2" size="18" class="mx-auto" />
                    </th>
                    <th class="p-2">#id</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="item in items"
                    :key="item.id"
                    class="hover:bg-slate-50 border-t divide-x border-slate-200 dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"
                >
                    <td class="p-2 text-center">
                        <Checkbox
                            class="mx-auto"
                            :checked="selectedItems.includes(item.id)"
                            @update:checked="() => toggleItem(item.id)"
                        />
                    </td>

                    <!-- Dynamic data slot for custom columns -->
                    <slot name="item-data" :item="item"></slot>

                    <!-- Resource Actions -->
                    <td class="p-2">
                        <div class="flex justify-center items-center space-x-3">
                            <Link
                                :href="route(`admin.${model}.show`, item.id)"
                                class="hover:text-green-500 transition-colors duration-150"
                            >
                                <IconSearch :stroke="1" size="18" />
                            </Link>

                            <Link
                                :href="route(`admin.${model}.edit`, item.id)"
                                class="hover:text-indigo-500 transition-colors duration-150"
                            >
                                <IconEdit :stroke="1" size="18" />
                            </Link>

                            <IconTrash
                                :stroke="1"
                                size="18"
                                class="hover:text-red-500 cursor-pointer transition-colors duration-150"
                                @click.prevent="confirmDelete(item)"
                            />
                        </div>
                    </td>

                    <!-- ID Column -->
                    <td class="p-2 text-center text-gray-500">
                        {{ item.id }}
                    </td>
                </tr>
            </tbody>

            <tfoot v-if="meta.links && meta.links.length > 3">
                <!-- Pagination Row: Only displays if there are multiple pages -->
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
    </div>
</template>

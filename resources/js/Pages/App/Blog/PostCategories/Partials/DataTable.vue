<script setup>
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-vue";
import { ref, watch } from "vue";
import Swal from "sweetalert2";
import Checkbox from "@/Components/Checkbox.vue";
import BadgeStatus from "@/Components/BadgeStatus.vue";
import ImagePreview from "@/Components/ImagePreview.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    items: Array,
    selectedItems: Array,
    meta: Object,
});

const emit = defineEmits(["update:selectedItems", "delete"]);

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
                <tr class="text-xs uppercase text-slate-600 divide-x">
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
                    </th>
                    <th class="p-3 w-[80px]">Img</th>
                    <th class="p-3 text-start">Title</th>
                    <th class="p-3 text-start">{{ $t("Parent") }}</th>
                    <th class="p-3 w-48">Status</th>
                    <th class="p-3 w-48">
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
                        <Checkbox
                            class="mx-auto"
                            :checked="selectedItems.includes(item.id)"
                            @update:checked="() => toggleItem(item.id)"
                        />
                    </td>
                    <td class="p-1">
                        <ImagePreview class="mx-auto" :data="item" />
                    </td>
                    <td class="p-2">
                        {{ item.title }}
                    </td>
                    <td class="p-2 text-sm">
                        <span v-if="item.parent">{{ item.parent.title }}</span>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.public" />
                        </div>
                    </td>
                    <td class="p-2">
                        <div
                            class="inline-flex items-center w-full justify-center space-x-2"
                        >
                            <Link
                                :href="
                                    route('admin.post-categories.edit', item.id)
                                "
                            >
                                <IconEdit
                                    :stroke="1"
                                    size="18"
                                    class="text-indigo-500 cursor-pointer"
                                />
                            </Link>
                            <IconTrash
                                :stroke="1"
                                size="18"
                                class="text-red-500 cursor-pointer"
                                preserve-scroll
                                preserve-state
                                @click.prevent="confirmDelete(item)"
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

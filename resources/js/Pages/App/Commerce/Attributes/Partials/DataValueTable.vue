<script setup>
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-vue";
import { ref, watch } from "vue";
import Checkbox from "@/Components/Checkbox.vue";
import BadgeStatus from "@/Components/BadgeStatus.vue";
import ImagePreview from "@/Components/ImagePreview.vue";

const props = defineProps({
    items: Array,
    selectedItems: Array,
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
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.public" />
                        </div>
                    </td>
                    <td class="p-2">
                        <div
                            class="inline-flex items-center w-full justify-center space-x-2"
                        >
                            <IconEdit
                                :stroke="1"
                                size="18"
                                class="text-indigo-500 cursor-pointer"
                                @click="emit('edit', item)"
                            />
                            <IconTrash
                                :stroke="1"
                                size="18"
                                class="text-red-500 cursor-pointer"
                                preserve-scroll
                                preserve-state
                                @click.prevent="emit('delete', item)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

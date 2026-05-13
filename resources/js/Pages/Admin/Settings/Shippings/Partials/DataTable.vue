<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import Checkbox from "@/Components/UI/Checkbox.vue";
import {
    IconEdit,
    IconSettings,
    IconTrash,
} from "@tabler/icons-vue";
import Swal from "sweetalert2";

// defineProps та defineEmits імпортувати НЕ потрібно
const props = defineProps({
    items: { type: Array, default: () => [] },
    selectedItems: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) },
    model: { type: String, default: "shippings" },
});

const emit = defineEmits(["update:selectedItems", "delete", "toggle-status"]);

const startCount = computed(() => props.meta?.from || 1);

const toggleAll = computed({
    get: () => props.items.length > 0 && props.selectedItems.length === props.items.length,
    set: (val) => emit("update:selectedItems", val ? props.items.map((i) => i.id) : [])
});

const toggleItem = (id) => {
    const updated = props.selectedItems.includes(id)
        ? props.selectedItems.filter((itemId) => itemId !== id)
        : [...props.selectedItems, id];
    emit("update:selectedItems", updated);
};

const confirmDelete = async (item) => {
    const result = await Swal.fire({
        title: "Ви впевнені?",
        text: "Цей метод доставки буде видалено!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Так, видалити!",
        cancelButtonText: "Скасувати"
    });

    if (result.isConfirmed) {
        emit("delete", item);
    }
};
</script>

<template>
    <div class="overflow-x-auto border bg-white rounded-lg shadow-sm">
        <table class="w-full text-sm text-left">
            <thead>
                <tr class="text-xs uppercase text-slate-600 bg-slate-50 divide-x divide-slate-200 border-b">
                    <th class="p-3 w-12 text-center">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
                    </th>
                    <th class="p-3 text-center w-20">#</th>
                    <th class="p-3 text-start">{{ $t("Назва") }}</th>
                    <th class="p-3 text-center w-40">{{ $t("Статус") }}</th>
                    <th class="p-3 w-32 text-center">
                        <IconSettings :stroke="2" size="18" class="mx-auto" />
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
                <tr
                    v-for="(item, key) in items"
                    :key="item.id"
                    class="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50/30"
                >
                    <td class="p-2 text-center">
                        <Checkbox
                            class="mx-auto"
                            :checked="selectedItems.includes(item.id)"
                            @update:checked="() => toggleItem(item.id)"
                        />
                    </td>
                    <td class="p-2 text-center text-gray-500 font-mono">
                        {{ startCount + key }}
                    </td>
                    <td class="p-2">
                        <div class="flex flex-col">
                            <span class="font-semibold text-slate-700">{{ item.title }}</span>
                            <span class="text-xs text-slate-400 font-mono">{{ item.alias }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <button 
                                type="button" 
                                @click="emit('toggle-status', item)"
                                class="cursor-pointer active:scale-95 transition-transform"
                            >
                                <BadgeStatus :active="Boolean(item.is_active)" />
                            </button>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center space-x-3">
                            <Link
                                :href="route(`admin.${model}.edit`, item.id)"
                                class="text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                <IconEdit :stroke="1.5" size="20" />
                            </Link>

                            <button
                                type="button"
                                @click="confirmDelete(item)"
                                class="text-slate-400 hover:text-red-600 transition-colors"
                            >
                                <IconTrash :stroke="1.5" size="20" />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-if="items.length === 0">
                    <td colspan="5" class="p-12 text-center text-gray-400">
                        {{ $t("Методів доставки не знайдено") }}
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="meta?.links && meta.links.length > 3">
                <tr>
                    <td colspan="5" class="border-t">
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
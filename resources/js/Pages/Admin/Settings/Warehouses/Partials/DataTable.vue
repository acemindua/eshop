<script setup>
import Pagination from "@/Components/Pagination.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import Checkbox from "@/Components/UI/Checkbox.vue";
import { Link, router } from "@inertiajs/vue3"; // Не забудь імпортувати Link та router
import {
    IconEdit,
    IconSearch,
    IconSettings,
    IconTrash,
    IconMapPin,
    IconPhone,
} from "@tabler/icons-vue";
import Swal from "sweetalert2";
import { ref, watch } from "vue";

const props = defineProps({
    items: Array,
    selectedItems: Array,
    meta: Object,
    model: {
        type: String,
        default: "settings.warehouses", // Шлях для роутів: admin.settings.warehouses...
    },
});

const count = ref(props?.meta?.from || 0);
const emit = defineEmits(["update:selectedItems", "delete"]);

const toggleAll = ref(false);

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

const toggleItem = (id) => {
    const updated = props.selectedItems.includes(id)
        ? props.selectedItems.filter((itemId) => itemId !== id)
        : [...props.selectedItems, id];
    emit("update:selectedItems", updated);
};

/**
 * Quick toggle status
 */
const toggleStatus = (id) => {
    router.patch(
        route(`admin.${props.model}.toggle`, id),
        {},
        {
            preserveScroll: true,
        },
    );
};

/**
 * Confirm before delete
 */
const confirmDelete = async (item) => {
    const result = await Swal.fire({
        title: "Ви впевнені?",
        text: "Цей склад буде видалено назавжди!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Так, видалити!",
        cancelButtonText: "Скасувати",
    });

    if (result.isConfirmed) {
        emit("delete", item);
    }
};
</script>

<template>
    <div class="overflow-x-auto border bg-white rounded-lg shadow-sm">
        <table class="w-full text-sm">
            <thead>
                <tr
                    class="text-xs uppercase text-slate-600 bg-slate-50 divide-x border-b"
                >
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
                    </th>
                    <th class="p-3 text-center w-16">#</th>
                    <th class="p-3 text-start">{{ $t("Склад / Локація") }}</th>
                    <th class="p-3 text-start w-48">{{ $t("Контакти") }}</th>
                    <th class="p-3 text-center w-32">{{ $t("Статус") }}</th>
                    <th class="p-3 w-32">
                        <IconSettings :stroke="2" size="18" class="mx-auto" />
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
                <tr
                    v-for="(item, key) in items"
                    :key="item.id"
                    class="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50/50"
                >
                    <td class="p-3 text-center">
                        <Checkbox
                            class="mx-auto"
                            :checked="selectedItems.includes(item.id)"
                            @update:checked="() => toggleItem(item.id)"
                        />
                    </td>
                    <td class="p-3 text-center text-gray-400 font-mono text-xs">
                        {{ count + key }}
                    </td>
                    <td class="p-3">
                        <div class="flex flex-col">
                            <span
                                class="font-bold text-slate-900 leading-tight"
                                >{{ item.title }}</span
                            >
                            <div
                                class="flex items-center text-xs text-slate-500 mt-1"
                            >
                                <IconMapPin
                                    size="12"
                                    class="mr-1 inline text-slate-400"
                                />
                                <span>{{ item.city }}, {{ item.address }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="p-3">
                        <div class="text-xs space-y-1">
                            <p
                                v-if="item.phone"
                                class="flex items-center text-slate-600"
                            >
                                <IconPhone
                                    size="12"
                                    class="mr-1 text-slate-400"
                                />
                                {{ item.phone }}
                            </p>
                            <p v-if="item.area" class="text-slate-400 italic">
                                {{ item.area }} обл.
                            </p>
                        </div>
                    </td>
                    <td class="p-3">
                        <div class="flex justify-center">
                            <button
                                @click="toggleStatus(item.id)"
                                class="focus:outline-none"
                            >
                                <BadgeStatus :active="item.is_active" />
                            </button>
                        </div>
                    </td>
                    <td class="p-3">
                        <div
                            class="flex justify-center items-center space-x-3 text-slate-400"
                        >
                            <Link
                                :href="route(`admin.${model}.edit`, item.id)"
                                class="hover:text-indigo-600 transition-colors"
                                title="Редагувати"
                            >
                                <IconEdit :stroke="1.5" size="20" />
                            </Link>

                            <button
                                @click.prevent="confirmDelete(item)"
                                class="hover:text-red-600 transition-colors"
                                title="Видалити"
                            >
                                <IconTrash :stroke="1.5" size="20" />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-if="items.length === 0">
                    <td
                        colspan="100%"
                        class="p-8 text-center text-slate-400 italic"
                    >
                        Складів поки не додано...
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="meta.links && meta.links.length > 3">
                <tr>
                    <td colspan="100%" class="border-t bg-slate-50/50">
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

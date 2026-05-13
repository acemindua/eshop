<script setup>
import Pagination from "@/Components/Pagination.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import Checkbox from "@/Components/UI/Checkbox.vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import UserStatus from "@/Components/UserStatus.vue";
import {
    IconEdit,
    IconSearch,
    IconSettings,
    IconTrash,
} from "@tabler/icons-vue";
import { ref, watch } from "vue";

import Swal from "sweetalert2";
import useLocales from "@/Composables/useLocales";

const props = defineProps({
    items: Array,
    selectedItems: Array,
    meta: Object,
    model: String,
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

const getIconLokale = (locale) => {
    if (!locale) return "gb";
    const { state } = useLocales();
    // Пріоритет 1: Дивимось у localesMapping (uk -> ua)
    if (state.mapping[locale]) {
        return state.mapping[locale];
    }

    // Пріоритет 2: Дивимось у supportedLocales -> regional (uk_UA -> ua)
    const supported = state.locales[locale];
    if (supported && supported.regional) {
        return supported.regional.split("_")[1].toLowerCase();
    }
    return "gb";
};
</script>

<template>
    <div class="overflow-x-auto border bg-white rounded-lg">
        <table class="w-full text-sm min-w-[500px]">
            <thead>
                <tr class="text-xs uppercase text-slate-600 text-thin divide-x">
                    <th class="p-3 w-12">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
                    </th>
                    <th class="p-3 text-center w-24">#</th>
                    <th class="py-3 text-center w-24">{{ $t("ava") }}</th>

                    <th class="p-3 text-start w-full md:w-auto">
                        {{ $t("Title") }}
                    </th>
                    <th class="p-3 text-center w-48">{{ $t("Status") }}</th>
                    <th class="p-3 w-48">
                        <IconSettings :stroke="2" size="18" class="mx-auto" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="items.length > 0"
                    v-for="(item, key) in items"
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
                    <td class="p-2 text-center text-gray-500">
                        {{ $formatSerial(count + key) }}
                    </td>
                    <th class="p-1">
                        <div
                            class="relative flex items-center justify-center w-12 h-12 mx-auto"
                        >
                            <ImageDataView
                                :src="item?.avatar"
                                :configs="{ width: '36px', height: '36px' }"
                            />

                            <div
                                class="absolute bottom-1 right-1 border-0 rounded-full w-5 h-5 flex items-center justify-center bg-white"
                            >
                                <!-- Прапорець як бейдж -->
                                <flag
                                    :iso="getIconLokale(item?.locale) || 'gb'"
                                    :title="item?.locale || 'gb'"
                                    class="rounded-full"
                                />
                            </div>
                        </div>
                    </th>
                    <td class="p-2">
                        <div class="flex flex-col">
                            <p class="font-semibold">{{ item.name }}</p>
                            <UserStatus
                                :user="{
                                    is_online: item.online,
                                    last_activity: item.last_activity,
                                }"
                                size="sm"
                            />
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.public" />
                        </div>
                    </td>
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
    </div>
</template>

<script setup>
import Pagination from "@/Components/Pagination.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import Checkbox from "@/Components/UI/Checkbox.vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import {
    IconEdit,
    IconLink,
    IconSearch,
    IconSettings,
    IconTrash,
} from "@tabler/icons-vue";
import Swal from "sweetalert2";
import { ref, watch, computed } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    items: Array,
    selectedItems: Array,
    meta: Object,
    model: String, // 'items', 'payment-methods', 'pages'
});

const count = ref(props?.meta?.from || 0);
const emit = defineEmits(["update:selectedItems", "edit", "delete"]);

const toggleAll = ref(false);

// Шлях до маршрутів залежно від моделі
const modelPath = computed(() => {
    const paths = {
        "payment-methods": "settings.payment-methods",
        shippings: "settings.shippings",
        items: "commerce.items",
        categories: "commerce.categories",
    };
    return paths[props.model] || props.model;
});

watch(toggleAll, (val) => {
    emit("update:selectedItems", val ? props.items.map((i) => i.id) : []);
});

const toggleItem = (id) => {
    const updated = props.selectedItems.includes(id)
        ? props.selectedItems.filter((itemId) => itemId !== id)
        : [...props.selectedItems, id];
    emit("update:selectedItems", updated);
};

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
    <div class="overflow-x-auto border bg-white rounded-none shadow-sm">
        <table class="w-full text-sm">
            <thead>
                <tr
                    class="text-[10px] uppercase text-slate-500 font-bold bg-slate-50 divide-x border-b"
                >
                    <th class="p-3 w-12 text-center">
                        <Checkbox class="mx-auto" v-model:checked="toggleAll" />
                    </th>
                    <th class="p-3 text-center w-16">#</th>

                    <th v-if="model === 'items'" class="py-3 text-center w-20">
                        {{ $t("Media") }}
                    </th>

                    <th class="p-3 text-start">{{ $t("Title") }}</th>

                    <template v-if="model === 'items'">
                        <th class="p-3 text-start">{{ $t("Category") }}</th>
                        <th class="p-3 text-center w-24">{{ $t("Price") }}</th>
                    </template>

                    <template v-if="model === 'payment-methods'">
                        <th class="p-3 text-start w-32">{{ $t("Code") }}</th>
                        <th class="p-3 text-center w-24">{{ $t("Fee") }}</th>
                    </template>

                    <th class="p-3 text-center w-32">{{ $t("Status") }}</th>

                    <th class="p-3 w-32 text-center">
                        <IconSettings :stroke="2" size="16" class="mx-auto" />
                    </th>
                    <th class="p-3 text-center w-20">{{ $t("ID") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="items?.length > 0"
                    v-for="(item, key) in items"
                    :key="item.id"
                    class="group hover:bg-slate-50 border-t border-slate-100 transition-colors"
                >
                    <td class="p-2 text-center">
                        <Checkbox
                            class="mx-auto"
                            :checked="selectedItems.includes(item.id)"
                            @update:checked="() => toggleItem(item.id)"
                        />
                    </td>
                    <td class="p-2 text-center text-gray-400 font-mono text-xs">
                        {{ $formatSerial(count + key) }}
                    </td>

                    <td v-if="model === 'items'" class="p-1 text-center">
                        <ImageDataView :src="item.images?.[0]?.preview" />
                    </td>

                    <td class="p-2">
                        <div class="flex flex-col">
                            <Link
                                :href="
                                    route(`admin.${modelPath}.edit`, item.id)
                                "
                                class="font-semibold text-gray-900 hover:text-brand transition"
                            >
                                {{ item.title }}
                            </Link>
                            <a
                                v-if="item.slug"
                                :href="`${$page.props.app.url}/${item.slug}`"
                                target="_blank"
                                class="text-[10px] text-gray-400 hover:text-indigo-500 inline-flex items-center space-x-1"
                            >
                                <IconLink size="12" />
                                <span>/{{ item.slug }}</span>
                            </a>
                        </div>
                    </td>

                    <template v-if="model === 'items'">
                        <td class="p-2 text-xs text-gray-500 italic">
                            {{ item.category?.title }}
                        </td>
                        <td class="p-2 text-center font-bold text-red-500">
                            {{ item.price }}
                        </td>
                    </template>

                    <template v-if="model === 'payment-methods'">
                        <td class="p-2 font-mono text-xs text-blue-600">
                            {{ item.code }}
                        </td>
                        <td class="p-2 text-center text-gray-600">
                            {{ item.commission_percent }}%
                        </td>
                    </template>

                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus
                                :active="item.public ?? item.is_active"
                            />
                        </div>
                    </td>

                    <td class="p-2">
                        <div
                            class="flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Link
                                :href="
                                    route(`admin.${modelPath}.show`, item.id)
                                "
                                class="p-1 hover:text-brand"
                            >
                                <IconSearch :stroke="1.5" size="18" />
                            </Link>
                            <Link
                                :href="
                                    route(`admin.${modelPath}.edit`, item.id)
                                "
                                class="p-1 hover:text-indigo-500"
                            >
                                <IconEdit :stroke="1.5" size="18" />
                            </Link>
                            <button
                                @click.prevent="confirmDelete(item)"
                                class="p-1 hover:text-red-500"
                            >
                                <IconTrash :stroke="1.5" size="18" />
                            </button>
                        </div>
                    </td>
                    <td class="p-2 text-center text-gray-400 text-xs italic">
                        {{ item.id }}
                    </td>
                </tr>
                <tr v-else>
                    <td
                        colspan="100%"
                        class="p-10 text-center text-gray-400 italic"
                    >
                        {{ $t("No items found") }}
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="meta.links && meta.links.length > 3">
                <tr>
                    <td colspan="100%" class="border-t p-2">
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

<style scoped>
.text-brand {
    color: #10b981;
}
.hover\:text-brand:hover {
    color: #10b981;
}
</style>

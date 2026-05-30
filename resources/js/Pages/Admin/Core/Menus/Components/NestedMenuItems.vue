<!-- resources/js/Pages/Admin/Core/Menus/Components/NestedMenuItems.vue -->
<script setup>
import draggable from "vuedraggable";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import {
    IconGripVertical,
    IconTrash,
    IconPlus,
    IconEdit,
    IconLink,
    IconFileText,
    IconFolder,
} from "@tabler/icons-vue";

const props = defineProps({
    modelValue: { type: Array, required: true },
    depth: { type: Number, default: 1 },
});

const emit = defineEmits(["update:modelValue", "addChild", "editItem"]);

const pageProps = usePage().props;
// Поточна мова адміна (наприклад, 'uk')
const currentLocale = computed(() => pageProps.config?.currentLocale || "uk");

const onDragChange = (sortedList) => {
    const updated = sortedList.map((item, index) => ({
        ...item,
        order: index,
    }));
    emit("update:modelValue", updated);
};

const removeItem = (index) => {
    const copy = [...props.modelValue];
    copy.splice(index, 1);
    const updated = copy.map((item, index) => ({ ...item, order: index }));
    emit("update:modelValue", updated);
};

const getLinkTypeBadge = (item) => {
    if (item.link_type === "custom")
        return {
            text: "URL",
            bg: "bg-amber-50 text-amber-700 border-amber-200",
        };
    if (item.model_type?.includes("Page"))
        return {
            text: "Сторінка",
            bg: "bg-teal-50 text-teal-700 border-teal-200",
        };
    if (item.model_type?.includes("Category"))
        return {
            text: "Категорія",
            bg: "bg-blue-50 text-blue-700 border-blue-200",
        };
    return {
        text: "Не вказано",
        bg: "bg-gray-50 text-gray-500 border-gray-200",
    };
};
</script>

<template>
    <draggable
        :list="props.modelValue"
        item-key="id"
        handle=".drag-handle"
        group="menu-items"
        ghost-class="opacity-30 border-indigo-400 bg-indigo-50/30"
        @change="onDragChange(props.modelValue)"
        class="space-y-2.5"
    >
        <template #item="{ element, index }">
            <div class="group/item transition-all duration-200">
                <div
                    class="flex items-center justify-between border border-gray-200 rounded-xl bg-white p-3.5 hover:border-gray-300 hover:shadow-xs"
                >
                    <div class="flex items-center space-x-3 flex-1 min-w-0">
                        <div
                            class="drag-handle cursor-grab active:cursor-grabbing p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                        >
                            <IconGripVertical class="w-4 h-4" />
                        </div>

                        <div
                            class="p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-500"
                        >
                            <IconLink
                                v-if="element.link_type === 'custom'"
                                class="w-4 h-4"
                            />
                            <IconFileText
                                v-else-if="element.model_type?.includes('Page')"
                                class="w-4 h-4"
                            />
                            <IconFolder v-else class="w-4 h-4" />
                        </div>

                        <div class="flex flex-col min-w-0">
                            <!-- Показуємо назву поточною мовою системи, якщо немає — беремо будь-яку першу наявну -->
                            <span
                                class="text-sm font-medium text-gray-900 truncate"
                            >
                                {{
                                    element.label[currentLocale] ||
                                    element.label["uk"] ||
                                    "Без назви"
                                }}
                            </span>
                            <span
                                class="text-xs text-gray-400 font-normal truncate mt-0.5"
                            >
                                {{
                                    element.link_type === "custom"
                                        ? element.url || "Маршрут не вказано"
                                        : "Динамічна сутність ID: " +
                                          (element.model_id || "—")
                                }}
                            </span>
                        </div>

                        <span
                            :class="[
                                'text-[10px] px-2 py-0.5 font-medium rounded-md border',
                                getLinkTypeBadge(element).bg,
                            ]"
                        >
                            {{ getLinkTypeBadge(element).text }}
                        </span>
                    </div>

                    <div class="flex items-center space-x-1 pl-4">
                        <button
                            type="button"
                            @click="emit('editItem', element)"
                            class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                            <IconEdit class="w-4 h-4" />
                        </button>
                        <button
                            v-if="depth < 3"
                            type="button"
                            @click="emit('addChild', element)"
                            class="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                            <IconPlus class="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            @click="removeItem(index)"
                            class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <IconTrash class="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div
                    v-if="element.children && element.children.length > 0"
                    class="mt-2.5 ml-8 pl-4 border-l-2 border-gray-100 space-y-2.5"
                >
                    <NestedMenuItems
                        v-model="element.children"
                        :depth="depth + 1"
                        @addChild="(target) => emit('addChild', target)"
                        @editItem="(target) => emit('editItem', target)"
                    />
                </div>
            </div>
        </template>
    </draggable>
</template>

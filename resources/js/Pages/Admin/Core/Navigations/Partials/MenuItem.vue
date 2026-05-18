<script setup>
import draggable from "vuedraggable";

const props = defineProps({
    item: Object,
    index: Number,
    list: Array,
});
</script>

<template>
    <div class="menu-item-group mt-1.5">
        <!-- Основна картка елемента -->
        <div
            class="flex justify-between items-center px-3 py-2 bg-white border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition-all group"
        >
            <div class="flex items-center gap-3">
                <!-- Іконка перетягування: тепер стриманіша -->
                <div class="cursor-move text-slate-300 hover:text-slate-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 8h16M4 16h16"
                        />
                    </svg>
                </div>

                <div class="flex flex-col leading-tight">
                    <span
                        class="text-[12px] font-bold text-slate-700 tracking-tight"
                    >
                        {{
                            item.label?.uk ||
                            item.original_item?.title ||
                            item.model?.title ||
                            "Без назви"
                        }}
                    </span>
                    <span
                        v-if="item.model_type || item.url"
                        class="text-[9px] font-mono text-slate-400 uppercase tracking-tighter"
                    >
                        {{
                            item.model_type
                                ? item.model_type.split("\\").pop()
                                : item.url
                        }}
                    </span>
                </div>
            </div>

            <!-- Кнопка видалення: більш мінімалістична -->
            <button
                @click="list.splice(index, 1)"
                class="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all opacity-0 group-hover:opacity-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <!-- Вкладені елементи (Рекурсія) -->
        <div
            v-if="item.children"
            class="ml-6 mt-1.5 pl-3 border-l border-slate-200 border-dashed"
        >
            <draggable
                v-model="item.children"
                item-key="id"
                group="menuItems"
                :animation="150"
                ghost-class="ghost-item"
                class="min-h-[5px]"
            >
                <template #item="{ element, index: childIndex }">
                    <MenuItem
                        :item="element"
                        :index="childIndex"
                        :list="item.children"
                    />
                </template>
            </draggable>
        </div>
    </div>
</template>

<style scoped>
/* Зона для висадки вкладених елементів */
.min-h-\[5px\]:empty {
    height: 12px;
    margin: 4px 0;
    background: repeating-linear-gradient(
        45deg,
        #f8fafc,
        #f8fafc 5px,
        #f1f5f9 5px,
        #f1f5f9 10px
    );
    border-radius: 4px;
    border: 1px solid #e2e8f0;
}

/* Прибираємо "скачки" при наведенні */
.group:hover {
    transform: translateY(-1px);
}
</style>

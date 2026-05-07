<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import {
    IconRocket,
    IconCalendar,
    IconCircleCheck,
    IconCircleDashed,
    IconArrowRight,
    IconLock,
} from "@tabler/icons-vue";

const props = defineProps({
    versions: { type: Array, default: () => [] },
});

const processedVersions = computed(() => {
    return [...props.versions]
        .map((v) => {
            // Якщо бекенд чомусь не прислав stats, рахуємо самі
            const total = v.items_count ?? v.items?.length ?? 0;
            const completed =
                v.completed_items_count ??
                v.items?.filter((i) => i.is_completed).length ??
                0;
            const percent =
                total > 0 ? Math.round((completed / total) * 100) : 0;

            return { ...v, progress_percent: percent };
        })
        .sort((a, b) => {
            if (a.status !== "completed" && b.status === "completed") return -1;
            if (a.status === "completed" && b.status !== "completed") return 1;
            return b.version.localeCompare(a.version, undefined, {
                numeric: true,
            });
        });
});

const getItemColor = (type) => {
    const colors = {
        feature: "text-emerald-500",
        fix: "text-rose-500",
        improvement: "text-blue-500",
    };
    return colors[type] || "text-slate-400";
};
</script>

<template>
    <div
        class="bg-white border rounded-lg shadow-sm overflow-hidden text-slate-900"
    >
        <!-- Header -->
        <div class="bg-slate-50 border-b p-3 flex justify-between items-center">
            <h3
                class="text-xs uppercase font-bold text-slate-600 tracking-wider"
            >
                {{ $t("Latest Updates") }}
            </h3>
            <IconRocket size="16" class="text-indigo-500" />
        </div>

        <div class="p-4 relative">
            <div v-if="processedVersions.length > 0" class="space-y-6 relative">
                <!-- Вертикальна лінія -->
                <div
                    class="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"
                ></div>

                <div
                    v-for="version in processedVersions"
                    :key="version.id"
                    class="relative pl-8"
                >
                    <!-- МАРКЕР СТАТУСУ -->
                    <div
                        class="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-colors"
                        :class="{
                            'bg-emerald-500': version.status === 'completed',
                            'bg-amber-400': version.status === 'active',
                            'bg-slate-300': version.status === 'draft',
                        }"
                    >
                        <IconCircleCheck
                            v-if="version.status === 'completed'"
                            size="12"
                            class="text-white"
                        />
                        <IconCircleDashed
                            v-else
                            size="12"
                            class="text-white"
                            :class="{
                                'animate-spin-slow':
                                    version.status === 'active',
                            }"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span
                                    class="font-mono font-bold text-sm text-indigo-600"
                                    >v{{ version.version }}</span
                                >
                                <IconLock
                                    v-if="version.status === 'completed'"
                                    size="12"
                                    class="text-slate-300"
                                />
                            </div>
                            <!-- ТЕКСТ ДАТИ АБО СТАТУСУ -->
                            <span
                                v-if="version.status === 'completed'"
                                class="text-[10px] text-slate-400 flex items-center gap-1"
                            >
                                <IconCalendar size="12" />
                                {{ version.released_at_human }}
                            </span>
                            <span
                                v-else
                                class="text-[10px] font-bold uppercase tracking-tighter"
                                :class="
                                    version.status === 'active'
                                        ? 'text-amber-500'
                                        : 'text-slate-400'
                                "
                            >
                                {{
                                    version.status === "active"
                                        ? $t("In Progress")
                                        : $t("Draft")
                                }}
                            </span>
                        </div>

                        <!-- ПРОГРЕС БАР -->
                        <div
                            class="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden"
                        >
                            <div
                                class="h-full transition-all duration-1000 ease-out"
                                :class="
                                    version.status === 'completed'
                                        ? 'bg-emerald-400'
                                        : 'bg-indigo-500'
                                "
                                :style="{
                                    width: `${version.progress_percent}%`,
                                }"
                            ></div>
                        </div>

                        <!-- ЗАВДАННЯ -->
                        <ul
                            v-if="version.items?.length"
                            class="mt-2 space-y-1.5 text-[11px]"
                        >
                            <li
                                v-for="item in version.items.slice(0, 5)"
                                :key="item.id"
                                class="flex items-start gap-2"
                            >
                                <span
                                    :class="getItemColor(item.type)"
                                    class="mt-0.5 flex-shrink-0"
                                >
                                    <IconCircleCheck
                                        v-if="item.is_completed"
                                        size="10"
                                    />
                                    <span v-else class="px-1 text-[8px]"
                                        >●</span
                                    >
                                </span>
                                <span
                                    class="line-clamp-2"
                                    :class="
                                        item.is_completed
                                            ? 'text-slate-400 line-through'
                                            : 'text-slate-700'
                                    "
                                >
                                    {{ item.content }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

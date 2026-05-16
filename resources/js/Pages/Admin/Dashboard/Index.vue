<template>
    <Head title="Dashboard" />

    <div class="space-y-6">
        <!-- Статистика -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Користувачі -->
            <div class="bg-white border rounded-xl p-5 shadow-sm">
                <div class="flex items-center justify-between">
                    <span
                        class="text-[10px] font-bold uppercase text-slate-400 tracking-wider"
                        >{{ $t("Users") }}</span
                    >
                    <div class="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                        <IconUsers size="18" />
                    </div>
                </div>
                <div class="mt-2 flex items-baseline gap-2">
                    <span class="text-2xl font-black text-slate-800">{{
                        stats.users.total
                    }}</span>
                    <span class="text-[10px] font-bold text-emerald-500"
                        >+{{ stats.users.new_this_month }}</span
                    >
                </div>
                <div class="text-[10px] text-slate-400 mt-1 italic">
                    {{ $t("active this month") }}
                </div>
            </div>

            <!-- Товари в наявності -->
            <div class="bg-white border rounded-xl p-5 shadow-sm">
                <div class="flex items-center justify-between">
                    <span
                        class="text-[10px] font-bold uppercase text-slate-400 tracking-wider"
                        >{{ $t("Items") }}</span
                    >
                    <div class="p-2 bg-emerald-50 rounded-lg text-emerald-500">
                        <IconPackage size="18" />
                    </div>
                </div>
                <div class="mt-2 flex items-baseline gap-2">
                    <span class="text-2xl font-black text-slate-800">{{
                        stats.items.total
                    }}</span>
                    <span class="text-[10px] font-bold text-slate-400"
                        >{{ stats.items.active }} {{ $t("public") }}</span
                    >
                </div>
                <div
                    class="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden"
                >
                    <div
                        class="bg-emerald-500 h-full"
                        :style="{
                            width:
                                (stats.items.active / stats.items.total) * 100 +
                                '%',
                        }"
                    ></div>
                </div>
            </div>

            <!-- Попередження про склад -->
            <div class="bg-white border rounded-xl p-5 shadow-sm">
                <div class="flex items-center justify-between">
                    <span
                        class="text-[10px] font-bold uppercase text-slate-400 tracking-wider"
                        >{{ $t("Stock Alert") }}</span
                    >
                    <div class="p-2 bg-rose-50 rounded-lg text-rose-500">
                        <IconAlertTriangle size="18" />
                    </div>
                </div>
                <div class="mt-2">
                    <span
                        class="text-2xl font-black"
                        :class="
                            stats.items.out_of_stock > 0
                                ? 'text-rose-600'
                                : 'text-slate-800'
                        "
                    >
                        {{ stats.items.out_of_stock }}
                    </span>
                    <span
                        class="ml-2 text-[10px] font-bold text-slate-400 uppercase"
                        >{{ $t("Out of stock") }}</span
                    >
                </div>
            </div>

            <!-- Оцінка складу -->
            <div class="bg-white border rounded-xl p-5 shadow-sm">
                <div class="flex items-center justify-between">
                    <span
                        class="text-[10px] font-bold uppercase text-slate-400 tracking-wider"
                        >{{ $t("Inventory Value") }}</span
                    >
                    <div class="p-2 bg-amber-50 rounded-lg text-amber-500">
                        <IconCurrencyDollar size="18" />
                    </div>
                </div>
                <div class="mt-2">
                    <span class="text-2xl font-black text-slate-800">
                        {{
                            new Intl.NumberFormat("uk-UA").format(
                                stats.ecommerce.total_value,
                            )
                        }}
                    </span>
                    <span class="ml-1 text-xs font-bold text-slate-400">₴</span>
                </div>
            </div>
        </section>

        <!-- Контент -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
                <!-- Місце для графіків -->
                <div
                    class="bg-white border rounded-xl shadow-sm overflow-hidden h-[400px] flex flex-col"
                >
                    <div
                        class="p-4 border-b bg-slate-50/50 flex justify-between items-center"
                    >
                        <h3
                            class="text-xs uppercase font-bold text-slate-500 tracking-widest"
                        >
                            {{ $t("Inventory Overview") }}
                        </h3>
                        <div class="flex gap-2">
                            <div
                                class="w-3 h-3 rounded-full bg-indigo-500"
                            ></div>
                            <span class="text-[10px] text-slate-500"
                                >Sales</span
                            >
                        </div>
                    </div>
                    <div
                        class="flex-grow flex items-center justify-center italic text-slate-300 text-sm"
                    >
                        [ Тут буде Chart.js графік ]
                    </div>
                </div>
            </div>

            <!-- Права колонка: Timeline -->
            <div class="lg:col-span-1">
                <VersionsTimeline :versions="versions" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { Head } from "@inertiajs/vue3";
import VersionsTimeline from "@/Components/Admin/VersionsTimeline.vue";
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import {
    IconUsers,
    IconPackage,
    IconAlertTriangle,
    IconCurrencyDollar,
} from "@tabler/icons-vue";

defineProps({
    versions: Array,
    stats: Object,
});

defineOptions({ layout: Layout });
</script>

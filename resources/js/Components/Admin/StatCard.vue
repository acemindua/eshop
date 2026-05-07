<!-- Components/Admin/StatCard.vue -->
<template>
    <div
        class="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
    >
        <div class="flex justify-between items-start">
            <div>
                <div
                    class="uppercase text-slate-400 text-[10px] font-bold tracking-widest leading-tight"
                >
                    {{ title }}
                </div>
                <div
                    class="text-2xl font-black text-slate-800 mt-1 leading-none"
                >
                    {{ Number(value).toLocaleString() }}
                </div>
                <div
                    v-if="subValue"
                    class="text-[10px] text-slate-400 mt-2 font-medium"
                >
                    {{ subValue }}
                </div>
            </div>
            <div :class="`p-2 rounded-lg bg-${color}-50 text-${color}-500`">
                <!-- Тут можна вставити іконку через Tabler Icons або просто заглушку -->
                <component :is="iconComponent" size="20" />
            </div>
        </div>
    </div>
</template>

<script setup>
// Імпортуйте іконки за потреби
defineProps(["title", "value", "subValue", "icon", "color"]);
</script>

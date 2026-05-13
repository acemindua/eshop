<script setup>
import { IconMapPin } from "@tabler/icons-vue";

const props = defineProps({
    warehouses: Array,
    warehouseName: String, // v-model:warehouseName
    errors: Object
});

const emit = defineEmits(['update:warehouseName', 'update:cityName']);

const select = (w) => {
    emit('update:cityName', w.city);
    emit('update:warehouseName', w.address);
};
</script>

<template>
    <div class="border-x border-b border-black p-8 bg-zinc-50 animate-in fade-in duration-300">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="w in warehouses" :key="w.id"
                @click="select(w)"
                class="p-6 border transition-all duration-300 cursor-pointer flex items-center justify-between group"
                :class="warehouseName === w.address ? 'bg-black text-white border-black' : 'bg-white border-zinc-200 hover:border-black'">

                <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest opacity-60">{{ w.city }}</span>
                    <span class="text-[13px] font-bold mt-1 uppercase">{{ w.address }}</span>
                </div>
                <IconMapPin size="20" />
            </div>
        </div>
        <p v-if="errors.warehouse" class="text-red-500 text-[10px] font-black uppercase mt-4 tracking-widest">
            {{ $t(errors.warehouse) }}
        </p>
    </div>
</template>

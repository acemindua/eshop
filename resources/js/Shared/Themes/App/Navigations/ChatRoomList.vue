<template>
    <div class="inline-flex items-center px-1 mt-2 mb-4 font-semibold">
        <span class="text-light text-gray-900">{{ $t("Messages") }}</span>
    </div>

    <div class="inline-flex items-center space-x-2">
        <!-- <div class="relative p-1 text-orange-600 cursor-pointer">
            <IconMessageDots :stroke="1" :size="32" />
            <span
                class="text-xs bg-orange-600 text-white font-semibold w-4 h-4 shadow-sm absolute bottom-1 right-1 rounded-full text-center"
            >
                2
            </span>
        </div> -->
        <div class="relative p-1 text-[#24A1DE] cursor-pointer">
            <IconBrandTelegram :stroke="1" :size="32" />
            <!--  <span
                class="text-xs bg-orange-600 text-white font-semibold w-4 h-4 shadow-sm absolute bottom-1 right-1 rounded-full text-center"
            >
                2
            </span> -->
        </div>

        <!-- <div class="relative p-1 text-[#25D366] cursor-pointer">
            <IconBrandWhatsapp :stroke="1" :size="32" />
            <span
                class="text-xs bg-orange-600 text-white font-semibold w-4 h-4 shadow-sm absolute bottom-1 right-1 rounded-full text-center"
            >
                1
            </span>
        </div> -->
    </div>
</template>

<script setup>
import {
    IconBrandTelegram,
    IconBrandWhatsapp,
    IconMessageDots,
} from "@tabler/icons-vue";
</script>

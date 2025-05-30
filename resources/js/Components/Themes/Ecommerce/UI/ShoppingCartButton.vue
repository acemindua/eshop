<template>
    <button
        @click="open = !open"
        class="inline-flex items-center bg-gray-100 py-2 rounded-lg relative px-3"
    >
        <p class="block md:ml-3">
            <svg-icon
                type="mdi"
                :path="mdiCartOutline"
                class="w-6 h-6"
            ></svg-icon>
        </p>

        <p class="font-semibold hidden md:block px-4">{{ $t("Cart") }}</p>

        <p class="absolute -top-1 end-1 font-montserrat">
            <span
                class="rounded-full bg-orange-500 text-xs border-2 border-white text-white w-5 h-5 inline-flex justify-center items-center text-center"
                >5</span
            >
        </p>
    </button>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline } from "@mdi/js";
import { ref } from "vue";

const open = ref(false);
</script>

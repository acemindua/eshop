<template>
    <div
        class="w-10 h-10 transition-colors"
        :style="{
            maskImage: `url(${Logo})`,
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
            webkitMaskImage: `url(${Logo})`,
            webkitMaskRepeat: 'no-repeat',
            webkitMaskSize: 'contain',
        }"
    ></div>
</template>

<script setup>
import Logo from "@/Images/logo.svg";
</script>

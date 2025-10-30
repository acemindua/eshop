<template>
    <div
        class="flex items-center justify-center bg-gray-100 w-full min-h-screen text-sm text-gray-800"
    >
        <div>
            <ApplicationLogo />
            <slot />
        </div>
    </div>
</template>

<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

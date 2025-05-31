<template>
    <img
        :src="logoSrc"
        :alt="$page.props.app.name"
        class="bg-white rounded-full"
    />
</template>

<script setup>
import logoSrc from "@/Images/logo.svg";
</script>

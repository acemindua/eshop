<template>
    <div class="w-10 h-10 bg-brand logo-mask"></div>
</template>

<script setup></script>
<style scoped>
.logo-mask {
    mask-image: url("@/Images/logo.svg");
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;

    -webkit-mask-image: url("@/Images/logo.svg");
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    -webkit-mask-position: center;
}
</style>

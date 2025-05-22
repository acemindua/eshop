<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

<template>
    <div class="inline-flex items-center space-x-2 py-4">
        <Link href="/" class="inline-flex items-center space-x-2">
            <ApplicationLogo
                class="block h-9 w-auto fill-current text-red-600"
            />
            <span class="font-semibold">{{ $page.props.app.name }}</span>
        </Link>
    </div>
</template>

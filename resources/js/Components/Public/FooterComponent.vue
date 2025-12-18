<template>
    <div class="py-8 text-sm text-gray-500 border-t">
        <p class="text-center md:text-left">
            &copy;{{ new Date().getFullYear() }}
            <Link href="/" class="hover:underline duration-150 transition">
                <span class="font-play font-semibold">{{
                    $page.props?.app?.name
                }}</span> </Link
            >. {{ $t("All rights reserved") }}.
        </p>
    </div>
</template>

<script setup>
defineProps({
    locale: String,
});
</script>

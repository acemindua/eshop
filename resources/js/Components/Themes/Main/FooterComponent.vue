<!-- // FooterComponent.vue -->
<template>
    <div class="md:flex items-center justify-center md:justify-between">
        <div class="text-center md:text-start py-2">
            {{ `© ${year} ${name}` }}.
            {{ $t("All rights reserved.") }}
        </div>
        <div class="text-center md:text-start py-2">
            <a
                href="http://apisoft.com.ua"
                target="_blank"
                class="inline-flex space-x-2 items-center"
            >
                <p class="flex flex-col text-end">
                    <span class="text-xs text-green-500">Handmade by:</span>
                    <span class="font-semibold">apiSoft</span>
                </p>
                <img
                    src="https://apisoft.com.ua/storage/apisoft.svg"
                    alt="apiSoft"
                    class="w-10 h-10"
                />
            </a>
        </div>
    </div>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();
const name = computed(() => page.props.app.name || "Laravel");
const now = new Date();
const year = computed(() => page.props.app.year || now.getFullYear()); //
</script>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import { IconHomeFilled } from "@tabler/icons-vue";
import { Link } from "@inertiajs/vue3"; // Підключаємо Link

const breadcrumbs = computed(() => usePage().props.breadcrumbs || []);
</script>

<template>
    <nav aria-label="breadcrumb" class="text-xs">
        <ol v-if="breadcrumbs.length" class="breadcrumb breadcrumb-arrows flex">
            <li
                v-for="(page, index) in breadcrumbs"
                :key="index"
                class="breadcrumb-item flex items-center"
            >
                <!-- Стрілочка перед не останніми елементами -->
                <span
                    v-if="index > 0"
                    class="px-2 text-slate-500 flex items-center"
                >
                    ‹
                </span>

                <!-- Сам текст або іконка Home -->
                <component
                    :is="page.current ? 'span' : Link"
                    :href="!page.current ? page.url : undefined"
                    class="flex items-center"
                    :class="{
                        'text-slate-500': page.current,
                        'hover:underline': !page.current,
                    }"
                >
                    <!--  <IconHomeFilled
                        v-if="page.title === $t('Home')"
                        class="w-4 h-4"
                        stroke="{1}"
                    /> -->
                    <span>{{ page.title }}</span>
                </component>
            </li>
        </ol>
    </nav>
</template>

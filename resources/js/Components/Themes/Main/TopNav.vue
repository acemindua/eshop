<template>
    <div class="flex items-center justify-between">
        <ul role="list" class="inline-flex items-center">
            <li v-if="hasMultipleLocales">
                <LocaleSwicher
                    :currentLocale="mappedCurrentLocale"
                    :keys="localeKeysMapped"
                />
            </li>
        </ul>
        <ul role="list" class="inline-flex items-center divide-x">
            <li class="inline-flex space-x-1 pr-4">
                <IconPhone :stroke="1" :size="20" class="text-green-500" />
                <a href="tel:+380982925252">098 292 5252</a>
            </li>

            <li class="px-4">
                <NavLink
                    :href="`/about-us`"
                    :active="$page.url === '/contacts'"
                    >{{ $t("Про нас") }}</NavLink
                >
            </li>
            <li class="pl-4">
                <NavLink
                    :href="`/contacts`"
                    :active="$page.url === '/contacts'"
                    >{{ $t("Контакти") }}</NavLink
                >
            </li>
        </ul>
    </div>
</template>

<script setup>
import { IconPhone } from "@tabler/icons-vue";
import LocaleSwicher from "./LocaleSwicher.vue";
import NavLink from "@/Components/Themes/Main/UI/NavLink.vue";
import useLocales from "@/utils/locales";

const props = defineProps({
    locales: {
        type: Object,
    },
});

const { hasMultipleLocales, mappedCurrentLocale, localeKeysMapped } =
    useLocales(props.locales);
</script>

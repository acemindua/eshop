<template>
    <Popover v-if="hasMultipleLocales" v-slot="{ open }" class="relative">
        <PopoverButton
            :class="open ? 'text-slate-600' : 'text-slate-600'"
            class="group space-x-1 inline-flex items-center rounded-md px-3 text-sm hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
            <span class="uppercase">{{ mappedCurrentLocale }}</span>
            <IconChevronDown :stroke="1" :size="16" />
        </PopoverButton>

        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
        >
            <PopoverPanel class="absolute left-0 z-10">
                <ul
                    class="relative flex flex-col bg-white rounded-lg shadow px-4 mt-2"
                >
                    <li
                        v-for="(label, code) in locales"
                        :key="code"
                        as="template"
                    >
                        <Link
                            v-if="code !== currentLocale"
                            :href="route('lang.swicher', code)"
                            @click.prevent="loadLanguageAsync(code)"
                            class="inline-flex space-x-2 items-center text-sm hover:text-indigo-600 py-2"
                        >
                            <span class="uppercase">{{
                                mappedLocale(code)
                            }}</span>
                        </Link>
                    </li>
                </ul>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import useLocales from "@/Stores/useLocales";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { IconChevronDown } from "@tabler/icons-vue";
import { loadLanguageAsync } from "laravel-vue-i18n";

const {
    locales,
    hasMultipleLocales,
    currentLocale,
    mappedLocale,
    mappedCurrentLocale,
} = useLocales();
</script>

<template>
    <Popover v-if="count" v-slot="{ open }" class="relative">
        <PopoverButton
            :class="open ? 'text-slate-600' : 'text-slate-600'"
            class="group space-x-2 inline-flex items-center rounded-md px-3 text-sm hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
            <IconWorld stroke="{2}" :size="24" />
            <span class="capitalize">{{ native }}</span>
            <IconChevronDown stroke="{2}" :size="24" />
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
                <div
                    class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                >
                    <div class="relative block bg-white p-4">
                        <div
                            v-for="(lang, code) in languages"
                            :key="code"
                            as="template"
                        >
                            <Link
                                :href="route('lang.swicher', code)"
                                @click.prevent="loadLanguageAsync(code)"
                                class="inline-flex space-x-2 items-center text-sm hover:text-indigo-600 mb-2"
                            >
                                <span class="capitalize">{{
                                    lang.native
                                }}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { IconWorld, IconChevronDown } from "@tabler/icons-vue";
import { loadLanguageAsync } from "laravel-vue-i18n";

const page = usePage();
const languages = page.props.lang.locales;
const locale = page.props.lang.default;
const native = computed(() => {
    return languages[locale].native;
});
const count = computed(() => {
    return Object.keys(languages).length > 1 ? true : false;
});
</script>

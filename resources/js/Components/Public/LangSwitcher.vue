<template>
    <div
        v-if="hasMultipleLocales"
        class="relative inline-block text-left text-sm border"
    >
        <Menu>
            <MenuButton class="py-2 pl-3 uppercase inline-flex items-center">
                <span>{{ currentMappedLocale }}</span>
                <IconChevronDown stroke="{2}" />
            </MenuButton>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems
                    class="absolute right-0 mt-2 bg-white rounded-md shadow-lg"
                >
                    <MenuItem
                        v-for="(code, locale) in localeKeysMapped"
                        :key="code"
                        as="div"
                        v-slot="{ close }"
                    >
                        <button
                            ref="switcher"
                            @click.prevent="switchLanguage(locale)"
                            @click="close"
                            class="inline-flex items-center px-4 py-2 uppercase hover:text-blue-500 transition-colors duration-100"
                        >
                            <span>{{ code }}</span>
                        </button>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { loadLanguageAsync } from "laravel-vue-i18n";
import useLocales from "@/Composables/useLocales";
import { router } from "@inertiajs/vue3";
import { IconChevronDown } from "@tabler/icons-vue";

const { hasMultipleLocales, currentMappedLocale, localeKeysMapped } =
    useLocales();

const switchLanguage = async (locale) => {
    router.visit(route("locale.switcher", locale));
    try {
        await loadLanguageAsync(locale);
    } catch (error) {
        console.error(`Ошибка при загрузке языка ${code}:`, error);
    }
};
</script>

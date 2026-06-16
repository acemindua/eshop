<template>
    <div
        v-if="hasMultipleLocales"
        class="relative inline-block text-left text-sm"
    >
        <Menu v-slot="{ open }">
            <MenuButton
                class=" rounded-full pl-2 py-[2px] bg-gray-100 uppercase font-semibold text-gray-500 inline-flex items-center"
            >
                <span>{{ currentMappedLocale }}</span
                ><IconChevronDown
                    class="transition-transform text-gray-600 duration-200 w-4 h-4"
                    :class="open ? 'rotate-180' : ''"
                    :stroke="1"
                />
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
                    class="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-[1000]"
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
import { router, usePage } from "@inertiajs/vue3";
import { IconChevronDown } from "@tabler/icons-vue";
import { computed } from "vue";

const currentLocale = computed(() => {
    return usePage().props?.config?.currentLocale || "en";
});

const { hasMultipleLocales, currentMappedLocale, localeKeysMapped } =
    useLocales(currentLocale);

const switchLanguage = async (locale) => {
    // Спочатку робимо запит до бекенду для зміни сесії
    router.visit(route("locale.switcher", locale), {
        preserveScroll: true,
        onSuccess: async () => {
            // Після успішного завершення візиту підвантажуємо json-переклади для фронтенду
            try {
                await loadLanguageAsync(locale);
            } catch (error) {
                // Виправлено: code змінено на locale
                console.error(`Error loading language ${locale}:`, error);
            }
        },
    });
};
</script>

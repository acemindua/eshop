<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import { IconX } from "@tabler/icons-vue";
import LocaleSwicher from "./LocaleSwicher.vue";
import useLocales from "@/utils/locales";

const props = defineProps({
    show: { type: Boolean, default: false },
    locales: Object,
});
const emit = defineEmits(["close"]);

const { mappedCurrentLocale, localeKeysMapped } = useLocales(props.locales);

/**
 * Забороняємо прокрутку body при відкритому меню
 */
watch(
    () => props.show,
    (isOpen) => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }
);

onUnmounted(() => {
    // На всяк випадок очищаємо при знятті компонента
    document.body.style.overflow = "";
});
</script>

<template>
    <transition name="slide-left">
        <div
            v-if="show"
            class="fixed inset-0 z-50 bg-white flex flex-col w-full sm:max-w-sm h-full shadow-lg"
        >
            <div class="flex items-center justify-between p-2 border-b">
                <LocaleSwicher
                    :currentLocale="mappedCurrentLocale"
                    :keys="localeKeysMapped"
                />
                <button @click="$emit('close')" class="p-2">
                    <IconX :stroke="2" />
                </button>
            </div>

            <div class="flex-grow p-4 overflow-y-auto">
                <p class="text-gray-600 text-center mt-10">
                    Тут буде навігація або категорії
                </p>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all 0.3s ease;
}
.slide-left-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-left-enter-to {
    transform: translateX(0%);
    opacity: 1;
}
.slide-left-leave-from {
    transform: translateX(0%);
    opacity: 1;
}
.slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>

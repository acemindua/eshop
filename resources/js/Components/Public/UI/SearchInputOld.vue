<script setup>
import { IconSearch, IconX } from "@tabler/icons-vue";
import { ref, onMounted, onUnmounted } from "vue";

const searchText = ref("");
const focusInput = ref(false);

const handleSubmit = () => {
    if (searchText.value.trim().length > 0) {
        console.log("Searching for:", searchText.value);
        close(); // Закриваємо оверлей після відправки
    }
};

const focus = () => {
    focusInput.value = true;
};

const close = () => {
    focusInput.value = false;
};


</script>
<template>
    <div class="relative w-full" @focusin="focus">
        <form
            @submit.prevent="handleSubmit"
            class="flex items-center w-full relative"
        >
            <div class="relative flex-grow group">
                <IconSearch
                    class="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                    :class="focusInput ? 'text-brand' : 'text-gray-400'"
                    :size="18"
                />

                <input
                    v-model="searchText"
                    type="search"
                    class="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-l-xl outline-none transition-all text-sm"
                    :class="
                        focusInput
                            ? 'bg-white border-brand ring-4 ring-brand/10'
                            : 'hover:border-gray-300'
                    "
                    :placeholder="`${$t('Search')}...`"
                />

                <button
                    v-if="searchText.length > 0"
                    @click="searchText = ''"
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                    <IconX :size="16" />
                </button>
            </div>

            <button
                type="submit"
                class="bg-brand text-white px-5 py-2.5 rounded-r-xl font-bold text-sm"
            >
                <span class="hidden md:inline">{{ $t("Знайти") }}</span>
                <IconSearch :size="18" class="md:hidden" />
            </button>
        </form>

        <div
            v-if="focusInput"
            class="absolute left-0 right-0 top-full w-full mt-2"
        >
            <div
                class="bg-white border border-gray-100 shadow-2xl rounded-xl p-4"
            >
                Результати пошуку...
            </div>
        </div>
    </div>

    <Teleport to="body">
        <Transition name="fade">
            <div
                v-if="focusInput"
                class="fixed inset-0 bg-black/40 z-50 h-screen w-screen"
                @click="close"
            ></div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { IconSearch, IconShoppingCart } from "@tabler/icons-vue";

// Імпорт компонентів
import ApplicationLogo from "../ApplicationLogo.vue";
import MegaMenu from "./MegaMenu.vue";
import ButtonCatalog from "./UI/Buttons/ButtonCatalog.vue";
import SearchInput from "./UI/SearchInput.vue";
import UserLoginRegisterForm from "./UserLoginRegisterForm.vue";

defineProps({
    locale: { type: String, default: "en" },
});

const catalogMenuOpen = ref(false);

// Функція закриття всіх активних елементів
const closeAll = () => {
    catalogMenuOpen.value = false;
};

// Обробка клавіші Escape
const handleEscape = (e) => {
    if (e.key === "Escape") closeAll();
};

// Блокування скролу при відкритому каталозі
watch(catalogMenuOpen, (isOpen) => {
    if (typeof document !== "undefined") {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }
});

onMounted(() => window.addEventListener("keydown", handleEscape));
onUnmounted(() => window.removeEventListener("keydown", handleEscape));
</script>

<template>
    <header class="sticky top-0 transition-all duration-300 z-50">
        <div class="container mx-auto px-4 py-3">
            <div class="flex items-center gap-3 md:gap-4 relative w-full">
                <Link
                    href="/"
                    class="flex items-center gap-2 shrink-0 group"
                    @click="closeAll"
                >
                    <div
                        class="p-2 bg-brand rounded-xl shadow-lg shadow-brand/20 transition-transform group-hover:scale-105"
                    >
                        <ApplicationLogo
                            class="w-6 h-6 bg-white fill-current"
                        />
                    </div>
                    <span
                        class="font-black text-xl text-gray-900 hidden lg:block tracking-tighter uppercase italic"
                    >
                        {{ $page.props.app.name }}
                    </span>
                </Link>

                <div class="">
                    <ButtonCatalog
                        :open="catalogMenuOpen"
                        @click="catalogMenuOpen = !catalogMenuOpen"
                    />
                    <MegaMenu
                        :locale="locale"
                        :visible="catalogMenuOpen"
                        @close="closeAll"
                    />
                </div>

                <div class="flex-grow hidden md:block">
                    <SearchInput @close="" />
                </div>

                <div class="flex items-center gap-2 md:gap-3 ml-auto">
                    <button
                        class="md:hidden p-2 text-gray-600"
                        @click="closeAll"
                    >
                        <IconSearch :size="22" />
                    </button>

                    <UserLoginRegisterForm @click="closeAll" />

                    <Link
                        href="/cart"
                        class="relative p-2.5 bg-brand/10 text-brand rounded-xl group"
                        @click="closeAll"
                    >
                        <IconShoppingCart :size="22" stroke="2.5" />
                        <span
                            class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform shadow-sm"
                        >
                            0
                        </span>
                    </Link>
                </div>
            </div>

            <div class="mt-3 md:hidden">
                <SearchInput  />
            </div>
        </div>
    </header>
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

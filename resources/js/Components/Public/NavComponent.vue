<template>
    <div>
        <div class="container mx-auto px-2">
            <nav class="flex gap-4 md:gap-6 py-3">
                <Link
                    href="/"
                    class="flex items-center gap-2 shrink-0 group md:pr-12"
                    @click="closeAll"
                >
                    <div class="">
                        <ApplicationLogo
                            class="w-10 h-10 bg-brand fill-current"
                        />
                    </div>

                    <span class="font-semibold hidden md:block">{{
                        $page.props?.app?.name
                    }}</span>
                </Link>

                <ButtonCatalog
                    class="hidden md:block"
                    :open="catalogMenu"
                    @click="toggleCatalogMenu"
                />

                <div class="md:relative z-[60] flex flex-col flex-grow">
                    <SearchInput
                        @focus="hadleFocus"
                        @search="goSearch($event)"
                    />

                    <div v-if="inputFocus">
                        <SerchContainer :locale="locale" @close="closeAll" />
                    </div>
                </div>

                <div class="hidden md:flex items-center gap-4">
                    <UserLoginRegisterForm />
                </div>
            </nav>

            <div v-if="catalogMenu">
                <MegaMenu :locale="locale" @close="closeAll" />
            </div>

            <div v-if="mobileCatalogMenu">
                <MobileMegaMenu :locale="locale" @close="closeAll" />
            </div>
        </div>
    </div>

    <Teleport to="body">
        <div class="md:hidden fixed bottom-0 left-0 w-full p-2">
            <div
                class="flex gap-6 items-center justify-center bg-white p-2 shadow-lg rounded-full"
            >
                <Link
                    :href="`/`"
                    class="flex flex-col items-center"
                    :class="{ 'text-brand': isHomePage && !mobileCatalogMenu }"
                >
                    <IconHomeFilled v-if="isHomePage" :size="24" :stroke="2" />
                    <IconHome v-else :size="24" :stroke="2" />
                    <span class="text-xs font-semibold tracking-tight">{{
                        $t("Home")
                    }}</span>
                </Link>
                <button
                    class="flex flex-col items-center"
                    :class="{ 'text-brand': mobileCatalogMenu }"
                    @click="mobileCatalogMenu = !mobileCatalogMenu"
                >
                    <IconCategory
                        v-if="!mobileCatalogMenu"
                        :size="24"
                        :stroke="2"
                    />
                    <IconCategoryFilled v-else :size="24" :stroke="2" />
                    <span class="text-xs font-semibold tracking-tight">{{
                        $t("Catalog")
                    }}</span>
                </button>
                <UserLoginRegisterForm />
            </div>
        </div>
        <Transition name="fade">
            <div
                v-if="catalogMenu || inputFocus"
                class="fixed inset-0 bg-black/10 z-[10]"
                @click="closeAll"
            />
        </Transition>
    </Teleport>
</template>

<script setup>
import { router, usePage } from "@inertiajs/vue3";
import { computed, onMounted, onUnmounted, ref } from "vue";
import ButtonCatalog from "./UI/Buttons/ButtonCatalog.vue";
import ApplicationLogo from "../ApplicationLogo.vue";
import MegaMenu from "./MegaMenu.vue";
import SearchInput from "./UI/SearchInput.vue";
import SerchContainer from "./SerchContainer.vue";
import UserLoginRegisterForm from "./UserLoginRegisterForm.vue";
import {
    IconCategory,
    IconCategoryFilled,
    IconHome,
    IconHomeFilled,
    IconX,
} from "@tabler/icons-vue";
import MobileMegaMenu from "./MobileMegaMenu.vue";

const props = defineProps({
    locale: {
        type: String,
        default: "en",
    },
});
const page = usePage();
const isHomePage = computed(() => {
    const url = page.url;
    return /^\/(?:[a-z]{2}\/?)?$/.test(url);
});

/** */
const catalogMenu = ref(false);
const mobileCatalogMenu = ref(false);
const inputFocus = ref(false);

const toggleCatalogMenu = () => {
    catalogMenu.value = !catalogMenu.value;
    inputFocus.value = false;
};
const hadleFocus = () => {
    inputFocus.value = true;
    catalogMenu.value = false;
};

const closeAll = () => {
    catalogMenu.value = false;
    inputFocus.value = false;
};

// Закриття при натисканні Escape
const handleEsc = (e) => {
    if (e.key === "Escape") closeAll();
};

onMounted(() => window.addEventListener("keydown", handleEsc));
onUnmounted(() => window.removeEventListener("keydown", handleEsc));

const goSearch = (e) => {
    closeAll();
    router.get(
        route("search"),
        { q: e }, // Передаємо чистий рядок
        {
            preserveState: true,
        }
    );
};
</script>

<style scoped>
/* Анімація появи меню */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.25s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* Анімація фону */
.fade-enter-active,
.fade-overlay-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

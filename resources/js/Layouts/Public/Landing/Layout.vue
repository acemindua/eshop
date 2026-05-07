<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import CartButton from "@/Components/Public/Commerce/CartButton.vue";
import LangSwitcher from "@/Components/Public/LangSwitcher.vue";
import SerchContainer from "@/Components/Public/SerchContainer.vue";
import SearchInput from "@/Components/Public/UI/SearchInput.vue";
import UserLoginRegisterForm from "@/Components/Public/UserLoginRegisterForm.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { router } from "@inertiajs/vue3";

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
        },
    );
};
</script>

<template>
    <div class="flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2">
        <header class="bg-white p-4">
            <div class="w-full mx-auto">
                <nav
                    class="inline-flex gap-4 justify-between items-center w-full px-4"
                >
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
                    <div
                        class="md:relative z-[60] flex flex-col flex-grow max-w-xl"
                    >
                        <SearchInput
                            @focus="hadleFocus"
                            @search="goSearch($event)"
                        />

                        <div v-if="inputFocus">
                            <SerchContainer
                                :locale="locale"
                                @close="closeAll"
                            />
                        </div>
                    </div>
                    <div class="hidden md:flex items-center gap-4">
                        <user-login-register-form />
                        <cart-button />
                        <lang-switcher />
                    </div>
                </nav>
            </div>
        </header>

        <div class="bg-white p-4">
            <Breadcrumbs />
        </div>

        <main class="flex-grow px-2">
            <div class="w-full mx-auto">
                <slot />
            </div>
        </main>

        <footer class="bg-white p-4">
            <div class="w-full mx-auto">#footer (Copyright/Info)</div>
        </footer>
        <Teleport to="body">
            <Transition name="fade">
                <div
                    v-if="catalogMenu || inputFocus"
                    class="fixed inset-0 bg-black/10 z-[10]"
                    @click="closeAll"
                /> </Transition
        ></Teleport>
    </div>
</template>

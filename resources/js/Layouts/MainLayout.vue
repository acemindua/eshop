<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed, ref, inject, onMounted } from "vue";

// Components
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import EmptyCart from "@/Components/Themes/Ecommerce/EmptyCart.vue";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import FooterNavigations from "@/Components/Themes/Main/FooterNavigations.vue";
import HeaderComponent from "@/Components/Themes/Main/HeaderComponent.vue";
import Container from "@/Components/Themes/Main/Layout/Container.vue";
import TopNav from "@/Components/Themes/Main/TopNav.vue";
import MobileNavigations from "../Components/Themes/Main/MobileNavigations.vue";

const page = usePage();
const cartStore = inject("cartStore");

const isHome = computed(() => page.component.startsWith("Main/Home"));
const locales = computed(() => page.props.lang || {});
const catalogVisible = ref(false);
const cartEmptyVisible = ref(false);
const mobileMenuVisible = ref(false);

const cartState = computed(() => cartStore?.state || {});

onMounted(() => {
    cartStore?.fetchCart?.();
});

const toggleCatalog = () => {
    catalogVisible.value = !catalogVisible.value;
};

const toggleCart = () => {
    cartEmptyVisible.value = !cartEmptyVisible.value;
};

const toggleMenu = () => {
    mobileMenuVisible.value = !mobileMenuVisible.value;
};
</script>

<template>
    <div
        class="flex flex-col min-h-screen w-full text-sm bg-gray-100 text-gray-950"
    >
        <!-- Top Nav (Desktop) -->
        <div class="hidden md:block border-b relative z-40 bg-white">
            <Container class="py-2">
                <TopNav :locales="locales" class="text-sm text-gray-700" />
            </Container>
        </div>

        <!-- Overlay for catalog -->
        <div
            v-show="catalogVisible"
            class="fixed inset-0 bg-gray-800 bg-opacity-10 transition-opacity duration-300"
            @click="toggleCatalog"
            aria-hidden="true"
        />

        <!-- Header -->
        <header class="sticky top-0 z-40 bg-white shadow-sm">
            <Container>
                <HeaderComponent
                    :cart="cartState"
                    :catalogOpen="catalogVisible"
                    @toggleCatalog="toggleCatalog"
                    @toggleCart="toggleCart"
                />
            </Container>

            <!-- Catalog dropdown -->
            <Transition name="slide-down">
                <div
                    v-show="catalogVisible"
                    class="absolute left-0 top-full w-full z-30 bg-white shadow-md overflow-hidden"
                >
                    <Container class="py-12">
                        <h2 class="text-lg font-semibold">Каталог меню</h2>
                        <ul class="mt-4 space-y-2">
                            <li><a href="#">Категорія 1</a></li>
                            <li><a href="#">Категорія 2</a></li>
                            <li><a href="#">Категорія 3</a></li>
                        </ul>
                    </Container>
                </div>
            </Transition>
        </header>

        <!-- Mobile Menu -->
        <MobileNavigations
            :locales="locales"
            :show="mobileMenuVisible"
            @close="toggleMenu"
        />

        <!-- Breadcrumbs -->
        <div v-if="!isHome" class="py-4">
            <Container><Breadcrumbs /></Container>
        </div>

        <!-- Main content -->
        <main class="flex-grow">
            <Container>
                <slot />
            </Container>
        </main>

        <!-- Footer -->
        <footer class="text-gray-600 bg-white border-t">
            <Container class="py-6">
                <FooterComponent />
            </Container>
        </footer>

        <!-- Empty cart modal -->
        <EmptyCart :show="cartEmptyVisible" @close="toggleCart" />

        <!-- Footer navigation (Mobile) -->
        <div class="md:hidden sticky bottom-0 bg-white border-t">
            <FooterNavigations
                :cart="cartState"
                :catalogOpen="catalogVisible"
                @toggleCatalog="toggleCatalog"
                @toggleCart="toggleCart"
                @toggleMenu="toggleMenu"
            />
        </div>
    </div>
</template>

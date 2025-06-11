<script setup>
import { computed, ref, inject, onMounted } from "vue";
import { usePage } from "@inertiajs/vue3";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import HeaderComponent from "@/Components/Themes/Main/HeaderComponent.vue";
import CategoryMenu from "@/Components/Themes/Ecommerce/Layout/CategoryMenu.vue";
import AsideCart from "@/Components/Themes/Ecommerce/AsideCart.vue";
import EmptyCartModal from "@/Components/Themes/Ecommerce/EmptyCartModal.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";

import Services from "@/Components/Themes/Ecommerce/Layout/Services.vue";
import FooterNavigaqtions from "@/Components/Themes/Ecommerce/FooterNavigaqtions.vue";

// Підключення cartStore
const cartStore = inject("cartStore");

const { props } = usePage();
const categories = computed(() => props.responseData.categories.data || []);

const categoriesMenuVisible = ref(false);
const cartContentVisible = computed(() => cartStore.state.isCartOpen);

// Завантажити дані при монтуванні
onMounted(() => {
    cartStore?.fetchCart?.();
});
</script>

<template>
    <div class="bg-slate-100 text-gray-900 w-full min-h-screen">
        <div class="flex flex-col w-full h-full min-h-svh">
            <header class="sticky top-0 z-10">
                <HeaderComponent
                    :catalogOpen="categoriesMenuVisible"
                    :cart="cartStore.state"
                    @toggleCatalog="
                        categoriesMenuVisible = !categoriesMenuVisible
                    "
                    @toggleCart="cartStore.toggleCart()"
                />
                <CategoryMenu
                    :categories="categories"
                    :visible="categoriesMenuVisible"
                    @close="categoriesMenuVisible = false"
                />
            </header>
            <div class="flex flex-col grow md:p-2">
                <div
                    v-if="!route().current('home')"
                    class="w-full container mx-auto py-2"
                >
                    <Breadcrumbs />
                </div>
                <main class="mt-2 md:px-4">
                    <slot />
                </main>
            </div>

            <footer>
                <FooterComponent />
            </footer>

            <div>
                <AsideCart
                    v-if="cartStore.state.itemCount > 0"
                    :cart="cartStore"
                    :visible="cartContentVisible"
                    @close="cartStore.toggleCart()"
                    @remove="(id) => cartStore.removeCartItem(id)"
                />
                <EmptyCartModal
                    v-else-if="cartContentVisible"
                    :visible="true"
                    @close="cartStore.toggleCart()"
                />
            </div>

            <div class="md:hidden sticky bottom-0 z-10 border-t bg-white">
                <FooterNavigaqtions
                    :cart="cartStore.state"
                    @toggleCart="cartStore.toggleCart()"
                />
            </div>
        </div>
    </div>
</template>

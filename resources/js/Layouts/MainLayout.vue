<script setup>
import { computed, ref, inject, onMounted } from "vue";
import { usePage } from "@inertiajs/vue3";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import HeaderComponent from "@/Components/Themes/Main/HeaderComponent.vue";
import CategoryMenu from "@/Components/Themes/Ecommerce/Layout/CategoryMenu.vue";
import AsideCart from "@/Components/Themes/Ecommerce/AsideCart.vue";
import EmptyCartModal from "@/Components/Themes/Ecommerce/EmptyCartModal.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";

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
    <div class="bg-gray-100 flex flex-col w-full min-h-screen">
        <div class="sticky top-0 z-10">
            <HeaderComponent
                :catalogOpen="categoriesMenuVisible"
                :cart="cartStore.state"
                @toggleCatalog="categoriesMenuVisible = !categoriesMenuVisible"
                @toggleCart="cartStore.toggleCart()"
            />
            <CategoryMenu
                :categories="categories"
                :visible="categoriesMenuVisible"
                @close="categoriesMenuVisible = false"
            />
        </div>

        <div v-if="!cartStore.state.isLoading">
            <AsideCart
                v-if="cartStore.state.itemCount > 0"
                :cart="cartStore"
                :visible="cartContentVisible"
                @close="cartStore.toggleCart()"
                @remove="cartStore.removeCartItem(item)"
            />
            <EmptyCartModal
                v-else-if="cartContentVisible"
                :visible="true"
                @close="cartStore.toggleCart()"
            />
        </div>

        <div>
            <div
                v-if="!route().current('home')"
                class="w-full max-w-7xl mx-auto py-4"
            >
                <Breadcrumbs />
            </div>
            <slot />
        </div>
        <FooterComponent />
    </div>
</template>

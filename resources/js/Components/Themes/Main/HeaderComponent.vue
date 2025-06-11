<!--  // HeaderComponent.vue -->
<template>
    <div class="h-20 z-50 bg-white shadow relative">
        <div class="w-full container mx-auto flex h-full">
            <div
                class="flex items-center justify-between h-full px-4 gap-4 w-full"
            >
                <div class="flex items-center justify-center shrink-0">
                    <Link
                        href="/"
                        class="flex items-center space-x-4 md:mr-8 w-full max-w-xl"
                    >
                        <ApplicationLogo
                            class="block h-11 w-auto fill-current text-[#368D02]"
                        />
                        <p class="hidden md:block font-semibold">
                            <span>{{ $page.props.app.name }}</span>
                        </p>
                    </Link>
                </div>
                <div class="hidden md:block">
                    <CategoryButtonMenu
                        id="category-button-menu"
                        :open="catalogOpen"
                        @click="$emit('toggleCatalog')"
                    />
                </div>
                <div class="w-full md:max-w-lg">
                    <SearchFilter @focusin="handleSearchFocus" />
                </div>
                <div class="hidden w-full md:flex items-center justify-end">
                    <ShoppingCartButton
                        :cart="cart"
                        @click="$emit('toggleCart')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CategoryButtonMenu from "@/Components/Themes/Ecommerce/UI/CategoryButtonMenu.vue";
import SearchFilter from "./UI/SearchFilter.vue";
import ShoppingCartButton from "../Ecommerce/UI/ShoppingCartButton.vue";

const props = defineProps({
    catalogOpen: Boolean,
    cart: Object,
});

const emit = defineEmits(["toggleCatalog", "toggleCart"]);
const handleSearchFocus = () => {
    if (props.catalogOpen) emit("toggleCatalog");
};
</script>

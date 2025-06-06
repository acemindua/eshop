<!--  // HeaderComponent.vue -->
<template>
    <div
        class="bg-white shadow-sm px-4 relative h-20 z-50 flex w-full items-center"
    >
        <div class="w-full max-w-7xl mx-auto flex items-center">
            <div class="grid grid-cols-6 gap-4 w-full">
                <Link
                    href="/"
                    class="flex items-center space-x-4 mr-8 w-full max-w-xl"
                >
                    <ApplicationLogo
                        class="block h-8 md:h-11 w-auto fill-current text-[#368D02]"
                    />
                    <p class="hidden md:block">
                        <span>{{ $page.props.app.name }}</span>
                    </p>
                </Link>
                <div class="flex items-center">
                    <CategoryButtonMenu
                        id="category-button-menu"
                        :open="catalogOpen"
                        @click="$emit('toggleCatalog')"
                    />
                </div>

                <div class="col-span-2 flex items-center">
                    <SearchFilter @focusin="handleSearchFocus" />
                </div>
                <div class="col-span-2 flex items-center justify-end">
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

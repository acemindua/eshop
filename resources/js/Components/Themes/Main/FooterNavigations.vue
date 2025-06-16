<template>
    <div class="grid grid-cols-5">
        <!-- Home Button -->
        <div class="flex items-center justify-center">
            <Link href="/" class="flex flex-col items-center justify-center">
                <IconHome :stroke="2" />
                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("system.home") }}
                </p>
            </Link>
        </div>
        <!-- Catalog -->
        <div class="flex items-center justify-center">
            <button
                id="catalog-button-footer"
                :open="catalogOpen"
                @click="$emit('toggleCatalog')"
                :aria-label="$t('Відкрити каталог')"
                class="flex flex-col items-center justify-center"
            >
                <component
                    :is="catalogOpen ? IconX : IconCategory"
                    :stroke="2"
                    class="duration-200"
                />

                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("system.catalog") }}
                </p>
            </button>
        </div>
        <!-- Menu -->
        <div class="flex items-center justify-center">
            <button
                type="button"
                class="flex flex-col items-center justify-center"
                @click="$emit('toggleMenu')"
            >
                <IconMenu2 :stroke="2" />
                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("system.menu") }}
                </p>
            </button>
        </div>
        <!-- Shopping Cart Button -->
        <div class="flex flex-col items-center justify-center">
            <ShoppingCartButton
                :total="cart.total"
                :count="cart.itemCount"
                :loading="cart.isLoading"
                @empty="$emit('toggleCart')"
                :aria-label="$t('Відкрити корзину')"
            />
        </div>
        <!-- Profile Button -->
        <div class="flex items-center justify-center">
            <Link
                href="/profile"
                class="flex flex-col items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("system.profile") }}
                </p>
            </Link>
        </div>
    </div>
</template>

<script setup>
import { IconCategory, IconHome, IconMenu2, IconX } from "@tabler/icons-vue";
import ShoppingCartButton from "../Ecommerce/UI/ShoppingCartButton.vue";

const props = defineProps({
    catalogOpen: Boolean,
    cart: {
        type: Object,
    },
});
const emit = defineEmits(["toggleCatalog", "toggleCart", "toggleMenu"]);
</script>

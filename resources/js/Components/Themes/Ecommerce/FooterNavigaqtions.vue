<template>
    <div class="grid grid-cols-5">
        <!-- Home Button -->
        <div class="flex items-center justify-center py-2">
            <Link href="/" class="flex flex-col items-center justify-center">
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
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                </svg>

                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("Dashboard") }}
                </p>
            </Link>
        </div>
        <!-- Catalog -->
        <div class="flex items-center justify-center py-2">
            <Link href="/" class="flex flex-col items-center justify-center">
                <!--
tags: [folder, menu, tag, game]
category: Shapes
version: "1.70"
unicode: "f1f6"
-->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M4 4h6v6h-6z" />
                    <path d="M14 4h6v6h-6z" />
                    <path d="M4 14h6v6h-6z" />
                    <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>

                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("Catalog") }}
                </p>
            </Link>
        </div>
        <!-- Menu -->
        <div class="flex items-center justify-center py-2">
            <Link href="/" class="flex flex-col items-center justify-center">
                <!--
unicode: "ff43"
version: "3.10"
-->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M10 6h10" />
                    <path d="M4 12h16" />
                    <path d="M7 12h13" />
                    <path d="M4 18h10" />
                </svg>

                <p class="text-xs text-gray-500 md:hidden pt-1">
                    {{ $t("Menu") }}
                </p>
            </Link>
        </div>
        <!-- Shopping Cart Button -->
        <div class="flex flex-col items-center justify-center py-2">
            <ShoppingCartButton :cart="cart" @click="$emit('toggleCart')" />
        </div>
        <!-- Profile Button -->
        <div class="flex items-center justify-center py-2">
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
                    {{ $t("Profile") }}
                </p>
            </Link>
        </div>
    </div>
</template>

<script setup>
import ShoppingCartButton from "../Ecommerce/UI/ShoppingCartButton.vue";

const props = defineProps({
    cart: Object,
});

const emit = defineEmits(["toggleCart"]);
</script>

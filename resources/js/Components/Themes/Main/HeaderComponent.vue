<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import ShoppingCartButton from "../Ecommerce/UI/ShoppingCartButton.vue";
import CatalogButton from "../Ecommerce/UI/CatalogButton.vue";
import InputSearch from "./UI/InputSearch.vue";
import ResultSearch from "./UI/ResultSearch.vue";
import { ref } from "vue";
//
const props = defineProps({
    catalogOpen: Boolean,
    cart: {
        type: Object,
    },
});

const resultSearhVisible = ref(false);
//
const emit = defineEmits(["toggleCatalog", "toggleCart"]);
//
const handleSearchFocus = () => {
    if (props.catalogOpen) emit("toggleCatalog");
    resultSearhVisible.value = true;
};

</script>

<template>
    <div class="flex items-center justify-between gap-4 w-full h-20">
        <div class="md:flex flex-1 items-center gap-4 md:gap-6">
            <div class="hidden md:flex items-center gap-4 md:gap-6">
                <Link href="/" class="flex items-center space-x-4 shrink-0">
                    <ApplicationLogo
                        class="block h-9 md:h-11 w-auto fill-current text-green-500"
                    />
                    <div class="hidden md:flex flex-col">
                        <p class="font-semibold">
                            {{ $page.props.app.name }}
                        </p>
                        <p class="text-xs font-thin text-gray-500">
                            slogan & cool text
                        </p>
                    </div>
                </Link>
                <div class="w-full md:max-w-lg">
                    <CatalogButton
                        id="catalog-button"
                        :open="catalogOpen"
                        @click="$emit('toggleCatalog')"
                        :aria-label="$t('Відкрити каталог')"
                    />
                </div>
            </div>

            <div class="w-full md:max-w-lg px-2">
                <div
                    v-show="resultSearhVisible"
                    class="fixed inset-0 bg-gray-800 opacity-10 transition-opacity"
                    @click="resultSearhVisible = false"
                />

                <InputSearch @focusin="handleSearchFocus" />

                <ResultSearch
                    :open="resultSearhVisible"
                    @close="resultSearhVisible = false"
                />
            </div>
        </div>

        <ul class="hidden md:block">
            <li>
                <ShoppingCartButton
                    :total="cart.total"
                    :count="cart.itemCount"
                    :loading="cart.isLoading"
                    :aria-label="$t('Відкрити корзину')"
                    @empty="$emit('toggleCart')"
                />
            </li>
        </ul>
    </div>
</template>

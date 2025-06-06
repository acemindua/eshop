<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Link } from "@inertiajs/vue3"; // Імпорт Link та usePage
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import AsideCart from "@/Components/Themes/Ecommerce/AsideCart.vue";
import CategoryButton from "@/Components/Themes/Ecommerce/UI/CategoryButton.vue";
import FooterComponent from "@/Components/Themes/Main/FooterComponent.vue";
import CatalogNavigations from "@/Components/Themes/Ecommerce/Layout/CatalogNavigations.vue";
import SearchHeader from "@/Components/Themes/Main/UI/SearchHeader.vue";

const openCatalogNavigation = ref(false);

// Функція для закриття навігації каталогу при кліку поза її межами або натисканні Escape
const handleClickOutside = (event) => {
    const catalogNav = document.getElementById(
        "catalog-navigation-dialog-panel"
    ); // ID DialogPanel
    const categoryBtn = document.getElementById("category-button"); // ID кнопки

    // Перевіряємо, чи клік був поза панеллю каталогу та поза кнопкою, що її відкриває
    if (
        openCatalogNavigation.value && // Тільки якщо меню відкрито
        catalogNav &&
        !catalogNav.contains(event.target) &&
        categoryBtn &&
        !categoryBtn.contains(event.target)
    ) {
        openCatalogNavigation.value = false;
    }
};

const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
        openCatalogNavigation.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<template>
    <div class="bg-slate-200 w-full h-full min-h-svh flex flex-col">
        <div class="bg-white py-2 shadow-sm sticky top-0 z-50">
            <div class="grid grid-cols-8 gap-1 w-full max-w-7xl mx-auto">
                <div class="flex items-center w-full">
                    <Link href="/" class="flex items-center space-x-4 mr-8">
                        <ApplicationLogo
                            class="block h-8 md:h-11 w-auto fill-current text-[#368D02]"
                        />
                        <p class="hidden md:block">
                            <span>{{ $page.props.app.name }}</span>
                        </p>
                    </Link>
                </div>
                <div class="flex items-center w-full">
                    <CategoryButton
                        id="category-button"
                        @click="openCatalogNavigation = !openCatalogNavigation"
                    />
                </div>
                <div class="col-span-2 flex items-center w-full">
                    <SearchHeader />
                </div>

                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div
                class="w-full max-w-7xl mx-auto px-4 relative flex items-center justify-between"
            >
                <ul class="flex items-center gap-4">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>

        <div class="grow p-4">
            <slot />
        </div>

        <div class="border-t p-4">
            <FooterComponent />
        </div>
    </div>

    <AsideCart />

    <CatalogNavigations
        :show="openCatalogNavigation"
        @close="openCatalogNavigation = false"
    />
</template>

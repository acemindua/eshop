<script setup>
import ApplicationLogo from "../ApplicationLogo.vue";
import Navigations from "./Navigations.vue";
import LangSwitcher from "./LangSwitcher.vue";
import MegaMenu from "./MegaMenu.vue";
import ButtonCatalog from "./UI/Buttons/ButtonCatalog.vue";
import UserLoginRegisterForm from "./UserLoginRegisterForm.vue";
import { ref } from "vue";

defineProps({
    locale: {
        type: String,
        default: "en",
    },
});
//
const catalogMenuOpen = ref(false);
</script>

<template>
    <div class="flex items-center justify-between p-2 bg-white">
        <Link href="/">
            <ApplicationLogo />
        </Link>

        <Navigations :locale="locale" />

        <div class="flex items-center space-x-2">
            <UserLoginRegisterForm />
            <LangSwitcher />
        </div>
    </div>

    <div class="border-b py-2 relative">
        <div class="mx-auto container">
            <div class="flex items-center space-x-2 divide-x">
                <Link href="/" class="font-semibold uppercase text-gray-800">{{
                    $page.props.app.name
                }}</Link>
                <ButtonCatalog
                    id="catalog-button"
                    :open="catalogMenuOpen"
                    :aria-label="$t('Open catalog menu')"
                    @click="catalogMenuOpen = !catalogMenuOpen"
                />
            </div>
        </div>
        <MegaMenu
            :locale="locale"
            :visible="catalogMenuOpen"
            @close="catalogMenuOpen = false"
        />
    </div>
</template>

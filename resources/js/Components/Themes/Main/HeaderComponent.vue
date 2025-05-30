<script setup>
import { ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import SearchHeader from "./UI/SearchHeader.vue";
import LoginRegisterFormModal from "./Auth/LoginRegisterFormModal.vue";
import ShoppingCartButton from "../Ecommerce/UI/ShoppingCartButton.vue";

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});

const search = ref("");
</script>

<template>
    <div class="grid grid-cols-4 gap-2">
        <Link href="/" class="inline-flex items-center space-x-2">
            <ApplicationLogo
                class="block h-9 w-auto fill-current text-red-600"
            />
            <span class="font-semibold hidden md:block">{{
                $page.props.app.name
            }}</span>
        </Link>
        <div class="col-span-2">
            <SearchHeader />
        </div>

        <ul class="flex items-center justify-end space-x-4">
            <li><LoginRegisterFormModal /></li>
            <li><ShoppingCartButton /></li>
        </ul>
    </div>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { ref, computed } from "vue";
import { IconUser, IconListCheck, IconUserFilled } from "@tabler/icons-vue";
import AuthModal from "./Auth/AuthModal.vue";

const page = usePage();
const user = computed(() => page.props.auth.user);
const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};
</script>

<template>
    <div class="flex items-center gap-3">
        <Link
            v-if="user"
            :href="route('account')"
            class="flex flex-col items-center hover:text-brand duration-150 rounded-lg"
            :class="{
                'text-brand md:text-gray-800': $page.url.startsWith('/account'),
            }"
        >
            <IconUserFilled
                v-if="$page.url.startsWith('/account')"
                :size="24"
                :stroke="2"
            />
            <IconUser v-else :size="24" :stroke="2" />

            <span class="text-xs font-semibold md:font-normal tracking-tight">{{
                $t("Кабінет")
            }}</span>
        </Link>
        <button
            v-else
            @click="openModal"
            class="flex flex-col items-center hover:text-brand duration-150"
        >
            <IconUser :size="24" :stroke="2" />
            <span class="text-xs font-semibold md:font-normal tracking-tight">{{
                $t("Увійти")
            }}</span>
        </button>
    </div>

    <AuthModal :isOpen="isModalOpen" @close="isModalOpen = false" />
</template>

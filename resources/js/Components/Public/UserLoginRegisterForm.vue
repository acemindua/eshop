<script setup>
import { usePage, Link } from "@inertiajs/vue3";
import { ref, computed } from "vue";
import { IconUser, IconUserFilled } from "@tabler/icons-vue";
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
            class="flex items-center duration-150 rounded-lg gap-2"
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

            <span
                class="hidden md:block text-sm font-semibold tracking-tight group-hover:underline"
                >{{ $t("Кабінет") }}</span
            >
        </Link>
        <button
            v-else
            @click="openModal"
            class="flex items-center gap-2 duration-150 group"
        >
            <IconUser :size="24" :stroke="2" />
            <span
                class="hidden md:block text-sm font-semibold tracking-tight group-hover:underline"
                >{{ $t("Login") }}</span
            >
        </button>
    </div>

    <AuthModal :isOpen="isModalOpen" @close="isModalOpen = false" />
</template>

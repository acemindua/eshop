<template>
    <component
        :is="hasItems ? 'Link' : 'button'"
        :href="hasItems ? '/check-out/cart' : undefined"
        @click="handleClick"
        class="relative md:flex items-center py-2 px-4 rounded md:border"
        aria-label="Open cart"
        type="button"
    >
        <div
            v-if="loading"
            role="status"
            class="flex justify-center items-center"
        >
            <svg
                aria-hidden="true"
                class="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.6c0 27.6-22.4 50-50 50S0 78.2 0 50.6 22.4.6 50 .6s50 22.4 50 50Zm-90.9 0c0 22.6 18.3 40.9 40.9 40.9S91 73.2 91 50.6 72.6 9.7 50 9.7 9.1 28 9.1 50.6Z"
                    fill="currentColor"
                />
                <path
                    d="M94 39c2.4-.6 3.9-3.1 3.1-5.5-1.7-4.7-4.1-9.2-7.2-13.2-4-5.2-9-9.5-14.7-12.8C70.5 4.1 64.3 1.9 57.8 1c-5-.7-10.1-.6-15 .3-2.5.4-4 2.9-3.4 5.3.6 2.4 3.1 3.9 5.5 3.6 3.8-.5 7.7-.5 11.6 0 5.3.8 10.5 2.5 15.2 5.2s8.8 6.4 12 10.6c2.3 2.9 4.1 6 5.4 9.3.9 2.4 3.4 3.8 5.9 3.2Z"
                    fill="currentFill"
                />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>

        <SvgIcon
            v-else
            type="mdi"
            :path="mdiCartOutline"
            class="size-6 mx-auto"
        />

        <p class="font-semibold hidden md:block pl-3 text-sm">
            <span v-if="hasItems">{{ formattedTotal }}<span> ₴</span></span>
            <span v-else>{{ $t("system.cart") }}</span>
        </p>

        <p class="text-xs text-gray-500 md:hidden pt-1">
            {{ $t("system.cart") }}
        </p>

        <p
            v-if="count > 0"
            class="absolute z-10 md:-top-2 md:-right-0 top-1 right-3 bg-green-500 border-2 border-white text-white text-xs rounded-full w-3 md:w-5 h-3 md:h-5 flex justify-center items-center"
        >
            <span class="hidden md:block">{{ count }}</span>
        </p>
    </component>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline } from "@mdi/js";
import { formatPrice } from "@/helpers";
import { computed } from "vue";

const props = defineProps({
    total: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    loading: { type: Boolean, default: false },
});

const emit = defineEmits(["empty"]);

const hasItems = computed(() => props.total > 0);
const formattedTotal = computed(() =>
    formatPrice(props.total, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);

function handleClick(event) {
    if (!hasItems.value) {
        event.preventDefault();
        emit("empty");
    }
}
</script>

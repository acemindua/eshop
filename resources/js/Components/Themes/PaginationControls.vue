<script setup>
import {
    IconArrowNarrowLeftDashed,
    IconArrowNarrowRightDashed,
} from "@tabler/icons-vue";
import { computed } from "vue";

const ELLIPSIS = "…";

const props = defineProps({
    paginationMeta: {
        type: Object,
        required: true,
        default: () => ({
            current_page: 1,
            last_page: 1,
            from: 0,
            to: 0,
            total: 0,
            per_page: 12,
        }),
    },
    paginationLinks: {
        type: Object,
        required: true,
        default: () => ({
            first: null,
            last: null,
            prev: null,
            next: null,
        }),
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["go-to-page"]);

const goToPage = (page) => {
    if (
        typeof page === "number" &&
        page > 0 &&
        page <= props.paginationMeta.last_page &&
        page !== props.paginationMeta.current_page &&
        !props.loading
    ) {
        emit("go-to-page", page);
    }
};

const goToPrevPage = () => goToPage(props.paginationMeta.current_page - 1);
const goToNextPage = () => goToPage(props.paginationMeta.current_page + 1);

const pageNumbers = computed(() => {
    const { current_page, last_page } = props.paginationMeta;
    const maxButtons = 5;
    const pages = [];

    if (last_page <= maxButtons) {
        return Array.from({ length: last_page }, (_, i) => i + 1);
    }

    let start = Math.max(1, current_page - Math.floor(maxButtons / 2));
    let end = Math.min(last_page, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (start > 1) {
        if (start > 2) pages.unshift(ELLIPSIS);
        pages.unshift(1);
    }

    if (end < last_page) {
        if (end < last_page - 1) pages.push(ELLIPSIS);
        pages.push(last_page);
    }

    return pages;
});
</script>

<template>
    <div
        v-if="paginationMeta.last_page > 1"
        class="mt-8 w-full flex flex-wrap justify-between items-center gap-2"
    >
        <button
            @click="goToPrevPage"
            :disabled="!paginationLinks.prev || loading"
            class="px-4 py-2 border rounded-md text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
            <IconArrowNarrowLeftDashed :stroke="2" />
        </button>

        <div class="flex flex-wrap justify-center gap-2">
            <button
                v-for="(page, index) in pageNumbers"
                :key="typeof page === 'number' ? page : `ellipsis-${index}`"
                @click="goToPage(page)"
                :disabled="
                    page === ELLIPSIS ||
                    page === paginationMeta.current_page ||
                    loading
                "
                :class="[
                    'px-4 py-2 text-sm  rounded-lg transition',
                    page === paginationMeta.current_page
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : typeof page === 'number'
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'opacity-50 cursor-not-allowed',
                ]"
            >
                {{ page }}
            </button>
        </div>

        <button
            @click="goToNextPage"
            :disabled="!paginationLinks.next || loading"
            class="px-4 py-2 border rounded-md text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
            <IconArrowNarrowRightDashed :stroke="2" />
        </button>
    </div>
</template>

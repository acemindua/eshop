<template>
    <MainLayout>
        <section>
            <ReviewRatingDisplay
                :model-type="'products'"
                :model-id="item.id"
                @review-added="handleReviewAdded"
            />
        </section>

        <pre>
            {{ item }}
        </pre>
    </MainLayout>
</template>

<script setup>
import { computed } from "vue";
import ReviewRatingDisplay from "@/Components/Review/ReviewRatingDisplay.vue";
import MainLayout from "@/Layouts/MainLayout.vue";

const props = defineProps({
    data: Object,
});

const item = computed(() => props.data.item.data || {});

const handleReviewAdded = () => {
    console.log("handleReviewAdded");
};
</script>

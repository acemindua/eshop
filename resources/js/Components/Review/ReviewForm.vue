<script setup>
import StarRating from "./StarRating.vue";
import { IconBrandTelegram, IconLoader2 } from "@tabler/icons-vue";

const props = defineProps({
    form: { type: Object, required: true },
    isAuthenticated: { type: [Object, Boolean], default: false },
    loading: { type: Boolean, default: false },
});

const emit = defineEmits(["open-auth", "submit"]);
</script>

<template>
    <section class="review-form-container">
        <div
            v-if="!isAuthenticated"
            class="text-center p-6 bg-gray-50 rounded-xl border border-gray-100"
        >
            <p class="text-gray-600 mb-4 text-sm">
                {{ $t("Only registered users can leave reviews.") }}
            </p>
            <button
                @click="$emit('open-auth')"
                class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
                {{ $t("Sign in") }}
            </button>
        </div>

        <form v-else @submit.prevent="$emit('submit')" class="space-y-4">
            <StarRating
                v-model="props.form.rating"
                :readOnly="false"
                :showAverage="false"
            />

            <textarea
                v-model="props.form.review"
                rows="4"
                required
                class="w-full p-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                :placeholder="$t('Share your experience...')"
            ></textarea>

            <button
                type="submit"
                :disabled="loading || props.form.rating === 0"
                class="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-all"
            >
                <IconLoader2 v-if="loading" class="w-5 h-5 animate-spin" />
                <IconBrandTelegram v-else :size="20" stroke="2" />
                <span>{{
                    loading ? $t("Sending...") : $t("Send Review")
                }}</span>
            </button>
        </form>
    </section>
</template>

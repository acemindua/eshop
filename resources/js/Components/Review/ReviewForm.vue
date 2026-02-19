<script setup>
import { reactive, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
// Імпортуємо без фігурних дужок, бо в сервісі export default
import useApiResourceService from "@/Composables/useApiResourceService";
import StarRating from "./StarRating.vue";

const props = defineProps({
    modelType: { type: String, required: true },
    modelId: { type: Number, required: true },
});

const emit = defineEmits(["review-added"]);

const api = useApiResourceService();
const page = usePage();

const auth = computed(() => page.props.auth?.user);

const form = reactive({
    title: "",
    review: "",
    rating: 0,
    model: props.modelType,
    model_id: props.modelId,
    user_id: auth.value?.data?.id || null,
});

const handleSubmit = async () => {
    // Очищаємо помилки перед новим запитом (у тебе errorsRequests)
    api.errorsRequests.value = {};

    if (form.rating === 0) {
        api.errorsRequests.value = { rating: ["Будь ласка, оберіть рейтинг."] };
        return;
    }

    try {
        // Викликаємо storeData (як у твоєму сервісі) і передаємо URL та дані
        //console.log(form);
        const result = await api.storeData("/api/reviews", form);
        console.log(result);
        if (result) {
            form.review = "";
            form.rating = 0;
            emit("review-added");
        }
    } catch (e) {
        // Помилки вже оброблені всередині handleRequest у composable
        console.error("Запит відхилено");
    }
};
</script>

<template>
    <div v-if="auth">
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Оцінка:</label
                >
                <StarRating v-model="form.rating" />

                <!--   <p
                    v-if="api.errorsRequests.value?.rating"
                    class="mt-1 text-sm text-red-600"
                >
                    {{ api.errorsRequests.value.rating[0] }}
                </p> -->
            </div>

            <div class="mb-6">
                <label
                    for="review"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Ваш відгук:</label
                >
                <textarea
                    id="review"
                    v-model="form.review"
                    rows="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Поділіться враженнями..."
                ></textarea>

                <p
                    v-if="api.errorsRequests.value?.review"
                    class="mt-1 text-sm text-red-600"
                >
                    {{ api.errorsRequests.value.review[0] }}
                </p>
            </div>

            <button
                type="submit"
                :disabled="api.loading.value"
                class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-25 transition"
            >
                <span v-if="api.loading.value">Відправка...</span>
                <span v-else>Надіслати відгук</span>
            </button>

            <p
                v-if="api.errorsRequests.value?.general"
                class="mt-3 text-sm text-red-600"
            >
                {{ api.errorsRequests.value.general[0] }}
            </p>
        </form>
    </div>

    <div v-else class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p class="text-sm text-yellow-700">
            Будь ласка,
            <a href="/login" class="font-bold underline">увійдіть</a>, щоб
            залишити відгук.
        </p>
    </div>
</template>

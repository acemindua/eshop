<template>
    <MainLayout>
        <section
            class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-8"
        >
            <div v-if="averageRating !== null" class="flex items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-800 mr-3">
                    Середній рейтинг:
                </h3>
                <StarRating
                    :initial-rating="averageRating"
                    :read-only="true"
                    :show-average="true"
                    :average-rating="averageRating"
                />
                <span class="ml-2 text-gray-600"
                    >({{ reviewsCount }} відгуків)</span
                >
            </div>

            <hr class="my-8 border-t-2 border-gray-200" />

            <div v-if="$page.props.auth.user">
                <ReviewForm
                    :reviewable-type="'products'"
                    :reviewable-id="displayItem.id"
                    @review-added="handleReviewAdded"
                />
            </div>
            <div
                v-else
                class="not-logged-in-message bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-center"
            >
                Будь ласка,
                <a :href="route('login')" class="text-blue-600 hover:underline"
                    >увійдіть</a
                >
                або
                <a
                    :href="route('register')"
                    class="text-blue-600 hover:underline"
                    >зареєструйтесь</a
                >, щоб залишити відгук.
            </div>

            <hr class="my-8 border-t-2 border-gray-200" />

            <ReviewList
                ref="reviewListRef"
                :reviewable-type="'products'"
                :reviewable-id="displayItem.id"
                :current-user="$page.props.auth.user"
                @review-deleted="handleReviewDeleted"
                @edit-review="openEditReviewModal"
            />
        </section>

        <section>
            <div class="p-4 bg-white md:hidden">
                <h1 class="font-semibold">
                    {{ displayItem.title }}
                </h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 md:gap-2 relative">
                <div class="md:p-4 bg-white col-span-5">
                    <ImageSwiperThumbs :images="images" />
                </div>

                <div class="flex flex-col col-span-7">
                    <div class="p-4 md:p-8 bg-white rounded">
                        <div class="flex-col gap-2 hidden md:flex">
                            <h1 class="text-3xl font-semibold">
                                {{ displayItem.title }}
                            </h1>
                            <h4 class="text-gray-600">
                                {{ displayItem.description }}
                            </h4>
                        </div>

                        <div class="grid grid-cols-2 mt-4 text-xs">
                            <div class="flex">
                                <div
                                    v-if="
                                        parseInt(displayItem.quantity) > 0 &&
                                        displayItem.status
                                    "
                                    class="flex items-center space-x-2 bg-green-50 px-2 py-1 rounded-md border border-green-200 text-green-600"
                                >
                                    <IconCircleCheckFilled class="w-5 h-5" />
                                    <span>{{ $t("В наявності") }}</span>
                                </div>
                            </div>
                            <div class="text-gray-600 text-end">
                                {{ `${$t("Код")}: ${displayItem.sku}` }}
                            </div>
                        </div>
                    </div>

                    <div v-if="variant" class="p-4 md:p-8 bg-white my-2">
                        <div
                            v-for="(
                                variantAttr, index
                            ) in displayItem.attributes"
                            :key="index"
                        >
                            <h4 class="font-semibold mb-2">
                                {{ variantAttr.title }}
                            </h4>
                            <ul class="flex items-center space-x-3">
                                <li
                                    v-for="value in variantAttr.values"
                                    :key="value.id"
                                >
                                    <Link
                                        class="block p-2 border rounded-md px-4"
                                        :class="{
                                            'bg-gray-200 font-semibold border-black':
                                                displayItem.values?.slug ===
                                                value.slug,
                                            'hover:bg-gray-100':
                                                displayItem.values?.slug !==
                                                value.slug,
                                        }"
                                        :href="
                                            route('dynamic.route', {
                                                slug: displayItem.slug.product,
                                                optional: value.slug,
                                            })
                                        "
                                    >
                                        {{ value.title }}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="p-4 md:p-8 m-3 md:m-0 bg-white">
                        <div
                            class="flex items-end space-x-2 font-montserrat font-semibold"
                        >
                            <span class="text-4xl">{{ formattedPrice }}</span>
                            <span class="text-2xl">₴</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="displayItem" />
        </section>
    </MainLayout>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { usePage, Link } from "@inertiajs/vue3"; // Додано Link
import { useHead } from "@vueuse/head";
import { generateHeadMeta, formatPrice } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import ImageSwiperThumbs from "@/Components/Themes/Ecommerce/UI/ImageSwiperThumbs.vue";
import { IconCircleCheckFilled } from "@tabler/icons-vue";
import { useReviewApi } from "@/Composables/useReviewApi";
import StarRating from "@/Components/Review/StarRating.vue";
import ReviewForm from "@/Components/Review/ReviewForm.vue";
import ReviewList from "@/Components/Review/ReviewList.vue";
import axios from "axios"; // Додано axios

const props = defineProps({
    data: Object,
});

// Основні дані
const item = computed(() => props.data.item?.data || {});
const variant = computed(() => props.data.variant?.data || null);

// Дані до відображення (якщо є варіант — він в пріоритеті)
const displayItem = computed(() => {
    if (variant.value) {
        return {
            ...item.value,
            ...variant.value,
            title: item.value.title,
            description: item.value.description,
            slug: item.value.slug,
            attributes: item.value.attributes,
        };
    }
    return item.value;
});

// Зображення
const images = computed(() => props.data.images);

// Форматована ціна
const formattedPrice = computed(() =>
    formatPrice(displayItem.value.price, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);

const reviewApi = useReviewApi(); // Використання composable
const averageRating = ref(null);
const reviewsCount = ref(0);

// Референція до компонента ReviewList, щоб викликати його методи
const reviewListRef = ref(null);
const loadingProduct = ref(true);

const fetchProduct = async () => {
    loadingProduct.value = true;
    try {
        // Використовуємо displayItem.value.id, оскільки productId не передається як окремий пропс
        const response = await axios.get(
            `/api/reviews/${displayItem.value.id}`
        );
        // Оновлюємо item.value або displayItem.value, якщо потрібно оновити дані товару
        // Якщо ви вже маєте дані товару через пропси, можливо, цей fetch не потрібен
        // або він має оновлювати лише специфічні поля, не перезаписуючи весь item
        // product.value = response.data; // product не оголошено, використовуйте item.value
        console.log("Product data fetched:", response.data); // Для відладки
    } catch (error) {
        console.error("Error fetching product:", error);
    } finally {
        loadingProduct.value = false;
    }
};

const fetchAverageRating = async () => {
    if (!displayItem.value.id) {
        console.warn(
            "displayItem.id is not available for fetching average rating."
        );
        return;
    }
    const data = await reviewApi.fetchAverageRating(
        "products",
        displayItem.value.id
    );
    if (data) {
        averageRating.value = data.average_rating;
        reviewsCount.value = data.reviews_count;
    }
};

const handleReviewAdded = async () => {
    // Після додавання відгуку, оновлюємо список відгуків та середній рейтинг
    if (reviewListRef.value) {
        reviewListRef.value.currentPage = 1; // Скидаємо пагінацію до першої сторінки
        // reviewListRef.value.reviews = []; // Цей рядок може бути зайвим, fetchReviews перезавантажить
        await reviewListRef.value.fetchReviews(); // Перезавантажуємо відгуки
    }
    await fetchAverageRating(); // Оновлюємо середній рейтинг
};

const handleReviewDeleted = async () => {
    // Після видалення відгуку, оновлюємо середній рейтинг
    await fetchAverageRating();
    if (reviewListRef.value) {
        // Можливо, також потрібно оновити список відгуків після видалення
        await reviewListRef.value.fetchReviews();
    }
};

const openEditReviewModal = (review) => {
    console.log("Редагувати відгук:", review);
    alert(
        "Функціонал редагування відгуку буде реалізовано пізніше. Деталі у консолі."
    );
};

onMounted(async () => {
    // Переконайтеся, що item.value.id доступний перед викликом fetchProduct
    // Якщо дані товару вже приходять через пропси Inertia, цей fetchProduct може бути не потрібним
    // або його логіку потрібно переглянути, щоб уникнути зайвих запитів.
    // Зазвичай, Inertia вже надає всі необхідні дані товару через props.data.item.
    // Якщо fetchProduct потрібен для оновлення/додаткових даних, його варто тримати.
    if (displayItem.value.id) {
        // await fetchProduct(); // Розкоментуйте, якщо вам дійсно потрібен цей додатковий запит
        await fetchAverageRating();
    }
});

// Мета-теги
const headMeta = computed(() =>
    generateHeadMeta(displayItem.value, usePage().props.app.name)
);
useHead(headMeta);
</script>

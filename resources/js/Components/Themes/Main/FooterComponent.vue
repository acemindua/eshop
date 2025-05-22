<script setup>
import { onMounted, ref } from "vue";
import { Link } from "@inertiajs/vue3";
import useApiResourceService from "@/Composables/useApiResourceService";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CategoryTree from "../Ecommerce/CategoryTree.vue";

// API-сервіс
const { loading, errorsRequests, fetchData } = useApiResourceService();
const categories = ref({});
const getData = async () => {
    const url = new URL(route("api.data"));
    // url.searchParams.append("attribute_id", props.attributeId);
    const response = await fetchData(url.toString());
    categories.value = response.data.categories;
};

onMounted(() => {
    getData();
});
</script>

<template>
    <div class="flex items-center justify-between py-6">
        <div class="flex gap-4 items-start">
            <h4 class="text-gray-600 text-sm font-semibold">
                {{ $t("Category") }}:
            </h4>
            <CategoryTree :categories="categories" />
        </div>
        <Link href="/" class="inline-flex items-center space-x-2">
            <ApplicationLogo
                class="block h-9 w-auto fill-current text-gray-600"
            />
        </Link>
    </div>

    <div class="text-xs text-gray-600 py-4 border-t">
        ©{{ $page.props.app.year }} {{ $page.props.app.name }}.
        {{ $t("All rights reserved.") }}
    </div>
</template>

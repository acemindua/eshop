<template>
    <MainLayout>
        <section>
            <div class="grid grid-cols-4 gap-4">
                <ProductCard
                    v-for="item in items"
                    :key="item.id"
                    :data="item"
                />
            </div>
        </section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data.item.data" />
        </section>
    </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import VarDump from "@/Shared/VarDump.vue";
import MainLayout from "@/Layouts/MainLayout.vue";
import ProductCard from "@/Components/Themes/Ecommerce/ProductCard.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});

const items = ref([]);

onMounted(() => {
    getItems();
});

// API-сервіс
const { loading, errorsRequests, fetchData } = useApiResourceService();

const getItems = async () => {
    const url = new URL(route("products.index"));
    url.searchParams.append("category_id", props.data.item.data.id);
    const response = await fetchData(url.toString());
    items.value = response.data;
};
</script>

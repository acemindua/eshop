<template>
    <div v-if="!loading">
        <h3 class="uppercase font-semibold">
            {{ $t("The best products") }}
        </h3>

        <div class="grid grid-cols-4 gap-4">
            <CardProduct v-for="item in items" :key="item.id" :data="item" />
        </div>
    </div>

    <div v-else>
        {{ loading }}
    </div>

    <div class="text-xs text-slate-700 overflow-hidden p-8">
        <pre>
            items: {{ items }}
        </pre>
        <pre>
            loading: {{ loading }}
        </pre>
        <pre>
            errorsRequests: {{ errorsRequests }}
        </pre>
    </div>
</template>

<script setup>
import useApiResourceService from "@/Composables/useApiResourceService";
import { ref, onMounted } from "vue";
import CardProduct from "./Layout/CardProduct.vue";

const items = ref([]);
onMounted(() => {
    getItems();
});

const getItems = async () => {
    const url = new URL(route("products.index"));
    // url.searchParams.append("attribute_id", props.attributeId);
    const response = await fetchData(url.toString());
    items.value = response.data;
};

// API-сервіс
const { loading, errorsRequests, fetchData } = useApiResourceService();
</script>

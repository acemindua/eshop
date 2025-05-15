<script setup>
import ComboboxSelect from "@/Components/ComboboxSelect.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { ref, watch, onBeforeMount } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";

const props = defineProps({
    errors: Object,
});

const model = defineModel({
    type: Object,
    required: true,
});

const attributes = ref([]);
const attrValues = ref([]);

const { fetchData } = useApiResourceService();

// Завантажити атрибути
const loadAttributes = async () => {
    try {
        const url = new URL(route("attributes.index"));
        const response = await fetchData(url.toString());
        attributes.value = response.data || [];
    } catch (e) {
        console.error("Failed to load attributes", e);
    }
};

// Завантажити значення атрибута
const loadAttributeValues = async (attributeId) => {
    if (!attributeId) return;
    try {
        const url = new URL(
            route("attribute-values.index", { attribute_id: attributeId })
        );
        const response = await fetchData(url.toString());
        attrValues.value = response.data || [];
    } catch (e) {
        console.error("Failed to load attribute values", e);
    }
};

onBeforeMount(() => {
    loadAttributes();
    if (model.value.attribute_id) {
        loadAttributeValues(model.value.attribute_id);
    }
});

watch(
    () => model.value.attribute_id,
    (newId) => {
        model.value.attribute_value_id = null;
        loadAttributeValues(newId);
    }
);
</script>

<template>
    <div>
        <div>
            <InputLabel
                for="attribute"
                :value="$t('Attribute')"
                class="font-semibold"
            />
            <ComboboxSelect
                id="attribute"
                v-model="model.attribute_id"
                :items="attributes"
            />
            <InputError class="mt-2" :message="errors?.attribute_id" />
        </div>
        <div>
            <InputLabel
                for="attribute_value"
                :value="$t('Attribute Value')"
                class="font-semibold"
            />
            <ComboboxSelect
                id="attribute_value"
                v-model="model.attribute_value_id"
                :items="attrValues"
                :key="model.attribute_id"
            />
            <InputError class="mt-2" :message="errors?.attribute_value_id" />
        </div>
    </div>
</template>

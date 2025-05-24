<template>
    <Layout>
        <section>
            <div v-for="(item, key) in data.items" :key="key" class="mb-4">
                <InputLabel
                    :for="key"
                    :value="item.data.label ?? $t(key)"
                    class="flex items-center leading-6 font-semibold"
                />

                <component
                    :is="resolveComponent(item.data.type)"
                    v-model="form[key]"
                    :id="key"
                    @change="() => saveSetting(key)"
                />

                <InputError class="mt-2" :message="errors[key]" />
            </div>
        </section>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="form" />
        </section>
    </Layout>
</template>

<script setup>
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import TextArea from "@/Components/TextArea.vue";
import Layout from "@/Shared/Themes/Layouts/SettingLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { router } from "@inertiajs/vue3";
import { reactive } from "vue";

const props = defineProps({
    data: Object,
    errors: Object,
});

const form = reactive(
    Object.fromEntries(
        Object.entries(props.data.items).map(([key, item]) => [
            key,
            parseValue(item.data.value, item.data.type),
        ])
    )
);

function parseValue(value, type) {
    switch (type) {
        case "bool":
            return value === "1";
        case "int":
            return parseInt(value);
        case "float":
            return parseFloat(value);
        case "json":
            return JSON.parse(value || "{}");
        default:
            return value;
    }
}

function serializeValue(value, type) {
    switch (type) {
        case "bool":
            return value ? "1" : "0";
        case "json":
            return JSON.stringify(value);
        default:
            return String(value);
    }
}

function resolveComponent(type) {
    return (
        {
            bool: CheckBoxSwitcher,
            text: TextInput,
            int: TextInput,
            float: TextInput,
            json: TextArea,
        }[type] || TextInput
    );
}

function saveSetting(key) {
    const setting = props.data.items[key].data;
    const value = serializeValue(form[key], setting.type);

    router.post(
        route("admin.settings.update", key),
        {
            value,
            _method: "PUT",
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                // сповіщення або лог
            },
            onError: (errors) => {
                console.error(errors);
            },
        }
    );
}
</script>

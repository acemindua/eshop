<template>
    <Layout>
        <section>
            <div v-for="(item, key) in data.items" :key="key" class="mb-4">
                <InputLabel
                    :for="key"
                    :value="item.data.label ?? $t(key)"
                    class="flex items-center leading-6 font-semibold"
                />
                <CheckBoxSwitcher
                    :id="key"
                    v-model="form[key]"
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
            item.data.value === "1",
        ])
    )
);

function saveSetting(key) {
    router.post(
        route("admin.settings.update", key),
        {
            value: form[key] ? "1" : "0",
            _method: "PUT", // правильна назва
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                // опціонально: сповіщення або console.log
                //console.log(`Налаштування "${key}" оновлено.`);
            },
            onError: (errors) => {
                console.error(errors);
            },
        }
    );
}
</script>

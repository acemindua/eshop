<template>
    <div class="flex flex-col space-y-2 w-full">
        <!-- Action Buttons -->
        <section class="flex items-center justify-between pt-4">
            <span></span>
            <ActionButtons
                :loading="loading"
                :cancel-action="cancel"
                :submit-action="submit"
            />
        </section>

        <section>
            <TabGroup :selectedIndex="activeTab" @change="changeTab">
                <TabList
                    class="flex items-center w-full border-b border-gray-300"
                >
                    <Tab
                        v-for="tab in tabs"
                        :key="tab.key"
                        as="template"
                        v-slot="{ selected }"
                    >
                        <ButtonTabGroup :selected="selected">
                            {{ $t(tab.label) }}
                        </ButtonTabGroup>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <GeneralForm
                                :form="form"
                                :initial-image="image"
                                :errors="errors"
                                @uploaded="handleUpload"
                            />
                        </TabPanel>
                    </Transition>
                </TabPanels>
            </TabGroup>
        </section>

        <section>
            <VarDump :data="form" />
        </section>
    </div>
</template>

<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { router } from "@inertiajs/vue3";
import { computed, reactive, ref } from "vue";
import ButtonTabGroup from "@/Components/UI/Buttons/Admin/ButtonTabGroup.vue";
import GeneralForm from "./Partials/GeneralForm.vue";
import ActionButtons from "@/Components/UI/Buttons/Admin/ActionButtons.vue";

defineOptions({ layout: Layout });
const props = defineProps({ data: Object, errors: Object });

const user = computed(() => props.data?.user || {});
const form = reactive({
    _method: "put",
    id: user.value.id || "",
    name: user.value.name || "",
    email: user.value.email || "",
    last_name: user.value.last_name || "",
    phone: user.value.phone || "",
    description: user.value.description || "",
    avatar: null,
});

const image = ref(user.value.avatar || null);

// File upload handler
const handleUpload = (file) => {
    form.avatar = file;
};

const loading = ref(false);
const recentlySuccessful = ref(false);

const submit = () => {
    router.post(route("admin.users.update", user.value.id), form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => (loading.value = true),
        onSuccess: () => {
            recentlySuccessful.value = true;
            setTimeout(() => (recentlySuccessful.value = false), 3000);
        },
        onFinish: () => (loading.value = false),
    });
};

// Cancel action handler
const cancel = () => {
    router.visit(route("admin.users.index"));
};
// Logic for tabs
const activeTab = ref(0);
const tabs = ref([{ key: "general", label: "Profile" }]);
// Tab switch
function changeTab(index) {
    activeTab.value = index;
}
</script>

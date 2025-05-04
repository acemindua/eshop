<template>
    <Layout>
        <Head :title="`Edit: ${item.name}`" />
        <h1 class="font-semibold border-b p-4">
            {{ `Edit: ${item.name} ${item.surname}` }}
        </h1>

        <section class="py-4">
            <TabGroup as="template">
                <div class="flex flex-col md:flex-row gap-4 px-2">
                    <TabList class="md:w-1/3 md:flex">
                        <div
                            class="flex flex-col space-y-2 text-gray-600 dark:text-gray-400 md:w-64"
                        >
                            <Tab
                                as="template"
                                v-slot="{ selected }"
                                class="focus:outline-none"
                            >
                                <button
                                    :class="[
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center space-x-2 px-4',
                                        selected
                                            ? 'text-violet-600 bg-violet-200/25 dark:bg-slate-800'
                                            : 'hover:text-gray-600 hover:bg-slate-300/15 dark:hover:text-white',
                                    ]"
                                >
                                    <IconInfoCircle stroke="{2}" size="20" />
                                    <span>General</span>
                                </button>
                            </Tab>

                            <Tab
                                as="template"
                                v-slot="{ selected }"
                                class="focus:outline-none"
                            >
                                <button
                                    :class="[
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center space-x-2 px-4',
                                        selected
                                            ? 'text-violet-600 bg-violet-200/25 dark:bg-slate-800'
                                            : 'hover:text-gray-600 hover:bg-slate-300/15 dark:hover:text-white',
                                    ]"
                                >
                                    <IconShieldLock stroke="{2}" size="20" />
                                    <span>Security</span>
                                </button>
                            </Tab>

                            <Tab
                                as="template"
                                v-slot="{ selected }"
                                class="focus:outline-none"
                            >
                                <button
                                    :class="[
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center space-x-2 px-4',
                                        selected
                                            ? 'text-violet-600 bg-violet-200/25 dark:bg-slate-800'
                                            : 'hover:text-gray-600 hover:bg-slate-300/15 dark:hover:text-white',
                                    ]"
                                >
                                    <IconAdjustmentsHorizontal
                                        stroke="{2}"
                                        size="20"
                                    />
                                    <span>Settings</span>
                                </button>
                            </Tab>
                        </div>
                    </TabList>
                    <TabPanels class="md:w-2/3">
                        <TabPanel>
                            <UpdateUserInfoForm
                                :user-data="item"
                                :errors="errors"
                            />
                        </TabPanel>

                        <TabPanel>
                            <SecurityUserForm
                                :user-id="item.id"
                                :errors="errors"
                            />
                        </TabPanel>

                        <TabPanel>
                            <SettingsUserForm
                                :user="item"
                                :roles="data.roles"
                                :errors="errors"
                            />
                        </TabPanel>
                    </TabPanels>
                </div>
            </TabGroup>
        </section>

        <div class="bg-slate-100 text-xs text-slate-400">
            <div class="overflow-auto p-4">
                <pre>
            {{ data }}
            </pre
                >
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "@/Shared/Themes/Layouts/DashboardLayout.vue";
import { computed } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
    IconInfoCircle,
    IconShieldLock,
    IconAdjustmentsHorizontal,
} from "@tabler/icons-vue";
import UpdateUserInfoForm from "./Partials/UpdateUserInfoForm.vue";
import SecurityUserForm from "./Partials/SecurityUserForm.vue";
import SettingsUserForm from "./Partials/SettingsUserForm.vue";

const props = defineProps({
    data: Object,
    errors: { type: Object },
});

const item = computed(() => props.data.user || []);
</script>

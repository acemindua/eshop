<template>
    <Layout>
        <section>
            <div>
                <Link :href="route('admin.attributes.create')">{{
                    $t("Create")
                }}</Link>
            </div>

            <div>
                <section class="overflow-x-auto m-4 border bg-white">
                    <table class="w-full text-sm">
                        <thead>
                            <tr
                                class="text-xs uppercase text-slate-600 text-thin divide-x"
                            >
                                <th scope="col" class="p-2 text-start">
                                    Title
                                </th>

                                <th scope="col" class="p-2">Status</th>
                                <th scope="col" class="p-2">
                                    <IconSettings
                                        stroke="{2}"
                                        size="18"
                                        class="mx-auto"
                                    />
                                </th>
                                <th scope="col" class="p-2">Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-if="items.length > 0"
                                v-for="item in items"
                                :key="item.id"
                                class="hover:bg-slate-50 border-t border-slate-200 dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"
                            >
                                <td scope="row" class="p-2">
                                    {{ item.title }}
                                </td>

                                <td scope="row" class="p-2">
                                    <div class="flex justify-center w-ful">
                                        <BadgeStatus :active="item.status" />
                                    </div>
                                </td>
                                <td
                                    scope="row"
                                    class="flex space-x-2 items-center justify-center p-2"
                                >
                                    <Link
                                        :href="
                                            route(
                                                'admin.attributes.edit',
                                                item.id
                                            )
                                        "
                                    >
                                        <IconEdit
                                            stroke="{2}"
                                            size="18"
                                            class="text-blue-500"
                                        />
                                    </Link>
                                </td>
                                <td
                                    scope="row"
                                    class="p-2 text-center text-slate-500"
                                >
                                    {{ item.id }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot v-if="meta.links && meta.links.length > 3">
                            <tr>
                                <td
                                    scope="row"
                                    colspan="100%"
                                    class="border-t px-4"
                                >
                                    <Pagination
                                        :links="meta.links"
                                        :total="meta.total"
                                        :from="meta.from"
                                        :to="meta.to"
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </div>
        </section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import BadgeStatus from "@/Components/BadgeStatus.vue";
import Pagination from "@/Components/Pagination.vue";
import Layout from "@/Layouts/AppLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed } from "vue";
import { IconSettings, IconEdit } from "@tabler/icons-vue";

const props = defineProps({
    data: Object,
});

const items = computed(() => {
    return props.data.items.data || [];
});

const meta = computed(() => {
    return props.data.items.meta || [];
});
</script>

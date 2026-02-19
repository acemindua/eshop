<template>
    <section>
        <div class="bg-white flex flex-col divide-y rounded">
            <div class="flex gap-4 items-center p-4 md:p-6">
                <div
                    class="bg-gray-200 rounded-full w-[100px] h-[100px] p-1 flex items-center justify-center shadow-md"
                >
                    <div
                        v-if="user?.avatar"
                        class="bg-brand w-full h-full rounded-full flex items-center justify-center text-white"
                        :style="{
                            backgroundImage: `url('${user?.avatar}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }"
                    ></div>

                    <div
                        v-else
                        class="bg-brand w-full h-full rounded-full flex items-center justify-center text-white"
                    >
                        <IconUserScan :stroke="1" :size="40" />
                    </div>
                </div>

                <div class="p-4 text-sm">
                    <div class="pb-4">
                        <span class="font-semibold text-xl">{{
                            user.name
                        }}</span>
                    </div>
                    <div v-if="user.phone">
                        <small class="text-gray-500 text-xs">{{
                            $t("phone number")
                        }}</small>

                        <p>{{ user.phone }}</p>
                    </div>
                    <div v-if="user.email">
                        <small class="text-gray-500 text-xs">{{
                            $t("Email")
                        }}</small>

                        <p>{{ user.email }}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 md:p-6">
                <ul class="flex flex-col divide-y">
                    <li class="flex">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            class="flex items-center justify-end gap-2 w-full"
                        >
                            <IconLogout :stroke="2" />
                            <span>{{ $t("Logout") }}</span></Link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script setup>
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import Layout from "@/Layouts/Public/Default/IndexLayout.vue";
import { IconLogout, IconPhotoScan, IconUserScan } from "@tabler/icons-vue";
import { computed } from "vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: Object,
    filters: Object,
});

const user = computed(() => props.data?.user || {});
</script>

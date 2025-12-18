<template>
    <div class="flex space-x-2 items-center px-2 text-xs">
        <div class="relative">
            <ImageDataView
                :src="user?.avatar"
                :configs="{ width: '36px', height: '36px' }"
            />
            <!--  <div
                class="rounded-full w-5 h-5 flex items-center justify-center absolute -bottom-1 -right-1"
            >
                <UserStatus
                    :user="{
                        is_online: user.online,
                        last_activity: user.last_activity,
                    }"
                    size="sm"
                    :description="false"
                />
            </div> -->
        </div>

        <div class="hidden md:flex flex-col">
            <p class="font-semibold text-sm">{{ user.name }}</p>
            <p>
                <a :href="`mailto:${user.email}`" class="text-gray-500">{{
                    user.email
                }}</a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import ImageDataView from "./UI/ImageDataView.vue";
import UserStatus from "./UserStatus.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});

const user = computed(() => props.data?.user?.data || {});
</script>

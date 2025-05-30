<template>
    <MainLayout>
        <h1 class="font-semibold border-b">Profile</h1>

        <div class="flex w-full space-x-2">
            <div class="w-2/6 p-4">
                <div class="flex gap-6 py-4">
                    <div>
                        <div class="bg-slate-200 rounded-full p-1">
                            <UserAvatar :max-width="80" :data-user="user" />
                        </div>
                    </div>

                    <div class="flex flex-col space-y-2">
                        <div>
                            <p class="font-semibold">{{ user.full_name }}</p>
                        </div>

                        <div>
                            <p
                                class="text-xs font-thin text-slate-600 capitalize"
                            >
                                {{ $t("validation.attributes.email") }}
                            </p>
                            <p class="text-sm font-semibold">
                                {{ user.email }}
                            </p>
                        </div>

                        <div>
                            <p
                                class="text-xs font-thin text-slate-600 capitalize"
                            >
                                {{ $t("validation.attributes.phone") }}
                            </p>
                            <p class="text-sm font-semibold">
                                {{ user.phone }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="border-t">
                    <ul>
                        <li class="p-2">
                            <Link :href="route('profile.edit')">Profile</Link>
                        </li>
                        <li class="p-2">
                            <Link
                                :href="route('logout')"
                                method="post"
                                as="button"
                                >Exit</Link
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div class="w-4/6 p-4">asdasda</div>
        </div>
    </MainLayout>
</template>

<script setup>
import UserAvatar from "@/Components/UserAvatar.vue";
import MainLayout from "@/Layouts/MainLayout.vue";
import { usePage } from "@inertiajs/vue3";

const props = defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    errors: { type: Object },
});

const user = usePage().props.auth.user;
</script>

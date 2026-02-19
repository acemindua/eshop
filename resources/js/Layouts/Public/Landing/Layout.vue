<script setup lang="ts">
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import UserLoginRegisterForm from "@/Components/Public/UserLoginRegisterForm.vue";

const closeAll = () => {};
</script>

<template>
    <div class="flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2">
        <header class="bg-white p-4">
            <div class="w-full mx-auto">
                <nav
                    class="inline-flex gap-4 justify-between items-center w-full px-4"
                >
                    <Link
                        href="/"
                        class="flex items-center gap-2 shrink-0 group md:pr-12"
                        @click="closeAll"
                    >
                        <div class="">
                            <ApplicationLogo
                                class="w-10 h-10 bg-brand fill-current"
                            />
                        </div>

                        <span class="font-semibold hidden md:block">{{
                            $page.props?.app?.name
                        }}</span>
                    </Link>

                    <div class="hidden md:flex items-center gap-4">
                        <user-login-register-form />
                    </div>
                </nav>
            </div>
        </header>

        <main class="flex-grow px-2">
            <div class="w-full mx-auto">
                <slot />
            </div>
        </main>

        <footer class="bg-white p-4">
            <div class="w-full mx-auto">#footer (Copyright/Info)</div>
        </footer>
    </div>
</template>

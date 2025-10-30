<script setup lang="ts">
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import LangSwitcher from "@/Components/Public/LangSwitcher.vue";
</script>

<template>
    <Head>
        <title>{{ $t("Home") }}</title>
    </Head>
    <div class="w-full min-h-screen flex flex-col">
        <header>
            <div class="mx-auto container border">
                <div class="flex items-center justify-between p-2">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>

                    <nav
                        class="flex items-center justify-between text-sm font-semibold capitalize"
                    >
                        <Link href="/">{{ $t("Home") }}</Link>
                    </nav>

                    <div>
                        <LangSwitcher />
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-grow border">
            <div class="mx-auto container border">
                <slot />
            </div>
        </main>
        <footer>
            <div class="mx-auto container border">#footer</div>
        </footer>
    </div>
</template>

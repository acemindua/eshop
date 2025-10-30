<script setup>
import AdminSidebar from "@/Components/Admin/AdminSidebar.vue";
</script>

<template>
    <Head>
        <title>Dashboard</title>
    </Head>
    <div class="w-full min-h-screen flex flex-col bg-slate-200">
        <div class="hidden md:flex">
            <!-- Sidebar -->
            <AdminSidebar />

            <!-- Side navigation slot -->
            <aside
                v-if="$slots.sidenav"
                class="flex flex-col p-4 border-r bg-white w-64"
            >
                <slot name="sidenav" />
            </aside>
        </div>
        <main class="grow">
            <slot />
        </main>

        <footer>#footer</footer>
    </div>
</template>

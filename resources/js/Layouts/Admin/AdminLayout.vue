<script setup>
import AdminSidebar from "@/Components/Admin/AdminSidebar.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
</script>

<template>
    <Head :title="`Dashboard`" />

    <div class="w-full min-h-screen overflow-hidden flex bg-gray-200">
        <div class="hidden md:flex">
            <!-- Sidebar -->
            <AdminSidebar />

            <!-- Side navigation slot -->
            <aside
                v-if="$slots.sidenav"
                class="flex flex-col p-4 border-r bg-white w-48"
            >
                <slot name="sidenav" />
            </aside>
        </div>
        <div class="flex flex-col w-full">
            <header></header>
            <main class="flex-grow overflow-hidden w-full h-full">
                <div class="flex flex-col p-2 md:p-4">
                    <div class="border">
                        <Breadcrumbs />
                    </div>
                    <div class="border">
                        <slot />
                    </div>
                </div>
            </main>

            <footer>#footer</footer>
        </div>
    </div>
</template>

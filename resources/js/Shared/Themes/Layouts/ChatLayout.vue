<template>
    <Layout>
        <template #sidenav>
            <ChatRoomList />
        </template>

        <div class="h-full"><slot /></div>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/AppLayout.vue";
import ChatRoomList from "../App/Navigations/ChatRoomList.vue";
</script>

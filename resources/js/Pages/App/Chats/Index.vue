<template>
    <ChatLayout>
        <section class="flex flex-col space-y-2 h-full">
            
            <!-- Scrollable messages area -->
            <div class="bg-white p-2 rounded-lg grow overflow-hidden">
                <div
                    ref="messagesContainer"
                    class="h-96 overflow-y-auto space-y-2 bg-slate-400"
                >
                    <!-- Ваші повідомлення тут -->
                    <div
                        v-for="i in 20"
                        :key="i"
                        class="p-2 bg-gray-100 rounded"
                    >
                        Повідомлення {{ i }}
                    </div>
                </div>
            </div>

            <!-- Composer / input -->
            <div class="bg-white p-2 rounded-lg">
                <!-- Наприклад, форма -->
            </div>
        </section>
    </ChatLayout>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import ChatLayout from "@/Shared/Themes/Layouts/ChatLayout.vue";

const messagesContainer = ref(null);

// Автоматичне прокручування до низу
const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
    }
};

onMounted(() => {
    scrollToBottom();
});

// Якщо у вас є список повідомлень, можна спостерігати за ним і прокручувати вниз:
// watch(messages, async () => {
//     await nextTick();
//     scrollToBottom();
// });
</script>

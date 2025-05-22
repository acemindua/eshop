<template>
    <ChatLayout>
        <div class="grid grid-cols-4 w-full gap-2">
            <div
                class="col-span-3 bg-white p-2 min-h-96 rounded-lg shadow-inner"
            >
                <div class="space-y-4">
                    <div
                        ref="messagesRef"
                        class="overflow-y-auto h-96 space-y-4"
                    >
                        <div
                            v-for="message in messages"
                            :key="message.id"
                            class="flex"
                            :class="{
                                'justify-end': message.user_id === form.user_id,
                            }"
                        >
                            <div
                                class="w-3/4 p-4 rounded-lg shadow-md"
                                :class="{
                                    'bg-stone-300':
                                        message.user_id !== form.user_id,
                                    'bg-orange-500':
                                        message.user_id === form.user_id,
                                    'text-white':
                                        message.user_id === form.user_id,
                                    'text-stone-800':
                                        message.user_id !== form.user_id,
                                }"
                            >
                                <p>{{ message.text }}</p>
                                <span
                                    class="text-xs"
                                    :class="{
                                        'text-stone-500':
                                            message.user_id !== form.user_id,
                                        'text-orange-200':
                                            message.user_id === form.user_id,
                                    }"
                                    >{{ message.created_at }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-2 bg-white p-2 rounded-lg">
                <form
                    @submit.prevent="submit"
                    class="flex flex-row items-center space-x-2"
                >
                    <input
                        type="text"
                        id="message"
                        placeholder="Введи свое сообщение.."
                        v-model="form.message"
                        class="border border-slate-200 bg-transparent block w-full rounded-lg outline-0 focus:outline-none focus:border-slate-300 focus:ring-0"
                    />
                    <button
                        :disabled="loading"
                        type="submit"
                        class="bg-slate-800 hover:bg-slate-900 active:bg-blue-500 text-white font-semibold text-sm px-4 rounded-lg py-2"
                    >
                        {{ $t("Send") }}
                    </button>
                </form>
            </div>
        </div>
    </ChatLayout>
</template>

<script setup>
const Echo = window.Echo;
import { onMounted, ref, watch, nextTick, reactive } from "vue";
import ChatLayout from "@/Shared/Themes/Layouts/ChatLayout.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import useMessageService from "@/Composables/useMessageService";

const { loading, errors, getMessages, createMessage } = useMessageService();
const messages = ref([]);

const user = usePage().props.auth.user;

Echo.channel("test").listen(".MessageSent", (e) => {
    if (e) {
        messages.value.push(e.message);
        scrollToBottom();
    }
});

onMounted(() => {
    fetchMessages();
});
async function fetchMessages() {
    messages.value = await getMessages(route("messages.index"));
    scrollToBottom();
}
const messagesRef = ref(null);

const form = reactive({
    message: null,
    user_id: usePage().props.auth.user.id,
});

async function submit() {
    await createMessage(route("messages.store"), form);
    form.message = "";
    scrollToBottom();
}

const scrollToBottom = () => {
    if (messagesRef.value) {
        setTimeout(
            () =>
                (messagesRef.value.scrollTop = messagesRef.value.scrollHeight),
            10
        );
    }
};
</script>

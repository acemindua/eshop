<template>
    <div
        class="mx-auto rounded-full flex items-center justify-center relative"
        :style="avatarStyle"
    >
        <img v-if="avatarSrc" :src="avatarSrc" class="h-full w-full object-cover rounded-full " />
        <div v-else class="text-white font-bold text-sm">
            {{ initials }}
        </div>
        <span
            v-if="dataUser.online"
            class="bottom-0 end-0 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
        ></span>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    dataUser: { type: Object, required: true },
    maxWidth: { type: Number, default: 40 },
    src: { type: String, default: "" }
});

const colors = ['#e5e7e9'];//["#FF00A6", "#FF7407", "#990099"];
const avatarStyle = computed(() => ({
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    width: `${props.maxWidth}px`,
    height: `${props.maxWidth}px`
}));

const avatarSrc = computed(() => props.src || props.dataUser.avatar || "");
const initials = computed(() => {
    if (!props.dataUser.full_name) return "";
    return props.dataUser.name[0] + (props.dataUser.surname ? props.dataUser.surname[0] : "");
});
</script>
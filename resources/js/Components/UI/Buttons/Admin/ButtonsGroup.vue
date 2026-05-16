<template>
    <div class="flex items-center gap-1.5 relative z-20">
        <template v-for="(btn, index) in buttons" :key="btn.id || index">
            <component
                :is="btn.type === 'primary' ? PrimaryButton : SecondaryButton"
                v-bind="btn.extraProps"
                :disabled="loading || btn.disabled"
                :action="
                    btn.actionName ||
                    (btn.type === 'primary' ? 'save' : 'cancel')
                "
                class="!px-3 !py-1.5 sm:!px-4 sm:!py-2 transition-all duration-200 group relative overflow-hidden active:scale-95 shadow-sm hover:shadow-md"
                @click.prevent="!loading && !btn.disabled && btn.action()"
            >
                <!-- Слот для іконки -->
                <template #icon v-if="btn.icon && iconMap[btn.icon]">
                    <component
                        :is="iconMap[btn.icon]"
                        :size="16"
                        :stroke="2.5"
                        class="shrink-0 transition-transform group-hover:rotate-12"
                        :class="{
                            'animate-spin':
                                loading &&
                                btn.type === 'primary' &&
                                !btn.loadingLabel,
                        }"
                    />
                </template>

                <!-- Контент (текст) -->
                <span
                    class="text-[12px] sm:text-sm font-bold tracking-tight whitespace-nowrap"
                >
                    {{
                        loading && btn.loadingLabel
                            ? $t(btn.loadingLabel)
                            : $t(btn.label)
                    }}
                </span>

                <!-- Глянець тільки для Primary -->
                <template v-if="btn.type === 'primary'">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"
                    ></div>
                </template>
            </component>
        </template>
    </div>
</template>

<script setup>
import SecondaryButton from "@/Components/UI/Buttons/Admin/SecondaryButton.vue";
import PrimaryButton from "@/Components/UI/Buttons/Admin/PrimaryButton.vue";
import {
    IconCancel,
    IconDeviceFloppy,
    IconPlus,
    IconFileImport,
    IconCirclePlus,
    IconCloudUpload,
} from "@tabler/icons-vue";

const props = defineProps({
    loading: { type: Boolean, default: false },
    buttons: {
        type: Array,
        required: true,
    },
});

const iconMap = {
    IconCancel,
    IconDeviceFloppy,
    IconPlus,
    IconFileImport,
    IconCirclePlus,
    IconCloudUpload,
};
</script>

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-150%);
    }
    50% {
        transform: translateX(150%);
    }
    100% {
        transform: translateX(150%);
    }
}

:deep(button) {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
}
</style>

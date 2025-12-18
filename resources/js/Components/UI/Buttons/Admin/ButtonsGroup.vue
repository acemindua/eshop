<template>
    <div class="flex space-x-4 relative z-20">
        <template v-for="btn in buttons" :key="btn.label">
            <component
                :is="btn.type === 'primary' ? PrimaryButton : SecondaryButton"
                @click.prevent="btn.action"
                :disabled="loading"
                :class="{ 'opacity-50': loading }"
            >
                <template #icon v-if="btn.icon">
                    <component :is="iconMap[btn.icon]" :stroke="2" />
                </template>

                <span>
                    {{
                        loading && btn.loadingLabel
                            ? $t(btn.loadingLabel)
                            : $t(btn.label)
                    }}
                </span>
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
    // Масив конфігурації кнопок
    buttons: {
        type: Array,
        required: true,
        // Приклад структури: [{ label: 'Save', action: func, type: 'primary', icon: IconComponent }]
    },
});

// Словник доступних іконок
const iconMap = {
    IconCancel,
    IconDeviceFloppy,
    IconPlus,
    IconFileImport,
    IconCirclePlus,
    IconCloudUpload,
};
</script>

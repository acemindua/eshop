<template>
    <div class="flex items-center space-x-2 relative z-20">
        <template v-for="(btn, index) in buttons" :key="btn.id || index">
            <component
                :is="btn.type === 'primary' ? PrimaryButton : SecondaryButton"
                v-bind="btn.extraProps"
                :disabled="loading || btn.disabled"
                :class="{ 'opacity-50 cursor-not-allowed': loading || btn.disabled }"
                @click.prevent="!loading && !btn.disabled && btn.action()"
            >
                <!-- Іконка -->
                <template #icon v-if="btn.icon && iconMap[btn.icon]">
                    <component :is="iconMap[btn.icon]" :size="18" :stroke="2" />
                </template>

                <!-- Текст із підтримкою i18n -->
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
    buttons: {
        type: Array,
        required: true,
        // Очікуємо: { label: String, action: Function, type: String, icon: String, loadingLabel: String }
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
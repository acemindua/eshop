<template>
    <div class="flex space-x-4 relative z-20">
        <ul v-for="button in props.buttons" :key="button">
            <li>
                <button type="button" @click.prevent="`${button}Action`">
                    {{ button }}
                </button>
            </li>
        </ul>

        <!-- <SecondaryButton
            @click="cancelAction"
            :class="{ 'opacity-50': loading }"
            :disabled="loading"
        >
            <template #icon><IconCancel stroke="{2}" /></template>
            <span>{{ $t("Cancel") }}</span>
        </SecondaryButton>

        <PrimaryButton
            @click.prevent="submitAction"
            :class="{ 'opacity-50': loading }"
            :disabled="loading"
        >
            <template #icon><IconDeviceFloppy stroke="{2}" /></template>
            <span v-if="loading">{{ $t("Saving...") }}</span>
            <span v-else>{{ $t("Save") }}</span>
        </PrimaryButton> -->
    </div>
</template>

<script setup>
import SecondaryButton from "@/Components/UI/Buttons/Admin/SecondaryButton.vue";
import PrimaryButton from "@/Components/UI/Buttons/Admin/PrimaryButton.vue";
import { IconCancel, IconDeviceFloppy } from "@tabler/icons-vue";

// Визначаємо пропси, які будуть передаватися з батьківського компонента
const props = defineProps({
    loading: Boolean,
    buttons: {
        type: Array,
        required: true,
        default: ["import", "create"],
    },
    // Ми отримуємо функції як пропси, які викликаються при натисканні
    cancelAction: {
        type: Function,
        required: true,
    },
    submitAction: {
        type: Function,
        required: true,
    },
});
</script>

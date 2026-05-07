<script setup>
import CheckBoxSwitcher from "@/Components/UI/CheckBoxSwitcher.vue";
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import { computed } from "vue";
import { IconSettings } from "@tabler/icons-vue";

const props = defineProps({
    form: { type: Object, required: true },
    data: { type: [Object, Array], required: true },
    errors: { type: Object, default: () => ({}) },
});

// Перетворюємо статус у boolean для світчера
const isActive = computed({
    get: () => !!props.form.is_active,
    set: (val) => (props.form.is_active = val),
});
</script>

<template>
    <div
        class="md:flex gap-6 w-full border rounded-none p-2 md:p-6 lg:p-12 bg-gray-50 dark:bg-slate-900/50 dark:border-slate-800"
    >
        <div class="w-full md:w-1/4 pb-4">
            <div class="flex items-center space-x-2 mb-2 text-brand">
                <IconSettings size="20" />
                <h2 class="uppercase font-bold tracking-tight text-sm">
                    {{ $t("Technical Configuration") }}
                </h2>
            </div>
            <p class="py-2 text-xs text-gray-500 leading-relaxed">
                {{
                    $t(
                        "Set up internal system codes, processing fees, and payment availability.",
                    )
                }}
            </p>
        </div>

        <div class="flex md:w-3/4 w-full flex-col space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel
                        for="code"
                        :value="$t('System Code')"
                        class="font-bold text-[10px] uppercase text-gray-400 mb-1"
                    />
                    <TextInput
                        id="code"
                        type="text"
                        v-model="form.code"
                        class="block w-full font-mono text-sm border-gray-200"
                        placeholder="e.g., stripe_card"
                        :class="{ 'border-red-500': errors.code }"
                    />
                    <p
                        class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter"
                    >
                        {{
                            $t(
                                "Used by the core system to identify the gateway",
                            )
                        }}
                    </p>
                    <InputError class="mt-2" :message="errors.code" />
                </div>

                <div>
                    <InputLabel
                        for="sort_order"
                        :value="$t('Display Order')"
                        class="font-bold text-[10px] uppercase text-gray-400 mb-1"
                    />
                    <TextInput
                        id="sort_order"
                        type="number"
                        v-model="form.sort_order"
                        class="block w-full border-gray-200"
                        :class="{ 'border-red-500': errors.sort_order }"
                    />
                    <InputError class="mt-2" :message="errors.sort_order" />
                </div>
            </div>

            <hr class="border-gray-200 dark:border-slate-800" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel
                        for="commission_percent"
                        :value="$t('Commission Percent (%)')"
                        class="font-bold text-[10px] uppercase text-gray-400 mb-1"
                    />
                    <div class="relative">
                        <TextInput
                            id="commission_percent"
                            type="number"
                            step="0.01"
                            v-model="form.commission_percent"
                            class="block w-full pr-8 border-gray-200"
                        />
                        <span
                            class="absolute right-3 top-2 text-gray-400 text-sm"
                            >%</span
                        >
                    </div>
                    <InputError
                        class="mt-2"
                        :message="errors.commission_percent"
                    />
                </div>

                <div>
                    <InputLabel
                        for="commission_fixed"
                        :value="$t('Fixed Fee (Amount)')"
                        class="font-bold text-[10px] uppercase text-gray-400 mb-1"
                    />
                    <TextInput
                        id="commission_fixed"
                        type="number"
                        step="0.01"
                        v-model="form.commission_fixed"
                        class="block w-full border-gray-200"
                    />
                    <InputError
                        class="mt-2"
                        :message="errors.commission_fixed"
                    />
                </div>
            </div>

            <hr class="border-gray-200 dark:border-slate-800" />

            <div
                class="bg-white dark:bg-slate-800 p-4 border border-dashed border-gray-200 dark:border-slate-700"
            >
                <InputLabel
                    for="status-switcher"
                    :value="$t('Method Status')"
                    class="font-bold text-[10px] uppercase text-gray-400 mb-3"
                />
                <div class="flex items-center space-x-4">
                    <CheckBoxSwitcher v-model="isActive" id="status-switcher" />
                    <div class="flex flex-col">
                        <span
                            :class="[
                                'text-sm font-bold uppercase tracking-tight',
                                isActive ? 'text-green-600' : 'text-red-500',
                            ]"
                        >
                            {{ isActive ? $t("Active") : $t("Disabled") }}
                        </span>
                        <span class="text-[10px] text-gray-400 uppercase">
                            {{
                                isActive
                                    ? $t(
                                          "Customers can use this method at checkout",
                                      )
                                    : $t("Method is hidden from storefront")
                            }}
                        </span>
                    </div>
                </div>
                <InputError class="mt-2" :message="errors.is_active" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-brand {
    color: #10b981;
}
</style>

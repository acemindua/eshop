<script setup>
import { computed } from "vue";
import CheckBoxSwitcher from "@/Components/UI/CheckBoxSwitcher.vue";
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";

const props = defineProps({
    form: { type: Object, required: true },
    data: { type: [Object, Array], default: () => ({}) },
    errors: { type: Object, default: () => ({}) },
    isEditing: { type: Boolean, default: false },
});

/**
 * Оптимізація для свитчера:
 * Конвертуємо 0/1 з бази в true/false для компонента і назад.
 */
const booleanPublic = computed({
    get: () => !!props.form.public,
    set: (val) => (props.form.public = val ? 1 : 0),
});
</script>

<template>
    <div class="space-y-6">
        <div class="md:flex gap-8 py-6 border-b border-slate-100">
            <!-- Sidebar Info -->
            <div class="md:w-1/4 mb-4 md:mb-0">
                <h2
                    class="text-lg font-bold text-slate-800 tracking-tight"
                >
                    {{ $t("General Data") }}
                </h2>
                <p class="mt-2 text-sm text-slate-500 leading-relaxed">
                    {{ $t("Manage general product info and public status.") }}
                </p>
            </div>

            <!-- Form Content -->
            <div
                class="w-full md:w-3/4 space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
                <!-- Order Input -->
                <div class="space-y-2">
                    <InputLabel
                        for="order"
                        :value="$t('Order')"
                        class="font-bold uppercase text-xs text-slate-700"
                    />
                    <TextInput
                        id="order"
                        v-model="form.order"
                        type="number"
                        class="block w-full"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.order,
                        }"
                        placeholder="0"
                    />
                    <InputError :message="errors.order" />
                </div>

                <!-- Status Switcher -->
                <div class="space-y-3 pt-4 border-t border-slate-50">
                    <InputLabel
                        :value="$t('Status')"
                        class="font-bold uppercase text-xs text-slate-700"
                    />

                    <div
                        class="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 transition-all"
                    >
                        <CheckBoxSwitcher
                            v-model="booleanPublic"
                            id="public-switcher"
                        />

                        <div class="flex flex-col">
                            <span
                                :class="[
                                    'text-sm font-bold tracking-wide uppercase',
                                    booleanPublic
                                        ? 'text-emerald-600'
                                        : 'text-rose-600',
                                ]"
                            >
                                {{
                                    booleanPublic
                                        ? $t("Public (Visible)")
                                        : $t("Private (Hidden)")
                                }}
                            </span>
                            <span class="text-[11px] text-slate-400 italic">
                                {{
                                    booleanPublic
                                        ? $t(
                                              "This item will be displayed on the website.",
                                          )
                                        : $t(
                                              "This item is hidden from the public view.",
                                          )
                                }}
                            </span>
                        </div>
                    </div>
                    <InputError :message="errors.public" />
                </div>
            </div>
        </div>
    </div>
</template>

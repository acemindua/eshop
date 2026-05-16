<template>
    <div class="md:flex gap-8 py-6">
        <!-- Left Sidebar: Context -->
        <div class="md:w-1/4 mb-6 md:mb-0">
            <h2
                class="text-lg font-bold text-slate-800 flex items-center gap-2"
            >
                SEO Optimization
            </h2>
            <p class="mt-2 text-sm text-slate-500 leading-relaxed">
                Configure meta tags and indexing settings for the
                <span
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider"
                >
                    {{ code }}
                </span>
                version.
            </p>
        </div>

        <div
            class="w-full md:w-3/4 space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
            <!-- URL Slug Section -->
            <div
                v-if="'slug' in model"
                class="space-y-2 pb-6 border-b border-slate-100"
            >
                <InputLabel
                    :for="`${code}.slug`"
                    value="URL Slug"
                    class="font-bold uppercase"
                />
                <div class="flex">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-mono"
                    >
                        /{{ code }}/
                    </span>
                    <TextInput
                        :id="`${code}.slug`"
                        v-model="model.slug"
                        type="text"
                        class="block w-full rounded-l-none"
                        placeholder="example-page-url"
                        :class="{ 'border-red-500': errors[`${code}.slug`] }"
                    />
                </div>
                <InputError :message="errors[`${code}.slug`]" />
            </div>

            <!-- Meta Title Field -->
            <div v-if="'meta_title' in model" class="space-y-2">
                <div class="flex justify-between items-center">
                    <InputLabel
                        :for="`${code}.meta_title`"
                        value="Meta Title"
                        class="font-bold uppercase"
                    />
                    <span
                        class="text-[10px] font-mono text-slate-400"
                        :class="{
                            'text-red-500': model.meta_title?.length > 60,
                        }"
                    >
                        {{ model.meta_title?.length || 0 }}/60
                    </span>
                </div>
                <TextInput
                    :id="`${code}.meta_title`"
                    v-model="model.meta_title"
                    type="text"
                    class="block w-full"
                    :class="{ 'border-red-500': errors[`${code}.meta_title`] }"
                />
                <InputError :message="errors[`${code}.meta_title`]" />
            </div>

            <!-- Meta Description Field -->
            <div v-if="'meta_description' in model" class="space-y-2">
                <div class="flex justify-between items-center">
                    <InputLabel
                        :for="`${code}.meta_description`"
                        value="Meta Description"
                        class="font-bold uppercase"
                    />
                    <span
                        class="text-[10px] font-mono text-slate-400"
                        :class="{
                            'text-red-500':
                                model.meta_description?.length > 160,
                        }"
                    >
                        {{ model.meta_description?.length || 0 }}/160
                    </span>
                </div>
                <TextareaInput
                    :id="`${code}.meta_description`"
                    v-model="model.meta_description"
                    rows="3"
                    class="block w-full"
                    :class="{
                        'border-red-500': errors[`${code}.meta_description`],
                    }"
                />
                <InputError :message="errors[`${code}.meta_description`]" />
            </div>

            <!-- Meta Keywords (FIXED) -->
            <div v-if="'meta_keywords' in model" class="space-y-2 pt-2">
                <InputLabel
                    :for="`${code}.meta_keywords`"
                    value="Meta Keywords"
                    class="font-bold uppercase"
                />

                <TextInput
                    :id="`${code}.meta_keywords`"
                    :model-value="model.meta_keywords || ''"
                    @input="handleKeywordInput"
                    type="text"
                    class="block w-full text-sm font-mono"
                    placeholder="property, rent, kyiv"
                />

                <div
                    class="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-indigo-500 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p class="text-[11px] text-slate-500 leading-tight">
                        <strong>Smart Formatting:</strong> Spaces are
                        automatically converted to commas.
                    </p>
                </div>
                <InputError :message="errors[`${code}.meta_keywords`]" />
            </div>
        </div>
    </div>
</template>

<script setup>
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import TextareaInput from "@/Components/UI/TextareaInput.vue";

const props = defineProps({
    errors: { type: Object, default: () => ({}) },
    code: { type: String },
    isEditing: { type: Boolean, default: false },
});

const model = defineModel({
    type: Object,
    required: true,
});

/**
 * Handles the keyword input logic.
 * Converts spaces/multiple commas into proper comma-separated format.
 */
const handleKeywordInput = (e) => {
    let value = e.target.value || "";

    // 1. Convert any space to a comma
    // 2. Remove duplicate commas
    // 3. Ensure "comma + space" format
    // 4. Remove leading commas/spaces
    let formatted = value
        .replace(/\s+/g, ", ")
        .replace(/,+/g, ",")
        .replace(/,\s*/g, ", ")
        .replace(/^\s*,\s*/, "");

    // Update the parent model
    model.value.meta_keywords = formatted;

    // Optional: force the input value to show the formatted version immediately
    e.target.value = formatted;
};
</script>

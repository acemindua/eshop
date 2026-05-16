<template>
    <div class="md:flex gap-8 py-6">
        <!-- Left Sidebar: Context -->
        <div class="md:w-1/4 mb-6 md:mb-0">
            <h2
                class="text-lg font-bold text-slate-800 flex items-center gap-2"
            >
                General Information
            </h2>
            <p class="mt-2 text-sm text-slate-500 leading-relaxed">
                Management of primary content for the
                <span
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider"
                >
                    {{ code }}
                </span>
                version. Ensure all mandatory fields are completed to maintain
                data integrity.
            </p>
        </div>
        <div
            class="w-full md:w-3/4 space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
            <!-- Title Field -->
            <div v-if="'title' in model" class="space-y-2">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-1.5">
                        <InputLabel
                            :for="`${code}.title`"
                            value="Page Title"
                            class="font-bold uppercase"
                        />
                        <span
                            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider"
                        >
                            {{ code }}
                        </span>
                        <span
                            class="text-red-500 font-black text-lg leading-none"
                            title="Required field"
                            >*</span
                        >
                    </div>
                    <span
                        v-if="errors[`${code}.title`]"
                        class="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold uppercase tracking-tighter"
                    >
                        Required
                    </span>
                </div>

                <TextInput
                    :id="`${code}.title`"
                    v-model="model.title"
                    type="text"
                    class="block w-full"
                    :placeholder="`Enter a catchy title for ${code} edition...`"
                    :class="{
                        'border-red-500 focus:ring-red-100':
                            errors[`${code}.title`],
                    }"
                />

                <p class="text-[11px] text-slate-400 leading-tight italic">
                    The title is the most critical SEO element. Aim for 50-60
                    characters for optimal search engine display.
                </p>

                <InputError :message="errors[`${code}.title`]" />
            </div>

            <!-- Description Field -->
            <div v-if="'description' in model" class="space-y-2">
                <div class="flex items-center gap-1.5">
                    <InputLabel
                        :for="`${code}.description`"
                        value="Meta Description"
                        class="font-bold uppercase"
                    />
                    <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider"
                    >
                        {{ code }}
                    </span>
                </div>

                <TextareaInput
                    :id="`${code}.description`"
                    v-model="model.description"
                    rows="3"
                    class="block w-full"
                    :placeholder="`Summarize the page content for ${code} users...`"
                    :class="{ 'border-red-500': errors[`${code}.description`] }"
                />

                <div class="flex justify-between items-start">
                    <p class="text-[11px] text-slate-400 max-w-[80%] italic">
                        This summary appears in search results. A well-written
                        description can significantly improve your click-through
                        rate (CTR).
                    </p>
                    <span
                        class="text-[10px] font-mono text-slate-400"
                        :class="{
                            'text-red-500': model.description?.length > 255,
                        }"
                    >
                        {{ model.description?.length || 0 }}/255
                    </span>
                </div>

                <InputError :message="errors[`${code}.description`]" />
            </div>

            <!-- Content Field -->
            <div v-if="'content' in model" class="space-y-2">
                <div class="flex items-center gap-1.5">
                    <InputLabel
                        value="Main Content Body"
                        class="font-bold uppercase"
                    />

                    <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider"
                    >
                        {{ code }}
                    </span>
                </div>

                <div
                    class="overflow-hidden transition-all"
                    :class="
                        errors[`${code}.content`]
                            ? 'border-red-500 ring-2 ring-red-50'
                            : 'border-slate-200'
                    "
                >
                    <TextEditor v-model="model.content" />
                </div>

                <p class="text-[11px] text-slate-400 italic">
                    Use headers (H2, H3) and bullet points to make your content
                    readable. Quality content is king for both users and Google.
                </p>

                <InputError :message="errors[`${code}.content`]" />
            </div>
        </div>
    </div>
</template>

<script setup>
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import TextEditor from "@/Components/UI/TextEditor.vue";
import TextareaInput from "@/Components/UI/TextareaInput.vue";

const props = defineProps({
    errors: Object,
    code: {
        type: String,
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
});

const model = defineModel({
    type: Object,
    required: true,
});
</script>

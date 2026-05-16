<template>
    <div
        class="group relative bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden font-sans"
    >
        <!-- Header / Toolbar -->
        <div
            class="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50"
        >
            <span
                class="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
                Data Inspector
            </span>
            <button
                @click="copyToClipboard"
                :disabled="!data"
                class="min-w-[80px] text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {{ isCopied ? "Copied!" : "Copy JSON" }}
            </button>
        </div>

        <!-- Content Area -->
        <div
            class="relative overflow-auto max-h-[60vh] custom-scrollbar bg-white dark:bg-slate-950"
        >
            <pre
                class="p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-all selection:bg-indigo-100 dark:selection:bg-indigo-900"
                v-html="highlightedData"
            ></pre>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
    data: {
        type: [Object, Array, String, Number, null],
        default: null,
    },
});

const isCopied = ref(false);

/**
 * Enhanced Copy Function
 */
const copyToClipboard = async () => {
    if (!props.data) return;

    const textToCopy =
        typeof props.data === "object"
            ? JSON.stringify(props.data, null, 2)
            : String(props.data);

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
        } else {
            // Fallback for non-HTTPS or older browsers
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }

        isCopied.value = true;
        setTimeout(() => (isCopied.value = false), 2000);
    } catch (err) {
        console.error("Failed to copy text: ", err);
    }
};

/**
 * Syntax Highlighting Logic
 */
const highlightedData = computed(() => {
    if (props.data === null)
        return '<span class="text-slate-400 italic">null</span>';
    if (props.data === undefined)
        return '<span class="text-slate-400 italic">undefined</span>';

    let jsonString = "";
    try {
        jsonString = JSON.stringify(props.data, null, 2);
    } catch (e) {
        return `<span class="text-red-500 font-bold">[Error: Circular structure]</span>`;
    }

    // Escape HTML to prevent XSS
    jsonString = jsonString
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Regex for JSON components: keys, strings, numbers, booleans, nulls
    const regex =
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

    return jsonString.replace(regex, (match) => {
        let className = "text-blue-500 dark:text-blue-400"; // Default: Numbers

        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                className =
                    "text-indigo-600 dark:text-indigo-300 font-semibold"; // Keys
            } else {
                className = "text-emerald-600 dark:text-emerald-400"; // Strings
            }
        } else if (/true|false/.test(match)) {
            className = "text-amber-500"; // Booleans
        } else if (/null/.test(match)) {
            className = "text-slate-400"; // Null
        }

        return `<span class="${className}">${match}</span>`;
    });
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-slate-100 dark:bg-slate-900;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-300 dark:bg-slate-700 border-4 border-transparent bg-clip-padding rounded-full hover:bg-slate-400 dark:hover:bg-slate-600;
}

/* Base pre styling for better readability */
pre {
    tab-size: 2;
    word-spacing: normal;
}
</style>

<template>
    <div class="group relative bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <!-- Панель інструментів -->
        <div class="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Data Inspector</span>
            <button 
                @click="copyToClipboard"
                class="text-xs px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
            >
                {{ copied ? 'Скопійовано!' : 'Копіювати' }}
            </button>
        </div>

        <!-- Область Контенту -->
        <div class="relative overflow-auto max-h-[60vh] custom-scrollbar">
            <pre
                class="p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all"
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

const copied = ref(false);

const copyToClipboard = async () => {
    const text = typeof props.data === 'object' ? JSON.stringify(props.data, null, 2) : String(props.data);
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
};

/**
 * Підсвітка синтаксису JSON за допомогою Regex
 */
const highlightedData = computed(() => {
    if (props.data === null) return '<span class="text-gray-400">null</span>';
    
    let json = "";
    try {
        json = JSON.stringify(props.data, null, 2);
    } catch (e) {
        return `<span class="text-red-500">[Error: Circular structure or invalid data]</span>`;
    }

    // Безпечне екранування HTML
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Регулярка для пошуку ключів, рядків, чисел, булевих значень
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'text-blue-500'; // Числа
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-indigo-600 dark:text-indigo-400 font-bold'; // Ключі
            } else {
                cls = 'text-green-600 dark:text-green-400'; // Рядки
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-orange-500'; // Boolean
        } else if (/null/.test(match)) {
            cls = 'text-gray-400'; // Null
        }
        return `<span class="${cls}">${match}</span>`;
    });
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-300 dark:bg-slate-700 rounded-full;
}
</style>
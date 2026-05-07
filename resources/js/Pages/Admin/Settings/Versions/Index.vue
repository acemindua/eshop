<template>
    <Head title="Roadmap & Versions" />

    <div class="p-6 space-y-6 max-w-5xl mx-auto">
        <!-- Заголовок -->
        <div class="flex justify-between items-end">
            <div>
                <h2
                    class="text-2xl font-black text-slate-800 uppercase tracking-tighter"
                >
                    Roadmap
                </h2>
                <p class="text-slate-500 text-sm">
                    Управління версіями та завданнями eShop
                </p>
            </div>
            <button
                @click="createVersion"
                class="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-sm"
            >
                + Нова версія
            </button>
        </div>

        <!-- Список версій -->
        <div v-if="versionsList.length > 0" class="grid gap-6">
            <div
                v-for="version in versionsList"
                :key="version.id"
                class="bg-white border rounded-3xl shadow-sm border-slate-200 overflow-hidden transition-all"
                :class="{
                    'ring-2 ring-emerald-500/20 bg-emerald-50/10':
                        version.status === 'completed',
                    'opacity-90': version.status === 'completed',
                }"
            >
                <!-- Шапка версії -->
                <div
                    class="p-5 border-b border-slate-100 flex justify-between items-center"
                    :class="
                        version.status === 'completed'
                            ? 'bg-emerald-50/50'
                            : 'bg-slate-50/50'
                    "
                >
                    <div class="flex items-center gap-3">
                        <span
                            class="px-3 py-1 rounded-lg font-mono font-bold text-sm"
                            :class="
                                version.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-indigo-100 text-indigo-700'
                            "
                        >
                            v{{ version.version }}
                        </span>

                        <span
                            v-if="version.status === 'completed'"
                            class="text-[10px] px-2 py-0.5 bg-emerald-600 text-white rounded-full font-black uppercase tracking-wider flex items-center gap-1"
                        >
                            <IconCheck size="12" /> Released
                        </span>

                        <span
                            v-if="version.released_at"
                            class="text-xs text-slate-400 font-medium"
                        >
                            {{ version.released_at }}
                        </span>
                    </div>

                    <div class="flex gap-2">
                        <button
                            @click="confirmDeleteVersion(version.id)"
                            class="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                            <IconTrash size="18" />
                        </button>
                    </div>
                </div>

                <!-- Список завдань -->
                <div class="p-2">
                    <div
                        v-for="item in version.items"
                        :key="item.id"
                        class="group flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-all"
                    >
                        <input
                            type="checkbox"
                            :checked="!!item.is_completed"
                            @change="handleToggle(item, version)"
                            class="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                        />

                        <div class="flex-grow">
                            <span
                                :class="{
                                    'line-through text-slate-400 font-normal':
                                        item.is_completed,
                                    'text-slate-700 font-medium':
                                        !item.is_completed,
                                }"
                                class="text-[15px]"
                            >
                                {{ item.content }}
                            </span>
                        </div>

                        <!-- Керування пунктом -->
                        <div
                            class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <!-- Перенесення можливе тільки якщо цільова версія НЕ завершена (логіка в moveItem) -->
                            <select
                                @change="moveItem(item.id, $event.target.value)"
                                class="text-[10px] py-1 border-slate-200 rounded-lg focus:ring-0 cursor-pointer"
                            >
                                <option value="" disabled selected>
                                    Перенести...
                                </option>
                                <option
                                    v-for="v in versionsList.filter(
                                        (v) =>
                                            v.id !== version.id &&
                                            v.status !== 'completed',
                                    )"
                                    :key="v.id"
                                    :value="v.id"
                                >
                                    в v{{ v.version }}
                                </option>
                            </select>

                            <button
                                @click="editItem(item)"
                                class="p-1.5 text-slate-400 hover:text-indigo-600"
                            >
                                <IconEdit size="16" />
                            </button>

                            <button
                                @click="deleteItem(item.id)"
                                class="p-1.5 text-slate-400 hover:text-rose-600"
                            >
                                <IconX size="16" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Швидке додавання завдання (Блокується, якщо версія завершена) -->
                <div class="p-4 bg-slate-50/30 border-t border-slate-100">
                    <div
                        v-if="version.status === 'completed'"
                        class="flex items-center justify-center gap-2 py-2 text-slate-400 italic text-sm"
                    >
                        <IconLock size="14" />
                        Версія випущена. Для редагування зніміть відмітку з
                        будь-якого завдання.
                    </div>

                    <div v-else-if="quickForm[version.id]" class="flex gap-2">
                        <input
                            v-model="quickForm[version.id].content"
                            @keyup.enter="addItem(version.id)"
                            type="text"
                            class="flex-grow bg-white border-slate-200 rounded-xl text-sm focus:ring-indigo-500"
                            placeholder="Що зроблено або планується?"
                        />
                        <button
                            @click="addItem(version.id)"
                            class="p-2.5 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white shadow-sm transition-all"
                        >
                            <IconSend size="18" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Порожній стан -->
        <div
            v-else
            class="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 border-slate-200"
        >
            <p class="text-lg font-medium">Версії ще не створені</p>
            <p class="text-sm">Натисніть кнопку "+ Нова версія", щоб почати</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from "vue";
import { Head, router } from "@inertiajs/vue3";
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import {
    IconTrash,
    IconSend,
    IconCheck,
    IconEdit,
    IconX,
    IconLock,
} from "@tabler/icons-vue";

const props = defineProps({
    data: Object,
    errors: Object,
});

const versionsList = computed(() => {
    const raw = props.data?.versions || props.data?.data?.versions || [];
    return Array.isArray(raw) ? raw : Object.values(raw);
});

const quickForm = reactive({});

const initForms = () => {
    versionsList.value.forEach((v) => {
        if (v?.id && !quickForm[v.id]) {
            quickForm[v.id] = {
                content: "",
                type: "feature",
                category: "changelog",
            };
        }
    });
};

onMounted(initForms);
watch(() => versionsList.value, initForms, { deep: true });

// --- Методи ---

const handleToggle = (item, version) => {
    // Якщо версія завершена і ми знімаємо галочку - попереджаємо про дату
    if (version.status === "completed" && item.is_completed) {
        if (
            !confirm(
                "Ви впевнені? Це зніме статус 'Виконано' з усієї версії та видалить дату релізу.",
            )
        ) {
            return;
        }
    }
    toggleItem(item.id);
};

const toggleItem = (id) => {
    router.patch(
        route("admin.settings.versions.items.toggle", { item: id }),
        {},
        { preserveScroll: true },
    );
};

const addItem = (versionId) => {
    const form = quickForm[versionId];
    if (!form?.content.trim()) return;

    router.post(
        route("admin.settings.versions.items.store", {
            app_version: versionId,
        }),
        form,
        {
            preserveScroll: true,
            onSuccess: () => {
                form.content = "";
            },
            onError: (err) => {
                if (err.error) alert(err.error);
            },
        },
    );
};

const editItem = (item) => {
    const newContent = prompt("Редагувати завдання:", item.content);
    if (newContent && newContent !== item.content) {
        router.put(
            route("admin.settings.versions.items.update", { item: item.id }),
            { content: newContent },
            { preserveScroll: true },
        );
    }
};

const deleteItem = (id) => {
    if (confirm("Видалити цей пункт?")) {
        router.delete(
            route("admin.settings.versions.items.destroy", { item: id }),
            { preserveScroll: true },
        );
    }
};

const moveItem = (itemId, targetVersionId) => {
    router.patch(
        route("admin.settings.versions.items.move", { item: itemId }),
        { app_version_id: targetVersionId },
        {
            preserveScroll: true,
            onError: (err) => alert(err.message || "Помилка перенесення"),
        },
    );
};

const createVersion = () => {
    const v = prompt("Введіть номер нової версії (наприклад, 1.0.1):");
    if (v) router.post(route("admin.settings.versions.store"), { version: v });
};

const confirmDeleteVersion = (id) => {
    if (confirm("Видалити всю версію та її історію?")) {
        router.delete(
            route("admin.settings.versions.destroy", { appVersion: id }),
        );
    }
};

defineOptions({ layout: Layout });
</script>

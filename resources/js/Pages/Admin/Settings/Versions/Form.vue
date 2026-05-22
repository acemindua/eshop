<script setup>
import { ref, computed } from "vue";
import { usePage, useForm, router } from "@inertiajs/vue3";
import {
    IconBinaryTree,
    IconPlus,
    IconTrash,
    IconPencil,
    IconCheck,
    IconX,
    IconAlertCircle,
    IconCalendar,
    IconCircleCheck,
    IconCircle,
    IconArrowRight,
    IconInfoCircle,
} from "@tabler/icons-vue";

// Standard admin layouts and UI components
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import InputSearch from "@/Components/UI/InputSearch.vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: () => ({ versions: [], filters: {} }),
    },
});

const page = usePage();
const activeVersionId = ref(props.data.versions[0]?.id || null);
const searchText = ref(props.data.filters.search || "");

// --- Modals & Forms State ---
const isVersionModalOpen = ref(false);
const editingVersion = ref(null);
const editingItem = ref(null);
const movingItem = ref(null);

// Forms initialized with Inertia useForm
const versionForm = useForm({
    version: "",
    description: "",
});

const itemForm = useForm({
    content: "",
    type: "feature",
    category: "changelog",
});

const editItemForm = useForm({
    content: "",
});

const moveItemForm = useForm({
    app_version_id: "",
});

// --- Computed Data ---
const activeVersion = computed(() =>
    props.data.versions.find((v) => v.id === activeVersionId.value),
);

const typeColors = {
    feature: "bg-emerald-50 text-emerald-700 border-emerald-200",
    fix: "bg-rose-50 text-rose-700 border-rose-200",
    improvement: "bg-blue-50 text-blue-700 border-blue-200",
    other: "bg-slate-50 text-slate-700 border-slate-200",
};

const statusColors = {
    draft: "bg-slate-100 text-slate-700 border-slate-200",
    active: "bg-amber-100 text-amber-700 border-amber-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

// --- Version Actions ---
const openVersionModal = (version = null) => {
    editingVersion.value = version;
    if (version) {
        versionForm.version = version.version;
        versionForm.description = version.description || "";
    } else {
        versionForm.reset();
    }
    isVersionModalOpen.value = true;
};

const closeVersionModal = () => {
    isVersionModalOpen.value = false;
    editingVersion.value = null;
    versionForm.reset();
};

const saveVersion = () => {
    if (editingVersion.value) {
        versionForm.put(
            route("admin.settings.versions.update", editingVersion.value.id),
            {
                onSuccess: () => closeVersionModal(),
            },
        );
    } else {
        versionForm.post(route("admin.settings.versions.store"), {
            onSuccess: () => {
                closeVersionModal();
                if (props.data.versions.length > 0 && !activeVersionId.value) {
                    activeVersionId.value = props.data.versions[0].id;
                }
            },
        });
    }
};

const deleteVersion = (id) => {
    if (
        confirm(
            page.props.translations?.confirm_delete_version ||
                "Are you sure you want to delete this version?",
        )
    ) {
        router.delete(route("admin.settings.versions.destroy", id), {
            onSuccess: () => {
                if (activeVersionId.value === id) {
                    activeVersionId.value = props.data.versions[0]?.id || null;
                }
            },
        });
    }
};

// --- Items (Tasks) Actions ---
const addItem = () => {
    itemForm.post(
        route("admin.settings.versions.items.store", activeVersionId.value),
        {
            onSuccess: () => itemForm.reset("content"),
        },
    );
};

const toggleItem = (item) => {
    router.patch(
        route("admin.settings.versions.items.toggle", item.id),
        {},
        {
            preserveScroll: true,
        },
    );
};

const startEditItem = (item) => {
    editingItem.value = item;
    editItemForm.content = item.content;
};

const saveItemUpdate = () => {
    editItemForm.put(
        route("admin.settings.versions.items.update", editingItem.value.id),
        {
            preserveScroll: true,
            onSuccess: () => (editingItem.value = null),
        },
    );
};

const deleteItem = (item) => {
    if (
        confirm(
            page.props.translations?.confirm_delete_item || "Delete this task?",
        )
    ) {
        router.delete(route("admin.settings.versions.items.destroy", item.id), {
            preserveScroll: true,
        });
    }
};

const startMoveItem = (item) => {
    movingItem.value = item;
    moveItemForm.app_version_id = "";
};

const saveItemMove = () => {
    moveItemForm.patch(
        route("admin.settings.versions.items.move", movingItem.value.id),
        {
            preserveScroll: true,
            onSuccess: () => (movingItem.value = null),
        },
    );
};

// Format Date helper
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

defineOptions({ layout: Layout });
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Sidebar: Versions List -->
        <aside
            class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4"
        >
            <div class="flex items-center justify-between">
                <h2
                    class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2"
                >
                    <IconBinaryTree size="16" class="text-slate-400" />
                    {{ $t("App Versions") }}
                </h2>
                <button
                    type="button"
                    @click="openVersionModal()"
                    class="p-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                >
                    <IconPlus size="14" />
                    <span>{{ $t("New") }}</span>
                </button>
            </div>

            <!-- List -->
            <div
                class="space-y-2 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin"
            >
                <div
                    v-for="version in props.data.versions"
                    :key="version.id"
                    @click="activeVersionId = version.id"
                    class="p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 relative group"
                    :class="[
                        activeVersionId === version.id
                            ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900'
                            : 'border-slate-200 hover:bg-slate-50/50 bg-white',
                    ]"
                >
                    <div class="flex items-center justify-between">
                        <span
                            class="font-mono font-bold text-slate-900 text-sm"
                        >
                            v{{ version.version }}
                        </span>
                        <span
                            class="text-[10px] px-2 py-0.5 font-bold uppercase rounded border tracking-wider"
                            :class="statusColors[version.status]"
                        >
                            {{ $t(version.status) }}
                        </span>
                    </div>

                    <p
                        v-if="version.description"
                        class="text-xs text-slate-500 line-clamp-1 pr-12"
                    >
                        {{ version.description }}
                    </p>

                    <div
                        class="flex items-center justify-between mt-1 pt-1.5 border-t border-slate-100/60 text-[11px] text-slate-400"
                    >
                        <span class="inline-flex items-center gap-1">
                            <IconCalendar size="12" />
                            {{
                                version.released_at
                                    ? formatDate(version.released_at)
                                    : $t("In progress")
                            }}
                        </span>
                        <span class="font-medium text-slate-500">
                            {{ version.items?.length || 0 }} {{ $t("tasks") }}
                        </span>
                    </div>

                    <!-- Absolute management buttons on hover -->
                    <div
                        class="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-sm"
                    >
                        <button
                            type="button"
                            @click.stop="openVersionModal(version)"
                            class="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded"
                        >
                            <IconPencil size="12" />
                        </button>
                        <button
                            type="button"
                            @click.stop="deleteVersion(version.id)"
                            class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        >
                            <IconTrash size="12" />
                        </button>
                    </div>
                </div>

                <div
                    v-if="props.data.versions.length === 0"
                    class="text-center py-8 text-slate-400 text-xs"
                >
                    {{ $t("No versions created yet.") }}
                </div>
            </div>
        </aside>

        <!-- Main Workplace: Changelog / Roadmap Checklist -->
        <main
            class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 minimum-h-[50vh]"
        >
            <div v-if="activeVersion" class="space-y-5">
                <!-- Active Version Banner Header -->
                <div
                    class="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-3"
                >
                    <div>
                        <div class="flex items-center gap-3">
                            <h1
                                class="text-xl font-black font-mono text-slate-900"
                            >
                                v{{ activeVersion.version }}
                            </h1>
                            <span
                                class="text-xs font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full"
                                :class="statusColors[activeVersion.status]"
                            >
                                {{ $t(activeVersion.status) }}
                            </span>
                        </div>
                        <p
                            v-if="activeVersion.description"
                            class="text-xs text-slate-500 mt-1"
                        >
                            {{ activeVersion.description }}
                        </p>
                    </div>
                    <div
                        v-if="activeVersion.released_at"
                        class="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl"
                    >
                        <IconCircleCheck size="14" class="text-emerald-500" />
                        <span
                            >{{ $t("Released on") }}:
                            <b>{{
                                formatDate(activeVersion.released_at)
                            }}</b></span
                        >
                    </div>
                </div>

                <!-- Protective lock notification if version completed -->
                <div
                    v-if="activeVersion.status === 'completed'"
                    class="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-2.5 text-xs"
                >
                    <IconInfoCircle
                        size="16"
                        class="mt-0.5 flex-shrink-0 text-amber-600"
                    />
                    <div>
                        <span class="font-bold">{{
                            $t("Version closed.")
                        }}</span>
                        {{
                            $t(
                                "To append or reorder tasks, dynamically change this version attributes or pull back a task status.",
                            )
                        }}
                    </div>
                </div>

                <!-- Task Submission Form (Hidden if completed) -->
                <form
                    v-if="activeVersion.status !== 'completed'"
                    @submit.prevent="addItem"
                    class="bg-slate-50/50 border border-slate-200/80 rounded-xl p-3.5 space-y-3"
                >
                    <div class="flex gap-2">
                        <input
                            v-model="itemForm.content"
                            type="text"
                            required
                            maxlength="500"
                            :placeholder="$t('What was implemented or fixed?')"
                            class="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 focus:ring-0 bg-white"
                        />
                        <button
                            type="submit"
                            :disabled="itemForm.processing"
                            class="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-1"
                        >
                            <IconPlus size="16" />
                            <span>{{ $t("Add") }}</span>
                        </button>
                    </div>

                    <div class="flex flex-wrap items-center gap-4 text-xs">
                        <!-- Types radio group -->
                        <div class="flex items-center gap-2">
                            <span class="text-slate-400 font-medium"
                                >{{ $t("Type") }}:</span
                            >
                            <div class="flex gap-1.5">
                                <label
                                    v-for="t in [
                                        'feature',
                                        'fix',
                                        'improvement',
                                        'other',
                                    ]"
                                    :key="t"
                                    class="cursor-pointer select-none"
                                >
                                    <input
                                        type="radio"
                                        v-model="itemForm.type"
                                        :value="t"
                                        class="sr-only peer"
                                    />
                                    <span
                                        class="px-2 py-1 border border-slate-200 rounded-md text-[11px] font-bold uppercase tracking-wider peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 transition-all block"
                                    >
                                        {{ $t(t) }}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <!-- Category divider context -->
                        <div
                            class="flex items-center gap-2 border-l border-slate-200 pl-4"
                        >
                            <span class="text-slate-400 font-medium"
                                >{{ $t("Target") }}:</span
                            >
                            <div class="flex gap-1.5">
                                <label
                                    v-for="c in ['changelog', 'roadmap']"
                                    :key="c"
                                    class="cursor-pointer select-none"
                                >
                                    <input
                                        type="radio"
                                        v-model="itemForm.category"
                                        :value="c"
                                        class="sr-only peer"
                                    />
                                    <span
                                        class="px-2 py-1 border border-slate-200 rounded-md text-[11px] font-bold uppercase tracking-wider peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 transition-all block"
                                    >
                                        {{ $t(c) }}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Tasks Listing divided by category -->
                <div
                    v-for="cat in ['changelog', 'roadmap']"
                    :key="cat"
                    class="space-y-2"
                >
                    <h3
                        class="text-xs font-bold uppercase tracking-widest text-slate-400 px-1 pt-1"
                    >
                        {{ $t(cat) }}
                    </h3>

                    <div
                        class="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white"
                    >
                        <div
                            v-for="item in activeVersion.items?.filter(
                                (i) => i.category === cat,
                            )"
                            :key="item.id"
                            class="p-3 flex items-start gap-3 hover:bg-slate-50/40 group/item transition-colors"
                            :class="[item.is_completed ? 'bg-slate-50/20' : '']"
                        >
                            <!-- Completion Toggle -->
                            <button
                                type="button"
                                @click="toggleItem(item)"
                                class="mt-0.5 text-slate-400 hover:text-slate-900 transition-colors flex-shrink-0"
                            >
                                <IconCircleCheck
                                    v-if="item.is_completed"
                                    size="18"
                                    class="text-emerald-500 fill-emerald-50"
                                />
                                <IconCircle v-else size="18" />
                            </button>

                            <!-- Task Content Section -->
                            <div class="flex-1 text-sm min-w-0">
                                <div
                                    v-if="editingItem?.id === item.id"
                                    class="flex gap-2 items-center"
                                >
                                    <input
                                        v-model="editItemForm.content"
                                        type="text"
                                        class="flex-1 text-sm px-2 py-1 border border-slate-300 rounded focus:outline-none focus:border-slate-500"
                                    />
                                    <button
                                        @click="saveItemUpdate"
                                        class="p-1 text-green-600 hover:bg-green-50 rounded"
                                    >
                                        <IconCheck size="14" />
                                    </button>
                                    <button
                                        @click="editingItem = null"
                                        class="p-1 text-slate-400 hover:bg-slate-50 rounded"
                                    >
                                        <IconX size="14" />
                                    </button>
                                </div>
                                <div
                                    v-else
                                    class="flex flex-wrap items-baseline gap-2"
                                >
                                    <span
                                        class="text-[10px] px-1.5 py-0.5 font-bold uppercase rounded border tracking-wide flex-shrink-0"
                                        :class="typeColors[item.type]"
                                    >
                                        {{ $t(item.type) }}
                                    </span>
                                    <p
                                        class="text-slate-700 leading-relaxed"
                                        :class="[
                                            item.is_completed
                                                ? 'line-through text-slate-400'
                                                : '',
                                        ]"
                                    >
                                        {{ item.content }}
                                    </p>
                                </div>
                            </div>

                            <!-- Inline actions controls -->
                            <div
                                class="opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 flex items-center gap-1 flex-shrink-0 transition-opacity select-none"
                            >
                                <button
                                    v-if="!item.is_completed"
                                    type="button"
                                    @click="startMoveItem(item)"
                                    class="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                                    :title="$t('Move to another version')"
                                >
                                    <IconArrowRight size="14" />
                                </button>
                                <button
                                    type="button"
                                    @click="startEditItem(item)"
                                    class="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                                >
                                    <IconPencil size="14" />
                                </button>
                                <button
                                    type="button"
                                    @click="deleteItem(item)"
                                    class="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                >
                                    <IconTrash size="14" />
                                </button>
                            </div>
                        </div>

                        <div
                            v-if="
                                !activeVersion.items?.some(
                                    (i) => i.category === cat,
                                )
                            "
                            class="p-4 text-center text-xs text-slate-400 bg-slate-50/20"
                        >
                            {{ $t("No records under this pipeline.") }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dashboard Empty Workspace view placeholder -->
            <div
                v-else
                class="flex flex-col items-center justify-center text-center py-20 text-slate-400 gap-2"
            >
                <IconAlertCircle size="32" class="text-slate-300" />
                <span class="font-bold text-slate-700 text-sm">{{
                    $t("No version selected")
                }}</span>
                <p class="text-xs max-w-xs">
                    {{
                        $t(
                            "Select an active deployment version from the left panel or seed a new branch to begin tracking changes.",
                        )
                    }}
                </p>
            </div>
        </main>
    </div>

    <!-- Modals Layer 1: Version Create/Edit Dialog -->
    <div
        v-if="isVersionModalOpen"
        class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
        <div
            class="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-5 shadow-xl space-y-4"
        >
            <div
                class="flex items-center justify-between border-b border-slate-100 pb-2"
            >
                <h3
                    class="text-sm font-bold text-slate-900 uppercase tracking-wide"
                >
                    {{
                        editingVersion
                            ? $t("Modify Version Attributes")
                            : $t("Initialize Target Version")
                    }}
                </h3>
                <button
                    type="button"
                    @click="closeVersionModal"
                    class="p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                    <IconX size="16" />
                </button>
            </div>

            <form @submit.prevent="saveVersion" class="space-y-4">
                <div class="space-y-1">
                    <label
                        class="text-xs font-bold text-slate-500 uppercase tracking-wider"
                        >{{ $t("Version tag") }} (e.g. 1.0.4)</label
                    >
                    <input
                        v-model="versionForm.version"
                        type="text"
                        required
                        placeholder="1.0.0"
                        class="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500"
                    />
                </div>

                <div class="space-y-1">
                    <label
                        class="text-xs font-bold text-slate-500 uppercase tracking-wider"
                        >{{ $t("Short scope summary") }}</label
                    >
                    <textarea
                        v-model="versionForm.description"
                        rows="2"
                        placeholder="..."
                        class="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 resize-none"
                    ></textarea>
                </div>

                <div
                    class="flex justify-end gap-2 pt-2 border-t border-slate-100"
                >
                    <button
                        type="button"
                        @click="closeVersionModal"
                        class="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        {{ $t("Cancel") }}
                    </button>
                    <button
                        type="submit"
                        :disabled="versionForm.processing"
                        class="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {{ $t("Commit") }}
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modals Layer 2: Relocate Task (Move item pipeline) -->
    <div
        v-if="movingItem"
        class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
        <div
            class="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-5 shadow-xl space-y-4"
        >
            <div
                class="flex items-center justify-between border-b border-slate-100 pb-2"
            >
                <h3
                    class="text-sm font-bold text-slate-900 uppercase tracking-wide"
                >
                    {{ $t("Relocate Task") }}
                </h3>
                <button
                    type="button"
                    @click="movingItem = null"
                    class="p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                    <IconX size="16" />
                </button>
            </div>

            <p class="text-xs text-slate-500 italic">
                "{{ movingItem.content }}"
            </p>

            <form @submit.prevent="saveItemMove" class="space-y-4">
                <div class="space-y-1">
                    <label
                        class="text-xs font-bold text-slate-500 uppercase tracking-wider"
                        >{{ $t("Target Milestone / Release") }}</label
                    >
                    <select
                        v-model="moveItemForm.app_version_id"
                        required
                        class="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-slate-500"
                    >
                        <option value="" disabled>
                            {{ $t("Select version...") }}
                        </option>
                        <option
                            v-for="v in props.data.versions.filter(
                                (v) =>
                                    v.id !== activeVersionId &&
                                    v.status !== 'completed',
                            )"
                            :key="v.id"
                            :value="v.id"
                        >
                            v{{ v.version }} ({{ $t(v.status) }})
                        </option>
                    </select>
                </div>

                <div
                    class="flex justify-end gap-2 pt-2 border-t border-slate-100"
                >
                    <button
                        type="button"
                        @click="movingItem = null"
                        class="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        {{ $t("Cancel") }}
                    </button>
                    <button
                        type="submit"
                        :disabled="moveItemForm.processing"
                        class="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {{ $t("Transfer") }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    height: 4px;
    width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>

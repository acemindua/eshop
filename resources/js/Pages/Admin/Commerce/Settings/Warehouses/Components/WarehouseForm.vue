<script setup>
import { computed, ref } from "vue";
import { useForm, router } from "@inertiajs/vue3";
import StickyActions from "@/Components/StickyActions.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";

const props = defineProps({
    data: { type: Object, default: () => ({}) },
    routePrefix: { type: String, required: true },
    isEditing: { type: Boolean, default: false },
});

const imagePreview = ref(props.data?.image || null);

const getInitialState = () => ({
    title: props.data?.title || "",
    city: props.data?.city || "",
    address: props.data?.address || "",
    map_link: props.data?.map_link || "",
    working_hours: props.data?.working_hours || "",
    phone: props.data?.phone || "",
    sort_order: props.data?.sort_order ?? 1, // За замовчуванням 1, якщо створюється новий (Laravel перестрахує через makeWithDefaults)
    is_active: props.data?.is_active ?? true, // За замовчуванням активний
    image: null,
});

// Ініціалізуємо форму з усіма полями
const form = useForm(getInitialState());

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const handleSave = () => {
    const url = props.isEditing
        ? route(`${props.routePrefix}.update`, props.data?.id)
        : route(`${props.routePrefix}.store`);

    if (props.isEditing) {
        form.transform((data) => ({
            ...data,
            _method: "PUT", // Фейковий PUT для завантаження файлів у Laravel
        })).post(url, {
            forceFormData: true,
            preserveState: true,
        });
    } else {
        form.post(url, {
            preserveState: true,
        });
    }
};

const actionButtons = computed(() => [
    {
        label: "cancel",
        action: () => router.visit(route(`${props.routePrefix}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing,
    },
    {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing,
    },
]);
</script>

<template>
    <div class="flex flex-col space-y-4">
        <StickyActions
            :buttons="actionButtons"
            :routePrefix="props.routePrefix"
            :title="
                props.isEditing
                    ? (props.data?.warehouse?.title ?? $t('Warehouse details'))
                    : $t('New Warehouse')
            "
            :description="
                props.isEditing
                    ? $t('Warehouse details and settings management')
                    : $t(
                          'Warehouse creation form with all necessary details and settings',
                      )
            "
        >
            <form
                @submit.prevent="handleSave"
                class="border p-6 my-4 bg-white rounded-lg shadow-sm mx-auto"
            >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    <!-- Основна інформація (Займає 2 колонки на десктопі) -->
                    <div class="md:col-span-2 space-y-5">
                        <!-- Title -->
                        <div>
                            <div class="flex items-center gap-1 mb-1">
                                <InputLabel
                                    for="title"
                                    value="Warehouse Title"
                                    class="font-bold text-xs uppercase tracking-wider text-slate-700"
                                />
                                <span
                                    class="text-red-500 font-black text-sm leading-none"
                                    title="Required field"
                                    >*</span
                                >
                            </div>
                            <TextInput
                                id="title"
                                v-model="form.title"
                                type="text"
                                class="block w-full"
                                placeholder="e.g., Central Fertilizer Warehouse"
                                :class="{
                                    'border-red-500 focus:ring-red-100':
                                        form.errors.title,
                                }"
                            />
                            <InputError
                                :message="form.errors.title"
                                class="mt-1"
                            />
                        </div>

                        <!-- City & Address -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel
                                    for="city"
                                    value="City"
                                    class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
                                />
                                <TextInput
                                    id="city"
                                    v-model="form.city"
                                    type="text"
                                    class="block w-full"
                                    placeholder="e.g., Lviv"
                                    :class="{
                                        'border-red-500 focus:ring-red-100':
                                            form.errors.city,
                                    }"
                                />
                                <InputError
                                    :message="form.errors.city"
                                    class="mt-1"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    for="address"
                                    value="Address"
                                    class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
                                />
                                <TextInput
                                    id="address"
                                    v-model="form.address"
                                    type="text"
                                    class="block w-full"
                                    placeholder="e.g., 12 Horodotska St"
                                    :class="{
                                        'border-red-500 focus:ring-red-100':
                                            form.errors.address,
                                    }"
                                />
                                <InputError
                                    :message="form.errors.address"
                                    class="mt-1"
                                />
                            </div>
                        </div>

                        <!-- Phone & Working Hours -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel
                                    for="phone"
                                    value="Phone Number"
                                    class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
                                />
                                <TextInput
                                    id="phone"
                                    v-model="form.phone"
                                    type="text"
                                    class="block w-full"
                                    placeholder="e.g., +380 67 000 00 00"
                                    :class="{
                                        'border-red-500 focus:ring-red-100':
                                            form.errors.phone,
                                    }"
                                />
                                <InputError
                                    :message="form.errors.phone"
                                    class="mt-1"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    for="working_hours"
                                    value="Working Hours"
                                    class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
                                />
                                <TextInput
                                    id="working_hours"
                                    v-model="form.working_hours"
                                    type="text"
                                    class="block w-full"
                                    placeholder="e.g., Mon-Fri: 09:00 - 18:00"
                                    :class="{
                                        'border-red-500 focus:ring-red-100':
                                            form.errors.working_hours,
                                    }"
                                />
                                <InputError
                                    :message="form.errors.working_hours"
                                    class="mt-1"
                                />
                            </div>
                        </div>

                        <!-- Map Link -->
                        <div>
                            <InputLabel
                                for="map_link"
                                value="Google Maps Link"
                                class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
                            />
                            <TextInput
                                id="map_link"
                                v-model="form.map_link"
                                type="url"
                                class="block w-full"
                                placeholder="https://maps.google.com/..."
                                :class="{
                                    'border-red-500 focus:ring-red-100':
                                        form.errors.map_link,
                                }"
                            />
                            <p class="text-[11px] text-slate-400 mt-1 italic">
                                Paste the full link or iframe source for the
                                warehouse location marker.
                            </p>
                            <InputError
                                :message="form.errors.map_link"
                                class="mt-1"
                            />
                        </div>
                    </div>

                    <!-- Сайдбар: Медіа, Сортування та Статус (Займає 1 колонку) -->
                    <div
                        class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-100"
                    >
                        <!-- Статус та Сортування -->
                        <div class="space-y-4">
                            <!-- Toggle/Checkbox для Active Status -->
                            <div class="flex items-center">
                                <input
                                    id="is_active"
                                    v-model="form.is_active"
                                    type="checkbox"
                                    class="w-4 h-4 text-black border-slate-300 rounded focus:ring-black"
                                />
                                <InputLabel
                                    for="is_active"
                                    value="Active Status"
                                    class="ml-2 font-bold text-xs uppercase tracking-wider text-slate-700 select-none cursor-pointer"
                                />
                            </div>
                            <InputError
                                :message="form.errors.is_active"
                                class="mt-1"
                            />

                            <!-- Sort Order -->
                            <div>
                                <InputLabel
                                    for="sort_order"
                                    value="Sorting Sequence"
                                    class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
                                />
                                <TextInput
                                    id="sort_order"
                                    v-model.number="form.sort_order"
                                    type="number"
                                    min="0"
                                    class="block w-full"
                                    :class="{
                                        'border-red-500 focus:ring-red-100':
                                            form.errors.sort_order,
                                    }"
                                />
                                <InputError
                                    :message="form.errors.sort_order"
                                    class="mt-1"
                                />
                            </div>
                        </div>

                        <hr class="border-slate-200" />

                        <!-- Завантаження зображення -->
                        <div>
                            <InputLabel
                                value="Warehouse Image"
                                class="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2"
                            />

                            <!-- Прев'ю картинки -->
                            <div
                                class="mb-3 relative group border border-dashed border-slate-300 rounded-lg overflow-hidden bg-white aspect-video flex items-center justify-center"
                            >
                                <img
                                    v-if="imagePreview"
                                    :src="imagePreview"
                                    alt="Preview"
                                    class="w-full h-full object-cover"
                                />
                                <div v-else class="text-center p-4">
                                    <span class="text-xs text-slate-400 block"
                                        >No image selected</span
                                    >
                                </div>
                            </div>

                            <!-- Інпут прихованого типу, стилізований кнопкою -->
                            <label class="block">
                                <span class="sr-only">Choose File</span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    @change="handleImageChange"
                                    class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white file:cursor-pointer hover:file:bg-slate-800"
                                />
                            </label>
                            <InputError
                                :message="form.errors.image"
                                class="mt-1"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </StickyActions>
    </div>
</template>

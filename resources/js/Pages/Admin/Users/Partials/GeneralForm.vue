<template>
    <div class="md:flex gap-12 w-full py-4">
        <div class="">
            <p class="font-semibold dark:text-white">GENERAL INFO</p>
            <p class="text-sm text-slate-500">
                Edit your account's general information
            </p>
        </div>

        <div
            class="flex flex-col md:max-w-3xl spacep-y-4 divide-y flex-grow p-4 md:px-8 border rounded-lg bg-gray-50"
        >
            <div class="flex gap-12 py-4 w-full justify-between items-center">
                <div class="text-sm">
                    <p class="font-semibold dark:text-white">Profile picture</p>
                    <p class="text-sm text-slate-400">
                        Others deserve to know you more
                    </p>
                </div>

                <div class="relative">
                    <input
                        ref="fileInput"
                        type="file"
                        hidden
                        accept="image/*"
                        @change="previewImage"
                    />

                    <ImageDataView
                        :src="preview"
                        :configs="{
                            width: '120px',
                            height: '120px',
                        }"
                    />

                    <button
                        @click.prevent="
                            showClearButton ? clearFiles() : chooseFiles()
                        "
                        class="absolute right-0 bottom-0 bg-white dark:bg-slate-700 dark:text-white rounded-full flex items-center justify-center w-8 h-8 shadow-xl transition"
                        :class="{
                            'hover:bg-red-100 text-red-500': showClearButton,
                            'hover:bg-blue-100 text-blue-500': !showClearButton,
                        }"
                    >
                        <component
                            :is="showClearButton ? IconX : IconPlus"
                            :size="18"
                            stroke="2"
                        />
                    </button>
                </div>
            </div>

            <div class="py-4 flex flex-col space-y-4">
                <div class="text-sm">
                    <p class="font-semibold dark:text-white">Profile Info</p>
                    <p class="text-sm text-slate-400">
                        This is how others will recognize you
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-4 py-6">
                    <div>
                        <InputLabel for="name" :value="$t('Name')" />
                        <TextInput
                            id="name"
                            type="text"
                            class="mt-1 block w-full"
                            :class="{ 'border-red-500': errors?.name }"
                            v-model="form.name"
                            required
                            autofocus
                            placeholder="І'мя"
                        />
                        <InputError class="mt-2" :message="errors?.name" />
                    </div>

                    <div>
                        <InputLabel for="last_name" :value="$t('Last name')" />
                        <TextInput
                            id="last_name"
                            type="text"
                            class="mt-1 block w-full"
                            :class="{
                                'border-red-500': errors?.last_name,
                            }"
                            v-model="form.last_name"
                            placeholder="Прізвище"
                        />
                        <InputError class="mt-2" :message="errors?.last_name" />
                    </div>
                </div>

                <div>
                    <InputLabel for="email" value="Email address" />
                    <TextInput
                        id="email"
                        type="email"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': errors?.email }"
                        v-model="form.email"
                        required
                        placeholder="email@example.com"
                    />
                    <InputError class="mt-2" :message="errors?.email" />
                </div>

                <div>
                    <InputLabel for="phone" :value="$t('Phone')" />
                    <TextInput
                        id="phone"
                        type="tel"
                        masked="true"
                        placeholder="+38 0"
                        v-mask="'+38 0## ### ####'"
                        class="mt-1 block w-full"
                        v-model="form.phone"
                    />
                    <InputError class="mt-2" :message="errors?.phone" />
                </div>

                <div>
                    <InputLabel for="description" :value="$t('About you')" />
                    <TextareaInput
                        id="description"
                        v-model="form.description"
                        class="mt-1 block w-full"
                        placeholder="About you..."
                    />
                    <InputError class="mt-2" :message="errors?.description" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
// 💡 Додано IconX
import { IconPlus, IconX } from "@tabler/icons-vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import TextareaInput from "@/Components/UI/TextareaInput.vue";

const props = defineProps({
    // Об'єкт форми (має бути об'єктом useForm)
    form: {
        type: Object,
        required: true,
    },
    // Початковий URL зображення (існуючий аватар)
    initialImage: {
        type: [String, null],
        default: null,
    },
    errors: Object,
});

// 💡 emit для передачі нового файлу нагору
const emit = defineEmits(["uploaded"]);

const fileInput = ref(null);
// preview завжди відображає або URL нового файлу, або початковий URL
const preview = ref(props.initialImage || null);
// Стан для нового обраного об'єкта File (для попереднього перегляду)
const newFileObject = ref(null);

// 💡 ОБЧИСЛЮВАЛЬНА ВЛАСТИВІСТЬ: Чи відображати кнопку видалення/скидання
const showClearButton = computed(() => !!newFileObject.value);

// Image Handling Logic
const chooseFiles = () => fileInput.value.click();

const previewImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
        newFileObject.value = null;
        return;
    }

    // 1. Зберігаємо об'єкт File
    newFileObject.value = file;

    // 2. Створюємо URL для попереднього перегляду
    preview.value = URL.createObjectURL(file);

    // 3. Передаємо об'єкт File нагору (батьківський компонент встановить form.avatar = file)
    emit("uploaded", file);
};

// 💡 ФУНКЦІЯ СКИДАННЯ ФАЙЛІВ
const clearFiles = () => {
    // 1. Скидаємо об'єкт нового файлу
    newFileObject.value = null;

    // 2. Повертаємо попередній перегляд до початкового зображення
    preview.value = props.initialImage || null;

    // 3. Очищаємо input type="file" для можливості повторного вибору
    if (fileInput.value) {
        fileInput.value.value = "";
    }

    // 4. Сповіщаємо батьківський компонент про скидання файлу
    emit("uploaded");
};
</script>

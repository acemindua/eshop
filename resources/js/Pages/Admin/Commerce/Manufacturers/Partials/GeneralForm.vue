<template>
    <div class="flex flex-col space-y-4 mx-auto w-full md:max-w-3xl p-2">
        <div>
            <div class="w-full md:w-1/5 pb-4">
                <h2 class="uppercase font-semibold">General</h2>
                <span class="py-2 text-sm text-gray-600"
                    >Manage general info</span
                >
            </div>

            <div class="flex items-center justify-center">
                <input
                    ref="fileInput"
                    type="file"
                    hidden
                    accept="image/*"
                    @change="previewImage"
                />
                <div class="relative">
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
            <div class="mb-3">
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        :for="`title`"
                        :value="`Name`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>

                <div class="w-full sm:col-span-3">
                    <TextInput
                        :id="`title`"
                        type="text"
                        v-model="form.title"
                        class="block w-full"
                        :placeholder="`Name company`"
                        :class="{
                            'border-red-500': errors[`title`],
                        }"
                    />
                    <p class="mt-1 text-xs text-gray-500">
                        Enter the name company. This will appear in search
                        engine results.
                    </p>

                    <InputError class="mt-2" :message="errors[`title`]" />
                </div>
            </div>

            <!-- Country Select -->
            <div>
                <InputLabel
                    for="country"
                    :value="$t('Country')"
                    class="flex items-center leading-6 font-semibold"
                />

                <CountrySelect
                    id="country"
                    v-model="form.country"
                    :items="data?.countries || []"
                    :class="{ 'border-red-500': errors.country }"
                />
                <InputError class="mt-2" :message="errors.country" />
            </div>

            <div>
                <InputLabel
                    for="order"
                    :value="$t('Sort order')"
                    class="flex items-center leading-6 font-semibold"
                />
                <TextInput
                    id="order"
                    type="number"
                    v-model="form.order"
                    class="block w-full pr-4 text-start"
                    :class="{ 'border-red-500': errors.order }"
                />
                <InputError class="mt-2" :message="errors.order" />
            </div>

            <div>
                <InputLabel
                    for="public-switcher"
                    :value="$t('Status')"
                    class="flex items-center leading-6 font-semibold mb-2"
                />
                <div class="flex items-center space-x-4">
                    <CheckBoxSwitcher
                        v-model="booleanPublic"
                        id="public-switcher"
                    />
                    <span
                        :class="[
                            'text-sm font-medium',
                            booleanPublic ? 'text-green-600' : 'text-red-600',
                        ]"
                    >
                        {{
                            booleanPublic
                                ? $t("Public (Visible)")
                                : $t("Private (Hidden)")
                        }}
                    </span>
                </div>
                <InputError class="mt-2" :message="errors.public" />
            </div>
        </div>
    </div>

    <!--   
    
    <div
        class="md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50"
    >
       

        <div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50">
            
        </div>
    </div> -->
</template>
<script setup>
import ImageCompany from "@/Images/company.svg";
import { IconPlus, IconX } from "@tabler/icons-vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import { ref, computed } from "vue";
import InputError from "@/Components/UI/InputError.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import CheckBoxSwitcher from "@/Components/UI/CheckBoxSwitcher.vue";
import ComboboxSelect from "@/Components/UI/ComboboxSelect.vue";
import CountrySelect from "@/Components/UI/CountrySelect.vue";

const props = defineProps({
    data: Object,
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});

const booleanPublic = computed({
    // Отримуємо значення, перетворюючи його на чистий boolean (!!0 -> false, !!1 -> true)
    get: () => !!props.form.public,
    // При записі встановлюємо значення (CheckBoxSwitcher повертає true/false)
    set: (val) => (props.form.public = val),
});

const fileInput = ref(null);
const preview = ref(props.data?.manufacturer?.image || ImageCompany || null);

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
    newFileObject.value = file;
    preview.value = URL.createObjectURL(file);
    props.form.image = file;
};

// 💡 ФУНКЦІЯ СКИДАННЯ ФАЙЛІВ
const clearFiles = () => {
    newFileObject.value = null;
    preview.value = ImageCompany || null;

    if (fileInput.value) {
        fileInput.value.value = "";
    }
    props.form.image = null;
};
</script>

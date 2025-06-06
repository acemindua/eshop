<template>
    <TransitionRoot as="template" :show="visible">
        <Dialog class="relative z-10" @close="onClose">
            <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-100"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-800/10 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div
                        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
                    >
                        <TransitionChild
                            as="template"
                            enter="transform transition ease-in-out duration-300 sm:duration-700"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-100 sm:duration-700"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel
                                class="pointer-events-auto w-screen max-w-md md:max-w-2xl"
                            >
                                <div
                                    class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                                >
                                    <div
                                        class="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
                                    >
                                        <div
                                            class="flex items-start justify-between"
                                        >
                                            <DialogTitle
                                                class="text-lg font-medium text-gray-900"
                                                >{{
                                                    $t("Корзина з покупками")
                                                }}</DialogTitle
                                            >
                                            <div
                                                class="ml-3 flex h-7 items-center"
                                            >
                                                <button
                                                    type="button"
                                                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    @click="onClose"
                                                >
                                                    <span
                                                        class="absolute -inset-0.5"
                                                    />
                                                    <span class="sr-only"
                                                        >Close panel</span
                                                    >
                                                    <XMarkIcon
                                                        class="size-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div class="mt-8">
                                            <div class="flow-root">
                                                <ul
                                                    role="list"
                                                    class="-my-6 divide-y divide-gray-200"
                                                >
                                                    <li
                                                        v-for="product in products"
                                                        :key="product.id"
                                                        class="flex py-6"
                                                    >
                                                        <div
                                                            class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
                                                        >
                                                            <ImageView
                                                                class="mx-auto"
                                                                :product-data="
                                                                    product.data
                                                                "
                                                                :variant-data="
                                                                    product.variant
                                                                "
                                                                :config="{
                                                                    width: 96,
                                                                    height: 96,
                                                                }"
                                                            />
                                                        </div>

                                                        <div
                                                            class="ml-4 flex flex-1 flex-col"
                                                        >
                                                            <div>
                                                                <div
                                                                    class="flex justify-between text-base font-medium text-gray-900"
                                                                >
                                                                    <h3>
                                                                        <a
                                                                            :href="
                                                                                product.href
                                                                            "
                                                                            >{{
                                                                                product.name
                                                                            }}</a
                                                                        >
                                                                    </h3>
                                                                    <p
                                                                        class="ml-4"
                                                                    >
                                                                        {{
                                                                            product.price
                                                                        }}
                                                                        <span
                                                                            class="text-base"
                                                                            >₴</span
                                                                        >
                                                                    </p>
                                                                </div>
                                                                <p
                                                                    class="mt-1 text-sm text-gray-500"
                                                                >
                                                                    {{
                                                                        product.color
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div
                                                                class="flex flex-1 items-end justify-between text-sm"
                                                            >
                                                                <p
                                                                    class="text-gray-500"
                                                                >
                                                                    {{
                                                                        $t(
                                                                            "Quantity"
                                                                        )
                                                                    }}
                                                                    {{
                                                                        product.quantity
                                                                    }}
                                                                </p>

                                                                <div
                                                                    class="flex"
                                                                >
                                                                    <button
                                                                        @click="
                                                                            confirmDelete(
                                                                                product
                                                                            )
                                                                        "
                                                                        type="button"
                                                                        class="font-medium text-orange-600 hover:text-orange-500"
                                                                    >
                                                                        {{
                                                                            $t(
                                                                                "Remove"
                                                                            )
                                                                        }}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="border-t border-gray-200 px-4 py-6 sm:px-6"
                                    >
                                        <div
                                            class="flex justify-between text-base font-medium text-gray-900"
                                        >
                                            <p>Сума</p>
                                            <p>
                                                {{ cart.state.total }}
                                                <span class="text-base">₴</span>
                                            </p>
                                        </div>
                                        <p class="mt-0.5 text-sm text-gray-500">
                                            Для зміни кільості та інших
                                            параметрів перейдіть в "Оформлення
                                            замовлення".
                                        </p>
                                        <div class="mt-6">
                                            <a
                                                href="#"
                                                class="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-green-700"
                                                >{{
                                                    $t("Оформити замовлення")
                                                }}</a
                                            >
                                        </div>
                                        <div
                                            class="mt-6 flex justify-center text-center text-sm text-gray-500"
                                        >
                                            <p>
                                                {{ $t("or") }}
                                                <button
                                                    type="button"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                    @click="onClose()"
                                                >
                                                    Продовжити покупку
                                                    <span aria-hidden="true">
                                                        &rarr;</span
                                                    >
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { computed } from "vue";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

import ImageView from "@/Components/Themes/Admin/UI/ImageView.vue";

const props = defineProps({
    cart: Object,
    visible: Boolean,
});

const emit = defineEmits(["close", "remove"]);
const onClose = () => emit("close");

const products = computed(() => props.cart.state?.items || []);

const confirmDelete = async (item) => {
    const result = await Swal.fire({
        title: "Ви впевнені?",
        text: 'Цей Товар буде видалено з "Кошика"!',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "green",
        confirmButtonText: "Так, видалити!",
        cancelButtonText: "Ні, скасувати",
    });

    if (result.isConfirmed) {
        emit("remove", item);
    }
};
</script>

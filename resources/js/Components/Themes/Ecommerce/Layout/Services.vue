<template>
    <!-- Services Section Begin -->
    <div
        class="grid grid-cols-1 md:grid-cols-4 md:gap-4 w-full max-w-7xl mx-auto py-4 text-xs md:text-sm"
    >
        <div class="flex items-start">
            <div class="shrink-0">
                <IconTruckDelivery
                    :stroke="2"
                    class="text-green-600"
                    :size="20"
                />
            </div>

            <div class="flex flex-col space-y-2 px-2">
                <h4 class="font-semibold flex space-x-2 items-center">
                    {{ $t("Доставка") }}
                </h4>
                <p class="text-gray-600">
                    Доставка за адресою або у відділення "Нова Пошта"
                </p>
            </div>
        </div>
        <div class="flex items-start">
            <div class="shrink-0">
                <IconShieldHalfFilled
                    :stroke="2"
                    class="text-green-600"
                    :size="20"
                />
            </div>

            <div class="flex flex-col space-y-2 px-2">
                <h4 class="font-semibold flex space-x-2 items-center">
                    {{ $t("Гарантія") }}
                </h4>
                <p class="text-gray-600">
                    Сертифікована техніка з офіційною гарантією від виробника.
                </p>
            </div>
        </div>
        <div class="flex items-start">
            <div class="shrink-0">
                <IconWallet :stroke="2" class="text-green-600" :size="20" />
            </div>

            <div class="flex flex-col space-y-2 px-2">
                <h4 class="font-semibold flex space-x-2 items-center">
                    {{ $t("Оплата") }}
                </h4>
                <p class="text-gray-600">
                    Оплатити покупку можливо готівкою, картою чи безготівковим
                    розрахунком.
                </p>
            </div>
        </div>
        <div class="flex items-start">
            <div class="shrink-0">
                <IconCornerUpLeftDouble
                    :stroke="2"
                    class="text-green-600"
                    :size="20"
                />
            </div>

            <div class="flex flex-col space-y-2 px-2">
                <h4 class="font-semibold flex space-x-2 items-center">
                    {{ $t("Повернення") }}
                </h4>
                <p class="text-gray-600">
                    Повернення товару відбувається протягом 14 днів після
                    покупки, у відповідності із діючим законом.
                </p>
            </div>
        </div>
    </div>
    <!-- Services Section End -->
</template>

<script setup>
import {
    IconShieldHalfFilled,
    IconCornerUpLeftDouble,
    IconTruckDelivery,
    IconWallet,
} from "@tabler/icons-vue";
</script>

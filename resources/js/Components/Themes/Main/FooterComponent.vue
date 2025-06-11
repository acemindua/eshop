<!-- // FooterComponent.vue -->
<template>
    <div
        class="w-full max-w-7xl mx-auto p-4 text-sm text-gray-600"
    >
        <div class="md:flex items-center justify-between py-2 text-xs border-t">
            <div>
                ©{{ $page.props.app.year }} {{ $page.props.app.name }}.
                {{ $t("All rights reserved.") }}
            </div>
            <div>
                <a
                    href="http://apisoft.com.ua"
                    target="_blank"
                    class="inline-flex space-x-2 items-center"
                >
                    <p class="flex flex-col text-end">
                        <span class="text-xs">Handmade by:</span>
                        <span class="font-semibold">apiSoft</span>
                    </p>
                    <img
                        src="https://apisoft.com.ua/storage/apisoft.svg"
                        alt="apiSoft"
                        class="w-10 h-10"
                    />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup></script>

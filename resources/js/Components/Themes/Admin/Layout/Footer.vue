<template>
    <div class="text-xs text-gray-500 px-4 md:px-8 py-2 border-t">
        <div class="flex w-full items-center justify-between">
            <span>App {{ $page.props.app.version }}.</span>
            <span>
                Laravel {{ $page.props.app.laravelVersion }}. PHP
                {{ $page.props.app.phpVersion }}</span
            >
        </div>
    </div>
</template>

<script></script>

<template>
    <div
        class="border-b border-r overflow-hidden relative group flex flex-col justify-between transition-all duration-300 h-full p-4"
    >
        <div class="flex flex-col h-full select-none pointer-events-none">
            <div
                class="bg-gray-100 w-full aspect-square md:h-[300px] md:aspect-auto flex items-center justify-center overflow-hidden animate-pulse rounded-sm"
            >
                <div class="w-full h-full bg-gray-200/70"></div>
            </div>

            <div
                class="p-2 flex flex-col space-y-2 flex-grow justify-between mt-2"
            >
                <div class="space-y-2 animate-pulse h-12 justify-start pt-1">
                    <div class="h-3.5 bg-gray-200 rounded-sm w-full"></div>
                    <div class="h-3.5 bg-gray-200 rounded-sm w-3/4"></div>
                </div>

                <div
                    class="flex items-center justify-between pt-2 min-h-[44px]"
                >
                    <div
                        class="space-y-1.5 animate-pulse flex flex-col justify-end"
                    >
                        <div
                            class="h-3 bg-gray-200 rounded-sm w-12 mb-0.5"
                        ></div>
                        <div class="h-5 bg-gray-200 rounded-sm w-20"></div>
                    </div>
                    <div
                        class="w-24 h-10 bg-gray-200 rounded-lg scale-90 origin-right flex-shrink-0 animate-pulse"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

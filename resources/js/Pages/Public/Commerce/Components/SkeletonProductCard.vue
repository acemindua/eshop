<template>
    <div
        class="bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col pointer-events-none transition-all duration-300 h-full"
    >
        <div
            class="bg-gray-200 w-full aspect-square md:h-[300px] md:aspect-auto animate-pulse"
        ></div>

        <div
            class="p-2 flex flex-col space-y-2 flex-grow justify-between bg-white"
        >
            <div class="space-y-2 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div class="flex items-center justify-between pt-4 min-h-[44px]">
                <div class="space-y-1.5 animate-pulse flex-grow">
                    <div class="h-3 bg-gray-200 rounded w-10"></div>
                    <div class="h-5 bg-gray-200 rounded w-16"></div>
                </div>

                <div
                    class="w-12 h-12 bg-gray-200 rounded-full scale-90 origin-right flex-shrink-0 animate-pulse"
                ></div>
            </div>
        </div>
    </div>
</template>

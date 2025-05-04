<script>
export default {
    name: "Pagination",
    props: {
        links: Object,
        to: Number,
        from: Number,
        total: Number,
        anchor: {
            type: String,
            default: "",
        },
    },
};
</script>
<template>
    <div v-if="links.length > 3">
        <div class="brounded-md">
            <div
                class="flex items-center justify-between text-xs text-dark py-3 text-slate-600"
            >
                <div>
                    Показано від {{ from }} до {{ to }} з {{ total }} позицій
                </div>
                <div class="flex items-center space-x-2 text-sm">
                    <Component
                        v-for="link in links"
                        :key="link"
                        :is="link.url ? 'Link' : 'span'"
                        :href="`${link.url}${anchor}`"
                        class="px-3 py-2 leading-none duration-300"
                        :class="{
                            'hover:text-violet-600': link.url,
                            'text-gray-400 hover:border-transparent hover:text-gray-400':
                                !link.url,
                            'font-bold bg-gray-800 text-white rounded hover:text-white':
                                link.active,
                        }"
                        v-html="link.label"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

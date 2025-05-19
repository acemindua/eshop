<script setup>
import { ref, onMounted } from "vue";
import Sortable from "sortablejs";
import Swal from "sweetalert2";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    images: { type: [Array, Object] },
    errors: Object,
});

const emit = defineEmits(["reorder", "delete"]);
const sortableContainer = ref(null);

onMounted(() => {
    if (sortableContainer.value) {
        Sortable.create(sortableContainer.value, {
            animation: 150,
            onEnd: () => {
                const order = {};
                Array.from(sortableContainer.value.children).forEach(
                    (child, index) => {
                        order[child.dataset.id] = index + 1;
                    }
                );
                emit("reorder", order);
            },
        });
    }
});

/**
 * Confirm before delete
 */
const confirmDelete = async (imageId) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This image will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        emit("delete", imageId);
    }
};
</script>

<template>
    <div ref="sortableContainer" class="flex flex-wrap gap-2">
        <div
            v-for="(image, index) in images"
            :key="image.id"
            :data-id="image.id"
            class="border cursor-move rounded-lg overflow-hidden w-48 h-48 relative p-2 bg-white"
        >
            <img :src="image.url" class="w-full h-full" />

            <div
                v-if="index === 0"
                class="absolute top-1 left-1 bg-green-600/75 text-white text-xs px-2 py-1 rounded shadow"
            >
                Main Image
            </div>

            <PrimaryButton
                @click.prevent="confirmDelete(image.id)"
                class="absolute shadow top-1 w-4 text-white bg-slate-900/25 right-1 hover:bg-red-500 rounded-full flex items-center justify-center"
                title="Delete image"
            >
                ×
            </PrimaryButton>
        </div>
    </div>

    <section v-if="!$page.props.app.env === 'local'">
        <VarDump :data="images" />
    </section>
</template>

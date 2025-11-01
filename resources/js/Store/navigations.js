import { defineStore } from "pinia";
import useApiResourceService from "@/Composables/useApiResourceService";

export const useNavigationStore = defineStore("navigation", {
    state: () => ({
        items: [],
        loaded: false,
    }),
    actions: {
        async load() {
            if (this.loaded) return;
            const { fetchData } = useApiResourceService();
            const res = await fetchData(route("api.get.menu"));
            this.items = res?.data?.items || [];
            this.loaded = true;
        },
    },
});

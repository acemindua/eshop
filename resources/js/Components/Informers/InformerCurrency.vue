<template>
    <div class="bg-white h-full flex flex-col rounded-md border">
        <h4 class="text-xs text-gray-600 p-3">
            Курс МБВ:
            <span :style="`color: ${this.color}`" class="font-semibold">{{
                this.currency
            }}</span>
        </h4>

        <div class="grow">
            <apexchart :options="options" :series="series" height="100" />
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { IconCurrencyDollar, IconCurrencyEuro } from "@tabler/icons-vue";

export default {
    name: "InformerCurrencyChart",
    components: {
        IconCurrencyDollar,
        IconCurrencyEuro,
    },
    props: {
        currency: {
            type: String,
            default: "USD",
        },
        color: {
            type: String,
            default: "#3498DB",
        },
    },
    data: function () {
        return {
            series: [],
            options: {
                chart: {
                    id: "vuechart-example",
                    maxWidth: "100%",
                    heigth: 100,
                    type: "area",
                    parentHeightOffset: 0,
                    toolbar: {
                        show: false,
                    },
                    sparkline: {
                        enabled: false,
                    },
                },
                tooltip: {
                    enabled: true,
                    x: {
                        show: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.65,
                        opacityTo: 0,
                        shade: this.color,
                        gradientToColors: [this.color],
                    },
                },
                zoom: {
                    enabled: false,
                },
                grid: {
                    show: false,
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: -15,
                        left: 0,
                    },
                    marging: {
                        top: 0,
                        right: 0,
                        bottom: -15,
                        left: 0,
                    },
                },
                legend: {
                    show: false,
                },
                yaxis: {
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                },
                colors: [this.color],
                noData: {
                    text: "Loading...",
                },
                states: {
                    normal: {
                        filter: {
                            type: "none",
                            value: 0,
                        },
                    },
                    hover: {
                        filter: {
                            type: "none",
                            value: 0,
                        },
                    },
                    active: {
                        allowMultipleDataPointsSelection: false,
                        filter: {
                            type: "none",
                            value: 0,
                        },
                    },
                },
                stroke: {
                    curve: "smooth",
                    width: 2,
                    dashArray: 0,
                },
                markers: {
                    size: 0,
                    hover: {
                        size: 6,
                    },
                },
                xaxis: {
                    show: false,
                    floating: false,
                    position: "bottom",
                    labels: {
                        show: false,
                        formatter: function (value) {
                            const timestamp = value * 1000; // example timestamp
                            const date = new Date(timestamp);

                            return moment(date).format("D.MM"); // The formatter function overrides format property
                        },
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
            },
        };
    },
    methods: {
        async get() {
            await axios
                .get(route("api.get.currency", { currency: this.currency }))
                .then((response) => {
                    this.series = [
                        {
                            name: this.currency,
                            data: response.data.data,
                        },
                    ];
                })
                .catch((error) => console.log(error));
        },
    },
    mounted() {
        this.get();
    },
};
</script>

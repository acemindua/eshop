<script setup>
import { Head, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import SchemaMarkup from "./SchemaMarkup.vue";

const seo = computed(() => usePage().props.seo);
</script>

<template>
    <Head>
        <title>{{ seo.title }}</title>
        <meta name="description" :content="seo.description" />
        <meta v-if="seo.keywords" name="keywords" :content="seo.keywords" />

        <meta property="og:site_name" :content="seo.site_name" />
        <meta property="og:type" :content="seo.type" />
        <meta property="og:url" :content="seo.url" />
        <meta property="og:title" :content="seo.title" />
        <meta property="og:description" :content="seo.description" />
        <meta property="og:image" :content="seo.og_image" />
        <!--
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="seo.title" />
        <meta name="twitter:description" :content="seo.description" />
        <meta name="twitter:image" :content="seo.og_image" />
        <meta name="twitter:card" :content="seo.twitter_card" />
        <meta name="twitter:site" :content="seo.twitter_site" />
        <meta name="twitter:creator" :content="seo.twitter_creator" />
        -->
        <meta name="robots" :content="seo.robots" />

        <link rel="canonical" :href="seo.canonical" />

        <link
            v-for="(url, lang) in seo.hreflangs"
            :key="lang"
            rel="alternate"
            :hreflang="lang"
            :href="url"
        />
    </Head>

    <SchemaMarkup />
</template>

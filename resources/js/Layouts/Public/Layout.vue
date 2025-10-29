<template>
    <Head>
        <title>{{ $t("Home") }}</title>
    </Head>
    <div class="w-full min-h-screen flex flex-col">
        <header>#header</header>
        <main class="grow">
            <slot />
        </main>
        <footer>#footer</footer>
    </div>
</template>

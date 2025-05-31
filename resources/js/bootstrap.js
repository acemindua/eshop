import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allow your team to quickly build robust real-time web applications.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    // Це попередження, яке ви бачите, якщо токен не знайдено.
    // Переконайтеся, що мета-тег <meta name="csrf-token" content="{{ csrf_token() }}"> є у вашому Blade-файлі!
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

// Якщо ви використовуєте Laravel Sanctum для автентифікації SPA,
// бажано також додати цей рядок, щоб Axios автоматично надсилав куки.
window.axios.defaults.withCredentials = true;

import "./echo";

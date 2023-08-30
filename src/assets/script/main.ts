import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

new Swiper(".mySwiper", {
    modules: [Pagination, Navigation, Autoplay],
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

function toggleTheme() {
    if (!document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
    } else {
        localStorage.removeItem('theme')
        document.documentElement.classList.remove('dark')
    }
}

window.toggleTheme = toggleTheme

declare global {
    interface Window {
        toggleTheme(): void
    }
}
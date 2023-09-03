import { OpenViewTransitions } from '@blog/config'

import "./motion"

import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

let swiper: Swiper | null = null
function initSwiper() {
    if (swiper) {
        swiper.destroy()
        swiper = null
    }
    if (!document.querySelector('.mySwiper')) return
    swiper = new Swiper('.mySwiper', {
        modules: [Pagination, Navigation, Autoplay],
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
}
if (OpenViewTransitions) {
    document.addEventListener('astro:page-load', initSwiper)
} else initSwiper()

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

function initMobile() {
    const menuBtn = document.getElementById('menu-btn')
    const menuMask = document.getElementById('menu-mask')
    const menuWrapper = document.getElementById('menu-wrapper')
    menuBtn!.addEventListener('click', function () {
        menuMask!.style.pointerEvents = 'auto'
        menuMask!.style.opacity = '1'
        menuWrapper!.style.left = '0'
        document.body.style.overflow = 'hidden'
    })
    menuMask!.addEventListener('click', function () {
        menuMask!.style.pointerEvents = 'none'
        menuMask!.style.opacity = '0'
        menuWrapper!.style.left = '-310px'
        document.body.style.overflow = 'auto'
    })
}
if (OpenViewTransitions) {
    document.addEventListener('astro:page-load', initMobile)
} else initMobile()

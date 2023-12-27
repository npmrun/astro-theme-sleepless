import { OpenViewTransitions } from '@blog/config'

import './motion'

import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { timestampFormat } from '@blog/utils/date'
import mediumZoom, { type Zoom } from 'medium-zoom'

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

function updateArticleTime() {
    document.querySelectorAll('.updated-time').forEach((el) => {
        const time = el.getAttribute('date-time')
        if (time) {
            el.textContent = '修改时间：' + timestampFormat(time)
        }
    })
    document.querySelectorAll('.pub-time').forEach((el) => {
        const time = el.getAttribute('date-time')
        if (time) {
            el.textContent = '创建时间：' + timestampFormat(time)
        }
    })
}
if (OpenViewTransitions) {
    document.addEventListener('astro:page-load', updateArticleTime)
} else updateArticleTime()

// 是否每秒中执行，感觉没必要
// setInterval(updateArticleTime, 1000)

function initImage() {
    let els = document.querySelectorAll('.markdown-body img')
    if(els.length){
      mediumZoom(els, {
          margin: 24,
          background: 'rgba(25, 18, 25, 0.9)',
          scrollOffset: 0,
          // container: '#zoom-container',
          // template: '#zoom-template',
      })
    }
}
if (OpenViewTransitions) {
    document.addEventListener('astro:page-load', initImage)
} else initImage()

function scrollIntoView(traget: string | number) {
    let isNum = false
    if (typeof traget == "number") {
      isNum = true
    }
    let tragetElem: HTMLDivElement | null = null;
    let tragetElemPostition: number = 0;
    if (isNum) {
      tragetElemPostition = traget as number
    } else {
      tragetElem = document.querySelector(traget as string)
      tragetElemPostition = tragetElem!.offsetTop
    }
    // 判断是否支持新特性
    if (
      typeof window.getComputedStyle(document.body).scrollBehavior ==
      "undefined" || isNum
    ) {
      // 当前滚动高度
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 滚动step方法
      const step = function () {
        // 距离目标滚动距离
        let distance = tragetElemPostition - scrollTop;
  
        // 目标需要滚动的距离，也就是只走全部距离的五分之一
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
          window.scrollTo(0, tragetElemPostition);
        } else {
          window.scrollTo(0, scrollTop);
          setTimeout(step, 20);
        }
      };
      step();
    } else if (tragetElem) {
      tragetElem.scrollIntoView({
        behavior: "smooth",
        inline: "nearest"
      });
    }
  }
const topEl = document.getElementById("toTop")
topEl!.addEventListener("click", (e) => {
  scrollIntoView(0)
})
function initScroll() {
    
    const top = document.documentElement.scrollTop;
    // const maxHeight = document.body.clientHeight + document.body.clientHeight / 2
    const maxHeight = document.body.clientHeight / 2

  if (top > maxHeight) {
    topEl!.style.opacity = '1'
    topEl!.style.pointerEvents = "auto"
  } else {
    topEl!.style.opacity = '0'
    topEl!.style.pointerEvents = "none"
  }
}
if (OpenViewTransitions) {
    document.addEventListener('astro:page-load', initScroll)
} else initScroll()
window.addEventListener("scroll", initScroll);
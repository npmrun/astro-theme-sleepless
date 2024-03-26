import { UseMotion } from '@blog/config'
import anime from 'animejs'

if (UseMotion) {
    var tl = anime.timeline({
        easing: 'linear',
    })

    function addElement(
        els: string,
        opts: { timelineOffset?: string | Function | number; duration: number | Function, classList: string[] }
    ) {
        const elements = document.querySelectorAll(els)
        if (elements.length) {
            elements.forEach((el, i) => {
                tl.add(
                    {
                        targets: el,
                        duration: opts.duration && (["string","number"].includes(typeof opts.duration) ? opts.duration : (opts.duration as Function)(i, elements.length)),
                        complete: function () {
                            el.classList.add(...opts.classList)
                        },
                    },
                    opts.timelineOffset && (["string","number"].includes(typeof opts.timelineOffset) ? opts.timelineOffset : (opts.timelineOffset as Function)(i, elements.length))
                )
            })
        }
    }
    if(location.pathname.startsWith("/posts")) {
        addElement('.article-image', {duration: 200, classList: ['animated', 'fadeIn']})
        addElement('#menu-wrapper', {timelineOffset: 200, duration: 300, classList: ['animated', 'fadeInLeft']})
        addElement('.comment-wrapper', {timelineOffset: 200, duration: 300, classList: ['animated', 'fadeIn']})
        addElement('.menus', {timelineOffset: 200, duration: 300, classList: ['animated', 'fadeInRight']})
        addElement('.markdown-body', {timelineOffset: 200, duration: 300, classList: ['animated', 'fadeIn']})
        addElement('.markdown-body > *', {timelineOffset: (i: number, total: number)=>{
            if(i == 0) return "-100"
            if(total > 25){
                return "-=5"
            }else{
                return "-=10"
            }
        },duration: (i: number, total: number)=>{
            if(total > 25){
                return 15
            }else{
                return 40
            }
        }, classList: ['animated', 'fadeInDown']})
        addElement('.footer', {timelineOffset: 600, duration: 300, classList: ['animated', 'fadeIn']})
        addElement('.maybe-like', {timelineOffset: 400, duration: 300, classList: ['animated', 'fadeIn']})
    } 
}

import { UseMotion } from '@blog/config'
import anime from 'animejs'

if (UseMotion) {
    var tl = anime.timeline({
        easing: 'linear',
        // duration: 1800,
    })

    // const allCard = document.querySelectorAll('.article-card')

    // tl.add(
    //     {
    //         targets: allCard,
    //         duration: 500,
    //         complete: function (anim) {
    //             allCard.forEach((el, i) => {
    //                 el.classList.add('animated', 'fadeInDown')
    //             })
    //         },
    //     },
    //     '-=200'
    // )

    const allHomePanel = document.querySelectorAll('.home-panel')
    allHomePanel.forEach((el, i) => {
        tl.add(
            {
                targets: el,
                duration: 500,
                complete: function (anim) {
                    el.classList.add('animated', 'fadeInDown')
                },
            },
            '-=200'
        )
    })

    tl.add(
        {
            targets: '.markdown-body',
            duration: 500,
            complete: function (anim) {
                document.querySelectorAll('.markdown-body').forEach((el, i) => {
                    el.classList.add('animated', 'fadeInDown')
                })
            },
        },
        '-=600'
    )
    tl.add(
        {
            targets: '.article-image',
            duration: 500,
            complete: function (anim) {
                document.querySelectorAll('.article-image').forEach((el, i) => {
                    el.classList.add('animated', 'fadeIn')
                })
            },
        },
        '-=600'
    )
        tl.add(
        {
            targets: '.footer',
            duration: 500,
            complete: function (anim) {
                document.querySelectorAll('.footer').forEach((el, i) => {
                    el.classList.add('animated', 'fadeInUp')
                })
            },
        },
        '-=600'
    )

    // allCard.forEach((el, i) => {
    //     tl.add(
    //         {
    //             targets: el,
    //             duration: 500,
    //             complete: function (anim) {
    //                 el.classList.add('animated', 'fadeInDown')
    //             },
    //         },
    //         '-=400'
    //     )
    // })

    const el = document.querySelector('.left')

    tl.add(
        {
            targets: el,
            duration: 500,
            complete: function (anim) {
                el?.classList.add('animated', 'fadeInLeft')
            },
        },
        '-=1200'
    )

    const swiper_el = document.querySelector('.swiper-parent')

    tl.add(
        {
            targets: swiper_el,
            duration: 500,
            complete: function (anim) {
                swiper_el?.classList.add('animated', 'fadeIn')
            },
        },
        '-=1200'
    )

    const comment_el = document.querySelector('.comment-wrapper')

    tl.add(
        {
            targets: comment_el,
            duration: 500,
            complete: function (anim) {
                comment_el?.classList.add('animated', 'fadeIn')
            },
        },
        '-=1200'
    )
}

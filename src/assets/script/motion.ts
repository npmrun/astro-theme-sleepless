import anime from 'animejs'

var tl = anime.timeline({
    easing: 'linear',
    // duration: 1800,
})

const allCard = document.querySelectorAll('.article-card')

allCard.forEach((el, i) => {
    tl.add(
        {
            targets: el,
            duration: 500,
            complete: function (anim) {
                el.classList.add('animated', 'fadeInDown')
            },
        },
        '-=400'
    )
})
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

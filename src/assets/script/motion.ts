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
                el.classList.add('animate__animated', 'animate__fadeInDown')
            },
        },
        '-=400'
    )
})

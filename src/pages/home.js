import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'

gsap.registerPlugin(ScrollTrigger)

export const home = () => {
  let headings = document.querySelectorAll('[heading-animate]')

  headings.forEach((heading) => {
    gsap.fromTo(
      heading.querySelectorAll('.letter'),
      {
        y: '100%',
      },
      {
        y: '0%',
        ease: 'expo.out',
        stagger: 0.03,
        duration: 1.6,
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
        },
      }
    )
  })

  /**
   * Swiper Reviews Slider
   */

  $('.slider-component').each(function () {
    const swiper = new Swiper($(this).find('.swiper')[0], {
      modules: [Autoplay],
      speed: 750,
      loop: true,
      autoHeight: false,
      centeredSlides: false,
      followFinger: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      disableOnInteraction: false,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        // mobile landscape
        480: {
          slidesPerView: 'auto',
        },
        // tablet
        768: {
          slidesPerView: 'auto',
        },
        // desktop
        992: {
          slidesPerView: 'auto',
        },
      },
      pagination: {
        el: $(this).find('.swiper-bullet-wrapper')[0],
        bulletActiveClass: 'is-active',
        bulletClass: 'swiper-bullet',
        bulletElement: 'button',
        clickable: true,
      },
      navigation: {
        nextEl: $(this).find('.swiper-next')[0],
        prevEl: $(this).find('.swiper-prev')[0],
        disabledClass: 'is-disabled',
      },
      scrollbar: {
        el: $(this).find('.swiper-drag-wrapper')[0],
        draggable: true,
        dragClass: 'swiper-drag',
        snapOnRelease: true,
      },
      slideActiveClass: 'is-active',
      slideDuplicateActiveClass: 'is-active',
    })
    console.log(swiper)
  })
}

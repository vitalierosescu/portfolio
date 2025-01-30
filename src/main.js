import './styles/style.css'

import barba from '@barba/core'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'

import { makeVideosLazy } from './features/makeVideosLazy'
import { home } from './pages/home'
import { enterTransition, leaveTransition } from './transitions/transitions'
import { resetWebflow } from './utils/resetWebflow'

gsap.registerPlugin(ScrollTrigger)

let lenis

window.addEventListener('resize', () => {
  lenis.resize()
})

barba.hooks.after(() => {
  lenis.resize()
  setTimeout(() => {
    lenis.resize()
  }, 1000)

  const $home = document.querySelector('[data-barba-namespace="home"]')
  if ($home) {
    home()
  }
})

const startLenis = () => {
  lenis = new Lenis({
    lerp: 0.3,
    wheelMultiplier: 1.0,
    infinite: false,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,
    autoResize: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

/** Add stop & start lenis eventlisteners */
$('[data-lenis-start]').on('click', function () {
  lenis.start()
  $('[data-lenis-toggle]').toggleClass('stop-scroll')
})
$('[data-lenis-toggle]').on('click', function () {
  $(this).toggleClass('stop-scroll')
  if ($(this).hasClass('stop-scroll')) {
    lenis.stop()
  } else {
    lenis.start()
  }
})

const init = () => {
  $('a').on('click', () => {
    if ($('[data-lenis-toggle]').hasClass('stop-scroll')) {
      lenis.start()
    }
  })
  startLenis()
}
init()

barba.init({
  debug: false,
  transitions: [
    {
      name: 'default-transition',
      once: () => {
        startLenis()
      },
      async leave({ current }) {
        lenis.stop()
        await leaveTransition(current.container)
      },
      beforeEnter() {
        lenis.start()
        lenis.scrollTo(0, { lerp: 0.05, lock: true, immediate: true })
      },
      enter({ next }) {
        enterTransition(next.container)
        resetWebflow(next.html)
        lenis.start()
      },
    },
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        makeVideosLazy()
        console.log('we are home')
        home()
      },
    },
  ],
})

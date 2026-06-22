if (window.anime) {
  const { animate, splitText, stagger } = anime

  if (animate && splitText && stagger) {
    const { chars: chars1 } = splitText('.home__profession-1', { chars: true })
    const { chars: chars2 } = splitText('.home__profession-2', { chars: true })

    animate(chars1, {
      y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 4000, ease: 'in(3)' }
      ],
      duration: 900,
      ease: 'out(3)',
      delay: stagger(80),
      loop: true,
    })

    animate(chars2, {
      y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 4000, ease: 'in(3)' }
      ],
      duration: 900,
      ease: 'out(3)',
      delay: stagger(80),
      loop: true,
    })
  }
}

if (window.Swiper) {
  new Swiper('.projects__swiper', {
    loop: false,
    rewind: true,
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    speed: 600,
    allowTouchMove: true,
    simulateTouch: true,
    touchRatio: 1.25,
    threshold: 3,
    touchStartPreventDefault: false,
    preventClicks: true,
    preventClicksPropagation: true,

    pagination: {
      el: '.projects__swiper .swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      540: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
    }
  })
}


const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) =>{
  tab.addEventListener('click', () =>{
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector) 

        if (!targetContent) return

        tabContents.forEach((content) => content.classList.remove('work-active'))
        tabs.forEach((t) => t.classList.remove('work-active'))

        tab.classList.add('work-active')
        targetContent.classList.add('work-active')
})
})

const servicesButtons = document.querySelectorAll('.services__button')

const updateServiceHeights = () => {
  document.querySelectorAll('.services__card').forEach(card => {
    const info = card.querySelector('.services__info')
    if (!info) return

    const isOpen = card.classList.contains('services-open')
    info.style.height = isOpen ? `${info.scrollHeight}px` : '0'
    info.style.opacity = isOpen ? '1' : '0'
  })
}

updateServiceHeights()

servicesButtons.forEach(button => {
  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.closest('.services__card')

      if (!currentCard) return

      const isCardOpen = currentCard.classList.contains('services-open')

      
      servicesCards.forEach(card => {
        card.classList.replace('services-open','services-close')
    })

    
    if(!isCardOpen){
      currentCard.classList.replace('services-close','services-open')
    }

    updateServiceHeights()
  })
})

window.addEventListener('resize', updateServiceHeights)




const copyBtn = document.getElementById('contact-btn'),
      copyEmailElement = document.getElementById('contact-email'),
      copyEmail = copyEmailElement ? copyEmailElement.textContent : ''

if (copyBtn && copyEmail) {
  copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyEmail).then(() => {
          copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

          setTimeout(() => {
            copyBtn.innerHTML = 'Copy Email <i class="ri-file-copy-line"></i>'
          }, 2000)
        })
      })
}


const textYear = document.getElementById('footer-year'),
      currentYear = new Date ().getFullYear()
      
if (textYear) textYear.textContent = currentYear


const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id,
          top = section.offsetTop - 50,
          height = section.offsetHeight,
          link = document.querySelector(`.nav__menu a[href="#${id}"]`)

    if(!link) return
    
    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height )
  })
}
window.addEventListener('scroll', scrollActive)

const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 

const cursorMove = () => {

if (!cursor) return

cursor.style.left = `${mouseX}px`
cursor.style.top = `${mouseY}px`
cursor.style.transform = 'translate(-50%, -50%)'


  requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
mouseX = e.clientX
mouseY = e.clientY
})

if (cursor) cursorMove()


const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    if (!cursor) return
    cursor.classList.add('hide-cursor')
  })
  item.addEventListener('mouseleave', () => {
    if (!cursor) return
    cursor.classList.remove('hide-cursor')
  })
})


const revealTargets = `.home__image, .projects__container, .work__container,
          .testimonials__container, .contact__container,
          .home__data, .home__info, .home__social, .home__cv,
          .about__data, .about__image, .services__card`

if (window.ScrollReveal) {
  const isSmallScreen = window.innerWidth <= 480

  const sr = ScrollReveal({
    origin: 'top',
    distance : isSmallScreen ? '28px' : '60px',
    duration : isSmallScreen ? 1100 : 2000,
    delay : isSmallScreen ? 120 : 300,
    mobile: true,
    reset: false,
    cleanup: true,
    
  })

  sr.reveal(`.home__image, .projects__container, .work__container,
          .testimonials__container, .contact__container`)
  sr.reveal(`.home__data`,{delay:900,origin: 'bottom'})
  sr.reveal(`.home__info`,{delay:1200,origin: 'bottom'})
  sr.reveal(`.home__social, .home__cv`, {delay:1500})
  sr.reveal(`.about__data`, {origin:'left'})
  sr.reveal(`.about__image`, {origin:'right'})
  sr.reveal(`.services__card`, {interval:100})
} else {
  document.querySelectorAll(revealTargets).forEach(element => {
    element.style.visibility = 'visible'
    element.style.opacity = '1'
    element.style.transform = 'none'
  })
}

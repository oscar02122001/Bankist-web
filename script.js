'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const sections = document.querySelectorAll('.section')

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const btnLinks = document.querySelectorAll('.nav__link')
const btnOperation = document.querySelector('.operations__tab-container')
const btntabs = document.querySelectorAll('.operations__tab')
const contents = document.querySelectorAll('.operations__content')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((openBtn) => openBtn.addEventListener('click', openModal))
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
})

//////////////////////////////////////////SCROLL BTN

btnScroll.addEventListener('click', function (e) {
  ////Scroll MODERN way ////////////////
  section1.scrollIntoView({
    behavior: 'smooth'
  })

  ////////SCroll OLD way//////

  // const s1coords = section1.getBoundingClientRect()
  // console.log(s1coords);

  // // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })
})

/////// OPERATION BUTTOMS 


btnOperation.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  // console.log(clicked);
  //Moderen way
  // if (!clicked) return;
  if (clicked) {
    // const dataTab = clicked.getAttribute('data-tab')
    // const content = document.querySelector(`.operations__content--${dataTab}`)
    btntabs.forEach(tabs => tabs.classList.remove('operations__tab--active'))
    contents.forEach(text => text.classList.remove(`operations__content--active`))

    clicked.classList.add('operations__tab--active')
    // content.classList.add('operations__content--active')
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  };

})

////////////////////////PAGE NAVIGATION

// 1.Add event listener to common parrent element 
// 2.Determine what element organized the event 

const delegation = function (targetEvent) {
  if (targetEvent.classList.contains('nav__link')) {
    const id = targetEvent.getAttribute('href')
    // console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  }
}

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()
  delegation(e.target)
})


////// HEADER HOVER LINKS


const headerHover = function (e) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img')
    // console.log(logo);

    siblings.forEach(sib => {
      if (sib !== link) sib.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', headerHover.bind(0.5))

nav.addEventListener('mouseout', headerHover.bind(1))

//// STICKY NAVIGATION

// const initialCoords = section1.getBoundingClientRect()
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY, initialCoords.top);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else {
//     nav.classList.remove('sticky')
//   }
// })


const header = document.querySelector('.header')
const stickyHeight = nav.getBoundingClientRect()

const stickyNav = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky')
    } else {
      nav.classList.remove('sticky')
    }
  })
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${stickyHeight.height}px`,
})
headerObserver.observe(header)

//// REVEAL SECTION

const sectionsAll = document.querySelectorAll('.section')

const sectionCome = function (entries, observer) {
  const [entry] = entries
  // console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
  }
}

const observeSection = new IntersectionObserver(sectionCome, {
  root: null,
  threshold: 0.1,
})
sectionsAll.forEach(section => {
  observeSection.observe(section)
  // section.classList.add('section--hidden')
})

///Lazy Load Imgs

const imgTargets = document.querySelectorAll('img[data-src]')
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
}

const obsImg = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})

imgTargets.forEach(img => {
  obsImg.observe(img)
})


///SLIDER

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
///MAKE SLIDER WITH DOTS 
const containerDots = document.querySelector('.dots')

const createrDots = function () {
  slides.forEach(function (_, i) {
    containerDots.insertAdjacentHTML('beforeend', `<button class = "dots__dot"
        data-slide =${i}></button>`)
  })
}
createrDots()

const dotActive = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active')
}

/////////CURRENT SLIDE

//// FIRST WAY
// dots.forEach(btn => btn.addEventListener('click', function (e) {
//   const data = +btn.getAttribute('data-slide')
//   goToSlide(data)
// }))

// / SECOND WAY
containerDots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide)
    dotActive(slide)
  }
})

let curSlide = 0
let slideSize = slides.length

// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`)
const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-slide)}%)`)
  dotActive(slide)
}
goToSlide(0)

const nextSlide = function () {
  if (curSlide === slideSize - 1) {
    curSlide = 0
  } else {
    curSlide++
  }
  goToSlide(curSlide)
  dotActive(curSlide)
}

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = slideSize - 1
  } else {
    curSlide--
  }
  goToSlide(curSlide)
  dotActive(curSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', previousSlide)

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowLeft') previousSlide()
})



// const content = document.querySelector(`.operations__content--${dataTab}`)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//OBSERVER 

// const section2 = document.querySelector('#section--2')

// const obsCallback = function (entries, observer) {
//   // console.log(entries);
//   entries.forEach(entry => {
//     console.log(entry);

//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)


// console.log(document.documentElement);
// const header = document.querySelector('.header')

// const section = document.querySelectorAll('.section')
// console.log(section);

// const allBtn = document.getElementsByTagName('button')
// console.log(allBtn);

// const allBtn1 = document.querySelectorAll('button')
// console.log(allBtn1);

// // const x = allBtn.

// ///// Creating and inserting elements

// const message = document.createElement('div')
// message.classList.add('cookie-message');
// message.innerHTML = "We use for improved fonctionality and analytics. <button class='btn btn--close-cookie'>Got it! </button>"

// // header.prepend(message)

// header.append(message)
// // header.append(message.cloneNode(true))
// // header.appendChild(message)
// // header.before(message)
// // header.after(message)

// //Delete elements

// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove()
//   // message.parentElement.removeChild(message)
// })

// message.style.backgroundColor = '#444'

// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height) +70 + 'px'

// console.log(message.style.height);

// document.documentElement.style.setProperty('--color-primary', 'red')


// const btnScroll = document.querySelector('.btn--scroll-to')
// const section1 = document.querySelector('#section--1')

// btnScroll.addEventListener('click', function (e) {

//   ////Scroll MODERN way ////////////////
//   section1.scrollIntoView({
//     behavior: 'smooth'
//   })

//////////SCroll OLD way//////

//   const s1coords = section1.getBoundingClientRect()
//   console.log(s1coords);

//   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth'
//   })
// })

// const h1 = document.querySelector('h1')

// const addH1 = function (e) {
//   alert('Great!')
// }

// h1.addEventListener('mouseenter', addH1)
// // h1.removeEventListener('mouseenter', addH1)

// const random = function (num) {
//   return Math.floor(Math.random() * num) + 1
// }

// const randomColor = () => `rgb(${random(255)}, ${random(255)}, ${random(255)})`

// console.log(randomColor());
// // h1.addEventListener('click', function (e) {
// //   e.preventDefault()
// //   h1.style.backgroundColor = randomColor()
// // })
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // setTimeout(() => {
//   this.style.backgroundColor = randomColor()
//   console.log("LINK", e.target);
//   console.log('LINK', e.currentTarget);
//   // }, 2000)
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // setTimeout(() => {
//   this.style.backgroundColor = randomColor()
//   console.log("CONTAINER", e.target);
//   console.log('CONTAINER', e.currentTarget);
//   // }, 3000)

// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//   // setTimeout(() => {
//   this.style.backgroundColor = randomColor()
//   console.log("NAV", e.target);
//   console.log('NAV', e.currentTarget);
//   // })
// })



// ///////////////////////////////////////////DOM TRAVERSING 

// const h1 = document.querySelector('h1')

// //Going dawnwards: child
// console.log(h1.childNodes);
// console.log((h1.children));
// console.log(h1.querySelectorAll('.highlight'));
// h1.firstElementChild.style.color = 'red'
// h1.lastElementChild.style.fontSize = '100px'

// //going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.backgroundColor = 'green'
// h1.closest('h1').style.backgroundColor = 'white'

// // going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.3)';
// })

// const btnOperation = document.querySelector('.operations__tab-container')
// const btntabs = document.querySelectorAll('.operations__tab')
// const contents = document.querySelectorAll('.operations__content')
// // btntabs.forEach(btn => {
// //   console.log(btn);
// //   const dataTab = btn.getAttribute('data-tab')
// //   const content = document.querySelector(`.operations__content--${dataTab}`)
// //   btn.addEventListener('click', function (e) {
// //     // e.preventDefault()
// //     // btn.classList.remove('operations__tab--active')
// //     btn.classList.add('operations__tab--active')
// //     content.classList.toggle('operations__content--active')
// //   })
// // })
// btnOperation.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab')

//   //Moderen way
//   // if (!clicked) return;

//   if (clicked) {
//     // const dataTab = clicked.getAttribute('data-tab')
//     // const content = document.querySelector(`.operations__content--${dataTab}`)
//     btntabs.forEach(tabs => tabs.classList.remove('operations__tab--active'))
//     contents.forEach(text => text.classList.remove(`operations__content--active`))

//     clicked.classList.add('operations__tab--active')
//     // content.classList.add('operations__content--active')
//     document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
//   };

// })



// const delegation = function (targetEvent) {
//   if (targetEvent.classList.contains('nav__link')) {
//     const id = targetEvent.getAttribute('href')
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     })
//   }
// }
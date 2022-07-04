'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionSignUp = document.querySelector('.section--sign-up');
const btnOperationTab = document.querySelector('.operations__tab-container');
const section1 = document.querySelector('#section--1');
const navigation = document.querySelector('nav');
//--------------------------------------
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//smooth scrolling
btnScrollTo.addEventListener('click', function () {
  sectionSignUp.scrollIntoView({ behavior: 'smooth' });
});
//-----------------------------------------------------------------
//  192 event delegation
// here we use event delegation to scroll to a specific section while clicking on any nav items

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//---------------------------------------------------------------------
// 194 changing tabs buttons

// my method !! it also works
let currentActiveTab = 1;
btnOperationTab.addEventListener('click', function (el) {
  el.preventDefault();
  console.log(el.target);
  const clicked = el.target.closest('.operations__tab');
  //---------- if clicked outside the buttons i.e between gaps of the buttons it willl be false and the below
  //function will return the function itself and the code below that will not execute
  // if its true then   the code below that will execute------------
  if (!clicked) return;

  const ClassToMakeActive = clicked.getAttribute('data-tab');
  console.log(ClassToMakeActive);
  if (ClassToMakeActive != currentActiveTab) {
    clicked.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${ClassToMakeActive}`)
      .classList.add('operations__content--active');
    document
      .querySelector(`.operations__tab--${currentActiveTab}`)
      .classList.remove('operations__tab--active');
    document
      .querySelector(`.operations__content--${currentActiveTab}`)
      .classList.remove('operations__content--active');

    currentActiveTab = ClassToMakeActive;
  }
});

//building tabbed component with jonas method
const tabs = 1;
//-----------------------------------------------------------------------------------

// changing the color of nav links when hovered
const changeOpacity = function (e, opacityValue) {
  const link = e.target.closest('.nav__link');
  if (!link) return;
  //to get all the other links from the given navbar
  const otherLink = link.closest('nav').querySelectorAll('.nav__link');
  if (!otherLink) return;
  // console.log(otherLink);
  otherLink.forEach(item => {
    if (item !== link) {
      item.style.opacity = opacityValue;
    }
  });
};
const nav = document.querySelector('.nav__links');
nav.addEventListener('mouseover', function (e) {
  changeOpacity(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  changeOpacity(e, 1); //1 is opactiy value
});
//-------------------------------------------------

//197 intersection observer API
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallbackFunction, obsOptions);

// function obsCallbackFunction(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }
// observer.observe(section1);
//implementing sticky navigation

const header = document.querySelector('.header');
const callback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add('sticky');
  else navigation.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(callback, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserver.observe(header);

//-------------------------------------------------------------------
// 198 revealing elements on scroll
const allSection = document.querySelectorAll('.section');
//console.log(allSection);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//-------------------------------------------------------------------------

// lazy loading
const lazyImages = document.querySelectorAll('.features>img');
//console.log(lazyImages);
const lazyImageRemoveFunction = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  console.log(entry);
  entry.target.classList.remove('lazy-img');
  //console.log(entry.target.getAttribute('src'));
  entry.target.src = entry.target.dataset.src;
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(lazyImageRemoveFunction, {
  root: null,
  threshold: 1,
});
lazyImages.forEach(image => {
  imageObserver.observe(image);
});
/////////////////////////////////////////////////////////////////////////////////////////////

/*
//--------------------------------------------------------------------------------------------
// 186 styling creating and deleting elements
//creating
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `We use cookie here and thats compulsory <button class = 'btn btn--close-cookie'>Got it! </button>`;
const header = document.querySelector('.header');
header.append(message); // for displaying at end
header.prepend(message); //for displaying at the top

const logo = document.querySelector('.nav__logo');
console.log(logo.className);
*/

//----------------------------------------------------------------------
/*
// smooth scrolling


const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(5, 20));
*/
//------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

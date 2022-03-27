// Change Navigation background when scroll
window.addEventListener('scroll', ()=> {
   // Target the navigation
   document.querySelector('.navigation').classList.toggle('when_scroll', window.scrollY > 0);
})

// Toggle menu
// Targetting elements
const menu = document.querySelector('#menu_btn');
const close_btn = document.querySelector('#close_btn');
const nav_lists = document.querySelector('.nav_lists');

// Toggle menu
menu.addEventListener('click', () => {
   nav_lists.style.display = 'flex';
   close_btn.style.display = 'inline-block';
   menu.style.display = 'none';
});

// Toggle close_btn
close_btn.addEventListener('click', () => {
   nav_lists.style.display = 'none';
   close_btn.style.display = 'none';
   menu.style.display = 'inline-block';
})
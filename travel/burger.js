const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.navigation');
const menuCloseItem = document.querySelector('.header_nav-close')
const accountClose = document.querySelector('.account');

burgerItem.addEventListener('click', () => {
    menu.classList.add('navigation_active');

})

menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('navigation_active');

})

accountClose.addEventListener('click', () => {
    menu.classList.remove('navigation_active');
})

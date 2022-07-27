const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.navigation');
const menuCloseItem = document.querySelector('.header_nav-close')

burgerItem.addEventListener('click', () => {
    menu.classList.add('navigation_active');

})

menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('navigation_active');

})





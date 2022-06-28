const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const track = document.querySelector('.slider-track');
let xxx = 0;


btnNext.addEventListener('click', () => {
    xxx = xxx - 860;
    track.style.transform = `translateX(${xxx}px)`;

});

btnPrev.addEventListener('click', () => {
    xxx = xxx + 860;
    track.style.transform = `translateX(${xxx}px)`;


});
const time = document.querySelector('.time');
const calendar = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');
let randomNum = getRandomNum(1, 20);
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let quoteNumber;
const play = document.querySelector('.play');
let isPlay = false;
let playNum = 0;
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');

//time.textContent = "Text";
//TIME OUTPUT

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    getTimeOfDay();
    setTimeout(showTime, 1000);
}
showDate();

showTime();

//Date (Calendar) OUTPUT


function showDate(language) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString(language, options);
    calendar.textContent = currentDate;
}

/* 
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;
    if (hours >= 0) {
        timeOfDay = 'night';
    };

    if (hours >= 5) {
        timeOfDay = 'morning';
    };

    if (hours >= 12) {
        timeOfDay = 'afternoon';
    };

    if (hours >= 18) {
        timeOfDay = 'evening';
    };
    //greeting.textContent = `Good ${timeOfDay}`;

    return timeOfDay;
};
 */


const timeOfDayforImages =
    [
        'night',
        'morning',
        'afternoon',
        'evening'
    ]

function getTimeOfDay() {

    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;
    if (hours >= 0) {
        timeOfDay = 0;
    };

    if (hours >= 5) {
        timeOfDay = 1;
    };

    if (hours >= 12) {
        timeOfDay = 2;
    };

    if (hours >= 18) {
        timeOfDay = 3;
    };
    //greeting.textContent = `Good ${timeOfDay}`;

    return timeOfDay;
};

const greetingTranslation = {
    'en': [
        ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
        ['[Enter city]', '[Enter Name]'],
        ['Wind speed: ', 'Humidity: ']
    ],
    'ru': [
        ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
        ['[Введите город', '[Введите имя]'],
        ['Скорость ветра: ', 'Влажность: ']
    ],
};

function fillingPlaceholders(language = 'en') {
    city.placeholder = `${greetingTranslation[language][1][0]}`;
    name.placeholder = `${greetingTranslation[language][1][1]}`;
}
fillingPlaceholders();

const buttonChangeLanguage_Ru = document.querySelector('.localization_ru');
const buttonChangeLanguage_En = document.querySelector('.localization_en')
function showGreetings(language) {
    let timeOfDay = getTimeOfDay();
    greeting.textContent = `${greetingTranslation[language][0][timeOfDay]}`;
}

showGreetings('en');

function changeLanguage_ru() {
    showGreetings('ru')
    showDate('ru')
    getWeather('ru');
    fillingPlaceholders('ru');

}
function changeLanguage_en() {
    showGreetings('en')
    showDate('en')
    getWeather('en');
    fillingPlaceholders('en');

}
buttonChangeLanguage_Ru.addEventListener('click', changeLanguage_ru);
buttonChangeLanguage_En.addEventListener('click', changeLanguage_en);
//greetings.textContent = "${greetingTranslation[lang][0][index]}!!!
function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

/* function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');

    }
} */
/* window.addEventListener('load', getLocalStorage)
 */
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather()
    }
}
window.addEventListener('load', getLocalStorage)


function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = randomNum.toString().padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/geniusx1990/stage1-tasks/assets/images/${timeOfDayforImages[timeOfDay]}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}
setBg();

next.addEventListener('click', (getSlideNext));

function getSlideNext() {
    randomNum = Number(randomNum) + 1;
    if (randomNum < 10) {
        let bgNum = randomNum.toString().padStart(2, '0');
    }
    if (randomNum === 21) {
        randomNum = 1;
        let bgNum = randomNum.toString().padStart(2, '0');
    }
    setBg();

}


prev.addEventListener('click', (getSlidePrev))

function getSlidePrev() {
    randomNum = Number(randomNum) - 1;
    if (randomNum < 10) {
        let bgNum = randomNum.toString().padStart(2, '0');
    }
    if (randomNum === 0) {
        randomNum = 20;
        let bgNum = randomNum.toString().padStart(2, '0');
    }
    setBg();
}

city.addEventListener('change', (getWeather));

async function getWeather(language = 'en') {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=35cf8b52e8c7efc5397ac10a73900bec&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${greetingTranslation[language][2][0]} ${Math.trunc(data.wind.speed)} m/s`;
    humidity.textContent = `${greetingTranslation[language][2][1]} ${Math.trunc(data.main.humidity)} %`;
}


async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let quoteNumber = getRandomNum(0, data.length);

    quote.textContent = data[quoteNumber].text;
    author.textContent = data[quoteNumber].author;
}
getQuotes();

changeQuote.addEventListener('click', (getQuotes))


const audio = new Audio();

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (!isPlay) {
        audio.play();
        activeAdd();
        nowPlaying.textContent = playList[playNum].title;
        play.classList.add('pause');
        //play.className = 'play player-icon pause';
        isPlay = true;
    } else {
        pauseAudio()
    }
    console.log(playNum)
    //play.classList.add('active');

};
function pauseAudio() {
    audio.pause();
    activeAdd();
    play.classList.remove('pause');

    //play.className = 'play player-icon play';
    isPlay = false;
}

play.addEventListener('click', (playAudio));

/* function toggleBtn() {
    play.classList.toggle('pause');
} */
/* play.addEventListener('click', toggleBtn);
 */

import playList from './playList.js';
const listOfItems = document.querySelector('.play-list')

for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    //li.classList.add('play-item');
    li.setAttribute('class', 'play-item');
    li.textContent = playList[i].title;
    listOfItems.append(li);
}
let liNum = document.querySelectorAll('.play-item');

function activeAdd() {
    for (let j = 0; j < liNum.length; j++) {
        if (j === playNum) {
            liNum[j].classList.add('item-active');
        } else {
            liNum[j].classList.remove('item-active');
        }
    }
};
playNext.addEventListener('click', () => {

    playNum = playNum + 1;
    if (playNum === 4) {
        playNum = 0;
    }
    playAudio();


})

playPrev.addEventListener('click', () => {
    if (playNum === 0) {
        playNum = playList.length;
    }
    if (playNum != 0) {
        playNum = playNum - 1;
    }
    playAudio();

})

audio.addEventListener('ended', () => {
    playNum = playNum + 1;
    if (playNum === 4) {
        playNum = 0;
    }
    playAudio();
    audio.play();
});

//--------------------------------- player PRO;

const audioPlayer = document.querySelector('.player');
const div = document.createElement('div');
div.setAttribute('class', 'timeline');
//audioPlayer.prepend(div);
listOfItems.before(div);
const timeline = document.querySelector('.timeline');
const div2 = document.createElement('div');
div2.setAttribute('class', 'progress');
timeline.append(div2);
const div3 = document.createElement('div');
div3.setAttribute('class', 'songTime');
//audioPlayer.append(div3);
listOfItems.before(div3);
const playerControls = document.querySelector('.player-controls');
const songTime = document.querySelector('.songTime');
const div4 = document.createElement('div');
div4.setAttribute('class', 'current')
div4.textContent = '0:00'
songTime.append(div4);
const div5 = document.createElement('div');
div5.setAttribute('class', 'divider');
div5.textContent = '/';
songTime.append(div5);
const div6 = document.createElement('div');
div6.setAttribute('class', 'length');
div6.textContent = playList[playNum].duration;
songTime.append(div6);
const div7 = document.createElement('div');
div7.setAttribute('class', 'now-playing');
timeline.before(div7);
const nowPlaying = document.querySelector('.now-playing');
const div8 = document.createElement('div');
div8.setAttribute('class', 'volume-container');
audioPlayer.prepend(div8);
const volumeContainer = document.querySelector('.volume-container');
const div9 = document.createElement('div');
div9.setAttribute('class', 'volume-button');
volumeContainer.append(div9);
const volumeButton = document.querySelector('.volume-button');
const div10 = document.createElement('div');
div10.setAttribute('class', 'volume icono-volumeMedium');
volumeButton.append(div10);
const div11 = document.createElement('div');
div11.setAttribute('class', 'volume-slider');
volumeContainer.append(div11);
const div12 = document.createElement('div');
div12.setAttribute('class', 'volume-percentage');
const volumeSlider = document.querySelector('.volume-slider');
volumeSlider.append(div12);

audioPlayer.querySelector('.progress');
audio.addEventListener('loadeddata', () => {
    audioPlayer.querySelector(".songTime .length").textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
},
    false
);

timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".songTime .current").textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}



//click volume slider to change volume
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
    } else {
        volumeEl.classList.add("icono-volumeMedium");
        volumeEl.classList.remove("icono-volumeMute");
    }
});





/* greetings.textContent = "${greetingTranslation[lang][0][index]}, ";
вот такой пример
и в функцию аргумент по умолчанию добавил
const showGreetings = (lang = 'en') => { ... }
при нажатии на кнопку перевода несколько функций просто перезапустить и все */

/* const hello = (lang = 'en') => {
    const TRANSLATION = {
      'en' : 'Hello, world!',
      'ru' : 'Привет, мир!'
    }
    return '${TRANSLATION[lang]}';
  }
  hello('en')  - тоже самое что и hello() так как указан аргумент по умолчанию ('en').
  при вызове выдаст строку Hello, world.
  если же вызвать функцию hello('ru') то получится строка Привет, мир (edited)
  
 */

/*   const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
  } */
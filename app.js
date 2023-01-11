import { projects } from "./projects.js";
import { lerp, debounce } from './utils.js'
const projectSliderContainer = document.querySelector('.project__slider__outer')
const projectSlider = document.querySelector('.project__slider__inner')
let tiles = [];
let scrolling = false;


projects.forEach((project, idx) => {
    let tile = document.createElement('div');
    tile.className = 'project__tile';
    tile.classList.add(`${idx}`);
    tile.style.backgroundImage = `url(${project.image})`;
    projectSlider.appendChild(tile);
    tiles.push(tile);
})

let index = 0

function setDimensions() {
    if (window.innerWidth < 1000) {
        projectSlider.style.width = `${(((window.innerWidth * .9) * projects.length) + (window.innerWidth * .1))}px`;
    } else {
        projectSlider.style.width = `${(1000 * projects.length) + (window.innerWidth-1000)}px`;
    }
}

const processScrolling = debounce(() => {
    adjustSliderIndex();
    scrolling = false;
})

projectSliderContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrolling = true;
    processScrolling();
    projectSliderContainer.scrollLeft += e.deltaY;
});

function adjustSliderIndex() {
    const scrollLeft = projectSliderContainer.scrollLeft;
    const results = []
    for (let i = 0; i < tiles.length; i++) {
        const divPosition = tiles[i].offsetLeft;
        const divWidth = tiles[i].offsetWidth;
        const hiddenBefore = scrollLeft - divPosition;
        const hiddenAfter = (divPosition + divWidth) - (scrollLeft + window.innerWidth);
        let result;
        if ((scrollLeft > divPosition + divWidth) || (divPosition > scrollLeft + window.innerWidth)) {
            result = 0;
            results.push(result)
        } else {
            result = 100;
            if (hiddenBefore > 0) {
                result -= (hiddenBefore * 100) / divWidth;
            }
            if (hiddenAfter > 0) {
                result -= (hiddenAfter * 100) / divWidth;
            }
            results.push(result)
        }
        console.log(results.indexOf(Math.max(...results)));
        index = results.indexOf(Math.max(...results));
        // console.log(index)
    }
}

function scrollSlider() {
    let scrollCalc = window.innerWidth > 1000 
    ? window.innerWidth - (window.innerWidth - 1000) 
    : window.innerWidth *.9;

    if (!scrolling) {
        projectSliderContainer.scrollLeft = lerp(projectSliderContainer.scrollLeft, index * scrollCalc, .1)
    }
}

function animate() {
    scrollSlider()
    requestAnimationFrame(animate)
}

setDimensions()
window.addEventListener('resize', setDimensions);
animate()
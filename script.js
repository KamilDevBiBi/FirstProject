const iconMenu = document.querySelector('.fa-bars');
const circleTheme = document.getElementById('circleTheme');
const theme = document.querySelector('theme');
const circleShadow = document.getElementById('circleShadow');
var switchs = document.querySelectorAll('.switch');
const body = document.body;
const menu = document.querySelector('.menu');

iconMenu.addEventListener('click', function(){
    menu.classList.toggle('menu-active');
});
circleTheme.addEventListener('click', function(){
    circleTheme.classList.toggle('newStyle');
    switchs[1].classList.toggle('switch-theme-active');
    document.body.classList.toggle('light-theme');

})
circleShadow.addEventListener('click', function(){
    circleShadow.classList.toggle('newStyle');
    switchs[0].classList.toggle('switch-shadow-active');
});
body.addEventListener('click', function(event){
    if(event.target.id == 'fa-bars'){
        return;
    }
    else if(!menu.contains(event.target)){
        menu.classList.remove('menu-active');
    }
});
const inputs = document.querySelectorAll('input[name*="slideInput"]');
const rightArrow = document.querySelector('#right-arrow');
const leftArrow = document.querySelector('#left-arrow');
const SlideWidth = document.querySelector('.slide-div').clientWidth;
var slides = document.querySelector('.slides');
const labelContent = document.querySelectorAll('.slideLabel');
const slidesNumber = inputs.length;
let slidesScroll = 0;
let slidesScrollValue = 0;
function ScrollToSlide(){
    slidesScroll = slidesScrollValue;
    slides.scroll({
        left: slidesScroll,
        behavior: 'smooth'
    })
}
function currentSlide(){
    for(let i = 0; i < slidesNumber; i++){
        if(slidesScroll == SlideWidth * i){
            inputs[i].checked = true;
            break;
        }
    }
}
for(let i = 0; i < labelContent.length; i++){
    labelContent[i].addEventListener('click', function(){
        slidesScrollValue = SlideWidth * i;
        ScrollToSlide();
    })
}
rightArrow.addEventListener('click', function(){
    if(slidesScroll < SlideWidth * (slidesNumber - 1)){
        slidesScrollValue += SlideWidth;
    }
    ScrollToSlide();
    currentSlide();
})
leftArrow.addEventListener('click', function(){
    if(slidesScroll > 0){
        slidesScrollValue -= SlideWidth;
    }
    ScrollToSlide();
    currentSlide();
})
let Dragging = false;
let startCursor;
let startScroll;
function draggingStart(e){
    Dragging = true;
    startCursor = e.pageX;
    startScroll = slides.scrollLeft;
    slides.classList.add('dragging');
}
let LastEventPageX;
function dragging(e){
    if(e.target.classList.contains('arrows')){
        return;
    }
    if(Dragging){
        slidesScroll = startScroll - (e.pageX - startCursor);
        LastEventPageX = e.pageX;
        slides.scroll({
            left: slidesScroll,
            behavior: 'instant'
        })
    }
}
const distanceToScroll = SlideWidth/2;
function draggingStop(event){
    Dragging = false;
    slides.classList.remove('dragging');
    if(event.target.classList.contains('arrows')){
        return;
    }
    if(LastEventPageX == undefined){
        return;
    }
    let scrollToLeft = true;
    let scrollDistance = startCursor - LastEventPageX;
    if(scrollDistance < 0){
        scrollToLeft = false;
        scrollDistance *= -1;
    }
    if(scrollDistance > distanceToScroll){
        for(let i = 0; i < slidesNumber; i++){
            if(SlideWidth * i <= slidesScroll && slidesScroll <= SlideWidth * (i + 1)){
                if(scrollToLeft){
                    slidesScrollValue = SlideWidth * (i + 1);
                }else{
                    slidesScrollValue = SlideWidth * i;
                }
                break
            }
        }
    }
    slidesScroll = slidesScrollValue;
    currentSlide();
}
slides.addEventListener('mousedown', draggingStart);
slides.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', draggingStop);
// letters move
const letters = document.querySelectorAll('.letter');
const restartButton = document.querySelector('.restart');
var coords = {};
const px = 'px';
var win_height = window.innerHeight;
for(let letter of letters){
    coords[letter] = [letter.style.left, letter.style.top]
    letter.addEventListener('mouseover', function(){
        const width = letter.clientWidth;
        const height = letter.clientHeight;
        var posit = window.pageYOffset;
        var xCoord = random(0,letter.parentElement.clientWidth - 2*width) + px;
        var yCoord = random(0,letter.parentElement.clientHeight - 2*height) + px;        
        if(letter.classList.contains('letter-menu')){
            letter.style.left = xCoord;
            letter.style.top = yCoord;
        }else{
            xCoord = random(0, window.innerWidth - 2*width) + px;
            yCoord = random(posit, win_height + posit - height) + px;
            letter.style.left = xCoord;
            letter.style.top = yCoord;
        };
    })
    restartButton.addEventListener('click', function(){
        letter.style.left = coords[letter][0];
        letter.style.top = coords[letter][1]; 
    })
}
var bool = true
function toogleOutoutClass(){
    if(bool){
        saturateOutput.classList.toggle('output-active');
        bool = false
    }
}
const outputText = document.querySelector('#output-text')
const saturateInput = document.querySelector('.range');
const saturateOutput = document.querySelector('.div-output');
saturateInput.addEventListener('mousemove', function(){
    var inputValue = saturateInput.value;
    outputText.innerHTML = inputValue + '%'
    toogleOutoutClass();
})
saturateInput.addEventListener('touchmove', function(){
    var inputValue = saturateInput.value;
    toogleOutoutClass()
})
saturateInput.addEventListener('click', function(){
    var inputValue = saturateInput.value;
    toogleOutoutClass()
})
function random(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const navLinks = document.querySelectorAll('.link')
for(let link of navLinks){
    link.addEventListener('click', function(e){
        e.preventDefault()
        window.scrollTo({
            top: document.querySelector(link.getAttribute('href')).offsetTop,
            behavior: 'smooth'
        })
    })
}
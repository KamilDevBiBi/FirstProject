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
const slidesArray = slides.querySelectorAll('div');
const labelContent = document.querySelectorAll('.slideLabel');
let slidesScroll = 0
for(let i = 0; i < labelContent.length; i++){
    labelContent[i].addEventListener('click', function(){
        slides.scrollLeft = SlideWidth * i
    })
}
function currentSlide(){
    for(let i = 0; i < inputs.length; i++){
        if(slides.scrollLeft == SlideWidth * i){
            inputs[i].checked = true
         }
    }
}
window.scroll({
    behavior: 'smooth'
});
rightArrow.addEventListener('click', function(){
    slidesScroll  += SlideWidth
    if(slidesScroll >= SlideWidth * slidesArray.length){
        slidesScroll  -= SlideWidth
    }
    slides.scroll({
        top: 0,
        left: slidesScroll,
        behavior: 'smooth'
    });
    currentSlide() 
})
leftArrow.addEventListener('click', function(){
    slidesScroll -= SlideWidth
    if(slidesScroll < 0){
        slidesScroll  += SlideWidth
    }
    slides.scroll({
        left: slidesScroll,
        behavior: 'smooth'
    })
    currentSlide()
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
function dragging(e){
    if(Dragging){
    slides.scrollLeft = startScroll - (e.pageX - startCursor);
    }
    currentSlide()
};
function draggingStop(){
    Dragging = false;
    slides.classList.remove('dragging');
}
slides.addEventListener('mousedown', draggingStart);
slides.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', draggingStop)
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
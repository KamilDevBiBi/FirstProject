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
const inputs = document.querySelectorAll('input[name*="d"]');
function currentSlide(){
    for(let i = 0;i < inputs.length; i++){
        if(inputs[i].checked == true){
            return i + 1;
        }
    }
};

const rightArrow = document.querySelector('#right-arrow');
const leftArrow = document.querySelector('#left-arrow');
const mainSlide = document.querySelector('#img1');
const slides = document.querySelector('.slides');
const slidesArray = slides.querySelectorAll('div');
const slideLength = slidesArray.length;
rightArrow.addEventListener('click', function(event){
    var currentRightSlide = currentSlide() + 1;
});
leftArrow.addEventListener('click', function(event){
    var currentLeftSlide = currentSlide();
});
const dragging = (e) =>{
    slides.scrollLeft
}
slides.addEventListener('mousemove', dragging);
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
const saturateInput = document.querySelector('.range');
const saturateOutput = document.querySelector('.div-output');
saturateInput.addEventListener('mousemove', function(){
    var inputValue = saturateInput.value;
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
console.log('ok')
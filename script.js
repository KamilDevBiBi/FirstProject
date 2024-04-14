const iconMenu = document.querySelector('.menu-toggle');
const circleTheme = document.getElementById('circleTheme');
const circleLetter = document.querySelector('#button-letter')
var switchs = document.querySelectorAll('.switch');
const body = document.body;
const menu = document.querySelector('.menu');

let SearchS = document.querySelector('.search')
iconMenu.addEventListener('click', function(){
    menu.classList.toggle('menu-active');
});
circleTheme.addEventListener('click', function(){
    circleTheme.classList.toggle('circle-active');
    switchs[2].classList.toggle('switch-active');
    document.body.classList.toggle('light-theme');

})
const restartButtonMenu = document.querySelector('#restart-menu')
circleLetter.addEventListener('click', function(){
    circleLetter.classList.toggle('circle-active');
    switchs[1].classList.toggle('switch-active');
    document.querySelector('.restart-grid').classList.toggle('restart-active')
    restartButton[1].classList.toggle('hide-button')
})
body.addEventListener('click', function(event){
    if(event.target.classList.contains('fa-bars')){
        return;
    }
    else if(restartButton[0].contains(event.target)){
        return
    }
    else if(menu.contains(event.target)){
        return
    }
    else if(DialogButton.contains(event.target)){
        return
    }
    menu.classList.remove('menu-active');
});
const inputs = document.querySelectorAll('input[name*="slideInput"]');
const rightArrow = document.querySelector('#right-arrow');
const leftArrow = document.querySelector('#left-arrow');
let slides = document.querySelector('.slides');
const SlideWidth = slides.querySelector('.slide-div').offsetWidth;
const labelContent = document.querySelectorAll('.slideLabel');
const slidesCount = inputs.length;

let slidesScrollValue = SlideWidth
function slidesScrollConverter(){
    slides.scrollLeft = slidesScrollValue
}
let slidesArray = slides.querySelectorAll('div')
slides.insertAdjacentHTML('afterbegin', slidesArray[slidesCount - 1].outerHTML)
slides.insertAdjacentHTML('beforeend', slidesArray[0].outerHTML)

const FiveSlidesWidth = SlideWidth * (slidesCount + 1)
const Slides = document.querySelectorAll('.slide-div')

let FirstScroll;
let LastScroll;
function currentSlide(){
    for(let i = 0; i < inputs.length; i++){
        if(slidesScrollValue == SlideWidth * (i + 1)){
            inputs[i].checked = true
            break
        }
    }
}

let scrollAnimation;
for(let i = 0; i < slidesCount; i++){
    labelContent[i].addEventListener('click', function(){
        slidesScrollValue = SlideWidth * (i + 1);
        slidesScrollConverter()
    })
}

rightArrow.addEventListener('click', function(){
    if(slidesScrollValue < FiveSlidesWidth){
        slidesScrollValue += SlideWidth
    }
    slidesScrollConverter()
    currentSlide() 
})
leftArrow.addEventListener('click', function(){
    if(slidesScrollValue > 0){
        slidesScrollValue -= SlideWidth
    }
    slidesScrollConverter()
    currentSlide()
})


let Dragging = false;
let startCursor;
let startScroll;
function draggingStart(e){
    Dragging = true;
    startCursor = e.pageX || e.touches[0].pageX;
    startScroll = slides.scrollLeft;
    slides.classList.add('dragging');
}
let LastEventPageX;
let scrollDistance;
function dragging(e){
    if(e.target.classList.contains('arrows')){
        return;
    }
    if(Dragging){
        LastEventPageX = e.pageX || e.touches[0].pageX;
        slides.scrollLeft = startScroll - (LastEventPageX - startCursor);
    }
}

const distanceToScroll = SlideWidth/2.25;
let NewEventPageX;
function draggingStop(event){
    Dragging = false;
    slides.classList.remove('dragging');
    if(event.target.classList.contains('arrows')){
        return;
    }
    else if(event.target.classList.contains('arrow')){
        return;
    }
    if(LastEventPageX == NewEventPageX){
        return
    }
    NewEventPageX = LastEventPageX
    scrollDistance = startCursor - LastEventPageX
    let scrollToSlide = SlideWidth
    if(scrollDistance < 0){
        scrollDistance *= -1
        scrollToSlide *= -1
    }
    if(scrollDistance < distanceToScroll){
        slides.scrollLeft = slidesScrollValue
        return
    }
    slidesScrollValue += scrollToSlide
    slidesScrollConverter()
    currentSlide()
}
slides.addEventListener('mousedown', draggingStart)
slides.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', draggingStop)

slides.addEventListener('touchstart', draggingStart)
slides.addEventListener('touchmove', dragging)
document.addEventListener('touchend', draggingStop)

const SlidesWidth = slides.scrollWidth - SlideWidth
const LastSlideLeft = document.querySelectorAll('.slide-div')[slidesCount + 1].offsetLeft - 1
const SliderContent = document.querySelector('.slider-content')
slides.addEventListener('scroll', function(){
    if(slidesScrollValue == FiveSlidesWidth){
        inputs[0].checked = true
    }
    else if(slidesScrollValue == 0){
        inputs[slidesCount - 1].checked = true
    }
    let CeilSlidesScroll = Math.ceil(slides.scrollLeft)
    if(CeilSlidesScroll == SlidesWidth ||
    CeilSlidesScroll == FiveSlidesWidth ||
    CeilSlidesScroll == LastSlideLeft){
        slidesScrollValue = SlideWidth
        slides.classList.add('no-smooth')
        slides.scrollLeft = slidesScrollValue
        slides.classList.remove('no-smooth')
    }
    else if(slides.scrollLeft == 0){
        slidesScrollValue = SlideWidth * slidesCount
        slides.classList.add('no-smooth')
        slides.scrollLeft = slidesScrollValue
        slides.classList.remove('no-smooth')
    }
})

// letters move
let lettersMove = false

const circleShadow = document.getElementById('circleShadow');
circleShadow.addEventListener('click', function(){
    circleShadow.classList.toggle('circle-active')
    switchs[0].classList.toggle('switch-active')
    changeLettersMove()
})
function changeLettersMove(){
    if(lettersMove == false){
        lettersMove = true
    }else{
        lettersMove = false
    }
}
const restartButton = document.querySelectorAll('.restart');
const letters = document.querySelectorAll('.letter');
var coords = {};
const winHeight = window.innerHeight;
const winWidth = window.innerWidth;
let IsLetterMove = false
for(let letter of letters){
    coords[letter] = [letter.style.left, letter.style.top]
    letter.addEventListener('mouseover', function(){
        if(!lettersMove){
            return
        }
        IsLetterMove = true
        const width = letter.clientWidth;
        const height = letter.clientHeight;
        const posit = window.scrollY;
        var xCoord = random(0,letter.parentElement.clientWidth - 2*width) + 'px';
        var yCoord = random(0,letter.parentElement.clientHeight - 2*height) + 'px';        
        if(!letter.classList.contains('letter-menu')){
            xCoord = random(0, winWidth - 2*width) + 'px';
            yCoord = random(posit, winHeight + posit - height) + 'px';
        }
        letter.style.left = xCoord;
        letter.style.top = yCoord;
    })
    for(let button of restartButton){
        button.addEventListener('click', function(){
            if(!IsLetterMove){
                return
            }
            letter.style.left = coords[letter][0];
            letter.style.top = coords[letter][1];
            
        })
    }
}
function random(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const navLinks = document.querySelectorAll('.link')
for(let link of navLinks){
    link.addEventListener('click', function(e){
        e.preventDefault()
        const ScrollElem = document.querySelector(link.getAttribute('href'))
        window.scrollTo({
            top: ScrollElem.offsetTop - winHeight/2 + ScrollElem.clientHeight,
            behavior: 'smooth'
        })
    })
}
let SearchWord;
const SearchInput = document.querySelectorAll('.search-input')

function SearchIcon(){
    SearchWord = SearchInput.value.toLowerCase()
    SearchAction()
}
let TextArray = document.querySelectorAll('p')
let Search = document.querySelectorAll('.search')

function SearchMenu(){
    for(let SearchChild of Search[MenuIndex].children){
        if(SearchChild.classList.contains('search-input')){
            SearchChild.addEventListener('keydown', KeyDownSearch)
        }else{
            SearchChild.addEventListener('click', IconClickSearch)
        }
    }
}
function IconClickSearch(){
    SearchWord = SearchInput[MenuIndex].value.toLowerCase()
    SearchAction()
}
function KeyDownSearch(e){
    navLinks[2].textContent = e.code
    console.log(e.code)
    if(wrongSearchDiv.classList.contains('show')){
        wrongSearchDiv.classList.remove('show')
        wrongSearch.classList.remove('wrong-search-active')
    }
    if(e.code == 'Enter'){
        SearchWord = SearchInput[MenuIndex].value.toLowerCase()
        SearchAction()
    }
}
let MenuIndex = 0
if(winWidth > 750){
    MenuIndex = 1   
}
SearchMenu()
const wrongSearch = document.querySelector('.wrong-search')
const DialogButton = document.querySelector('.return-dialog')
const SearchProblem = document.querySelector('.problem')
const SearchProblem1 = document.querySelector('.problem1')
const wrongSearchDiv = document.querySelector('.show-hide')
DialogButton.addEventListener('click', function(){
    wrongSearchDiv.classList.remove('show')
    wrongSearch.classList.remove('wrong-search-active')
})
function SearchAction(){
    if(SearchWord == ''){
        wrongSearch.classList.add('wrong-search-active')
        wrongSearchDiv.classList.add('show')
        SearchProblem.textContent = 'Ваш запрос оказался пустой'
        SearchProblem1.textContent = 'Пожалуйста, введите слово'
        return
    }
    if(SearchWord.length < 3){
        wrongSearch.classList.add('wrong-search-active')
        wrongSearchDiv.classList.add('show')
        SearchProblem.textContent = 'Ваш запрос состоит менее чем из 3 букв'
        SearchProblem1.textContent = 'Пожалуйста, введите слово, которое состоит больше 2 букв'
        return
    }

    for(let p of TextArray){
        if(p.classList.contains('letter') ||
        p.classList.contains('restart') ||
        wrongSearch.contains(p)){
            continue
        }
        const text = p.innerText
        const wordLength = SearchWord.length
        const TextLength = text.length
        const wordIndexes = GetWordIndexes(text, SearchWord)
        if(wordIndexes.length === 0){
            const Mark = document.querySelector('.mark')
            if(p.contains(Mark)){
                Mark.classList.toggle('no-mark')
            }
            continue
        }
        p.innerHTML = MarkWord(text, wordIndexes, TextLength, wordLength)
    }
    const FirstMark = document.querySelector('.mark')
    if(!FirstMark){
        return
    }
    if(menu.contains(FirstMark)){
        menu.classList.toggle('menu-active')
    }else{
        window.scrollTo({
            top: FirstMark.offsetTop,
            behavior: 'smooth'
        })
    }
}
function MarkWord(text, wordIndexes, TextLength, wordLength){
    let NewText = text
    let CurrentTagLength = 0
    const TagLength = '<span class="mark"></span>'.length
    for(let index of wordIndexes){
        let CurrentIndex = index + CurrentTagLength
        NewText = NewText.slice(0, CurrentIndex) + '<span class="mark">' + NewText.slice(CurrentIndex, CurrentIndex + wordLength) + '</span>' + NewText.slice(CurrentIndex + wordLength,+ TextLength)
        CurrentTagLength += TagLength
        TextLength += TagLength
    }
    return NewText
}
function GetWordIndexes(text, word){
    let indexArray = []
    for(let i = 0; i < text.length; i++){
        if(text[i].toLowerCase() === word[0]){
            if(text.slice(i, i + word.length).toLowerCase() == word){
                indexArray.push(i)
            }
        }
    }
    return indexArray
}
body.addEventListener('click', function(e){
    if(wrongSearch.contains(e.target)){
        return
    }
    wrongSearch.classList.remove('wrong-search-active')
})
body.addEventListener('click', function(e){
    if(e.target.classList.contains('fa-magnifying-glass')){
        return
    }
    for(let mark of document.querySelectorAll('.mark')){
        mark.classList.remove('mark')
    }
})

const images = document.images
const imagesCount = images.length
var loadedImages = 0
var loadPercent = 0
const PreLoader = document.querySelector('.pre-loader')
let IsLoaded = false
for( let i = 0; i < imagesCount; i++){
    imageClone = new Image()
    imageClone.onload = imageLoading
    imageLoading.onerror = imageLoading
    imageClone.src = images[i].src
}
function imageLoading(){
    loadedImages += 1
    loadPercent =100 - ((100 / imagesCount) * loadedImages) << 0
    PreLoader.children[1].style.backgroundPosition = loadPercent + '%' + ' ' + '100%'
    if(loadPercent == 0){
        IsLoaded = true
    }
}
body.onload = function(){
    if(!IsLoaded){
        return
    }
    PreLoader.classList.add('loaded')
}
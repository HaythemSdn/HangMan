
let letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lettersContainer=document.querySelector('.letters')


let ArrayLetters=Array.from(letters);

ArrayLetters.forEach((letter)=>{

let span=document.createElement('span')
let spanText=document.createTextNode(letter)
span.appendChild(spanText)
span.classList.add('letter-box')
lettersContainer.appendChild(span)
})
fetch('json.json')
.then((response)=>response.json())


.then((words)=>{



//getting keys from object
let domain=Object.keys(words)
//getting random value 
let randomNumber1=Math.floor(Math.random()*domain.length)
//getting random domain
let randomDomain=domain[randomNumber1]
//getting the random domain's values
let domainValues=words[randomDomain]
//getting random value 
let randomNumber2=Math.floor(Math.random()*domainValues.length)
//getting the random info (the searching word)
let info=domainValues[randomNumber2]


let category =document.querySelector('.category span')
category.innerHTML=randomDomain

let lettersGuess=document.querySelector('.letters-guess')

let wordArray=Array.from(info)

wordArray.forEach((letter)=>{
    let span =document.createElement('span')
    span.classList="empty"
    lettersGuess.appendChild(span)

})
let wrongAnswer=0;
let hangmanDraw=document.querySelector('.hangman-draw')
document.addEventListener('click',function(e){
    let theStatus=false
    if (e.target.classList.contains('letter-box')){
      e.target.classList.add('clicked')
     let  theClickedLetter=e.target.innerHTML.toLowerCase()
     let AllSpans=document.querySelectorAll('.letters-guess span')
     let SpanArray=Array.from(AllSpans)


     wordArray.forEach((letter,letterIndex)=>{
      if (theClickedLetter===letter){
          theStatus=true;
          SpanArray.forEach((span,spanIndex)=>{
            if (letterIndex===spanIndex){
                span.innerHTML=theClickedLetter.toLowerCase()
                span.classList.remove("empty")
            }
        })
        let SpanArrayempty=SpanArray.filter((span)=>span.classList.contains('empty'))
        if (SpanArrayempty.length==0){
          winning()
        }
      }
    })
    if(theStatus==false){
        wrongAnswer++;
        hangmanDraw.classList.add(`wrong-${wrongAnswer}`)
        document.querySelector('.fail').play()
        if (wrongAnswer==8){
             endGame()

        }
    }else{
        document.querySelector('.Succes').play()

        
    }
    }

})
 function endGame(){
    lettersContainer.classList.add('finished')
    let div=document.createElement('div')
    let span1=document.createElement('span')
    let span1Text=document.createTextNode('Game Over')
    let span2=document.createElement('span')
    let span2Text=document.createTextNode(`The word is : ${info}`)
    span1.appendChild(span1Text)
    span1.classList='GO'
    span2.classList='wrong'
    span2.appendChild(span2Text)
    div.appendChild(span1)
    div.appendChild(span2)
    div.classList='gameOver'
    let container=document.querySelector('.container')
    container.appendChild(div)
 }
 function winning(){
    lettersContainer.classList.add('finished')
    let div=document.createElement('div')
    let span1=document.createElement('span')
    let span1Text=document.createTextNode('You Win !!!')
    let span2=document.createElement('span')
    let level
    if (wrongAnswer<3){
        level="Excellent"
    }else if (wrongAnswer<6) {
        level="good"

    }else{
        level="What a chance !!"
    }
    let span2Text=document.createTextNode(`Your Wrong Answers are : ${wrongAnswer}`)
    let span3Text=document.createTextNode(level)
    let span3=document.createElement("span")
    span3.appendChild(span3Text)
    span1.appendChild(span1Text)
    span1.classList='GO'
    span2.classList='wrong'
    span3.classList='level'
    span2.appendChild(span2Text)
    div.appendChild(span1)
    div.appendChild(span2)
    div.appendChild(span3)
    div.classList='gameOver'
    let container=document.querySelector('.container')
    container.appendChild(div)
    

 }
});




const quoteText=document.getElementById("quote");
const author=document.getElementById("author");
const twitter=document.getElementById("twitter");
const loader=document.getElementById("loader");
const quoteContainer=document.getElementById("quote-container");

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
let apiQuotes=[];
async function getQuotes(){
loading();
    const url="https://type.fit/api/quotes";
    try{
        const response=await fetch(url);
        apiQuotes=await response.json();
        console.log(apiQuotes);
        const quote=apiQuotes[getRandom()];
        if(!quote.author){
            author=textContent="unknown";
        }
        else{
            author.textContent=quote.author;
        }
        if(quote.text.length>150){
            quoteText.classList.add("long-quote");
        }
        else{
            quoteText.classList.remove("long-quote");
        }
        quoteText.textContent=quote.text;
        complete();
        console.log(quote);
    }
    catch(error){

    }
}
getQuotes();

function getRandom(){

    let newVal=Math.floor(Math.random()*apiQuotes.length);
    // while(val===newVal){
    //     newVal=Math.floor(Math.random()*apiQuotes.length);
    // }
    return newVal; 
}
 

function getNewQuote(){
    const index=getRandom();
    complete();
    quote.innerText=apiQuotes[index].text;
    author.innerText=apiQuotes[index].author;

}

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl,'_blank');
}
twitter.addEventListener('click',tweetQuote);
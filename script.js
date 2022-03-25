//get quotes
const quoteContainer= $('#quote-container');
const quoteText= $('#quote');
const quoteAuthor= $('#author');
const twiiterBtn= $('#twitter');
const newQuoteBtn= $('#new-quote');
const loader= $('#loader');

let apiQuotes=[];


function loading(){
    loader.show();
    quoteContainer.hide();

}

function complete(){
    loader.hide();
    quoteContainer.show();
    
}

function newQuote(){
    loading();
   const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

 if(quote.text.length>100)
     quoteText.addClass('long-quote');
else
quoteText.removeClass('long-quote');
if(quote.author)
     quoteAuthor.text(quote.author);
   else
    quoteAuthor.text("Unknown");
   quoteText.text(quote.text);
   complete();
}

async function getQuotes(){
    loading();
    const apiUrl="https://type.fit/api/quotes";
   try{
    const response =await fetch(apiUrl);
    apiQuotes= await response.json();
   // console.log(apiQuotes[55]);
    newQuote()    
}catch(err){
    console.log(err);
   }
}

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.text()} - ${quoteAuthor.text()}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.click(function(){
    newQuote();
});
  

twiiterBtn.click(function(){
    tweetQuote();
});


getQuotes();
 
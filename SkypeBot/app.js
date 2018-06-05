// Refernce the bot frameworkk
var skype = require('botbuilder');

// Refernce the Expresss package
 var express = require('express');

 var app = express();

 var listeningport = process.env.PORT || 3000;

var currencyobtained = false;
var countryobtained = false;
var dollarvalue = 0.0;
var country ='';



// Connect to the BOT Service
var botservice = new skype.ChatConnector({

appId: '7a74bd6a-d0f2-45b4-8435-f1c51569feb9',
appPassword: 'fT9Xc6hFJKad28CTEBm3Mob'

});



//Create a refernce to our BOT Service
var bot = new skype.UniversalBot(botservice);

// Wire up the bot service object to  our Webservice, bcoz then it knows where to post the incoming message
app.post('/skp/msg', botservice.listen());


CurrencyConvertor = function (session){
// Read the user input
orgmsg= session.message.text;
var msg;

// Check if the input is numeric. if not then convert the text to lower case
if ( !isNumeric(msg)){
   msg = orgmsg.toLowerCase();
}
else {
  msg = orgtext;
}

var frmuser = session.message.user.name;

if(msg === 'hi' || msg === 'hello' || msg === 'hey'){
  session.send('Hello ' + frmuser + 'I am your Currency Convertor BOT')
}
else if( msg === 'canada' || msg === 'china' || msg === 'euro')
{
  countryobtained=true;
  country=msg;
}
else if (isNumeric(msg)){
   dollarvalue = msg;
   currencyobtained=true;
}
else {
  session.send('sorry, I dont understand. i can just convert US Currency to China yuan, Euro or candadian');
}

// have the user entered us the currency and country
if (currencyobtained && !countryobtained){
  session.send('Please enter the country to convert to..');
}

if (!currencyobtained && countryobtained){
  session.send(' Please enter the currency in USD..');
}
if (!currencyobtained && !countryobtained)
{
  session.send('Please enter the currency to convert to..');
}
if( currencyobtained && countryobtained)
{
  countryobtained=false;
  currencyobtained=false;

  var convertedval=0.0;
  switch(country){

    case 'canada':
      convertedval= dollarvalue * 1.25;
      session.send(' You requested to covert to canadian dollars and the value is...'+ convertedval);
    break;
    case 'china':
      convertedval =dollarvalue * 6.65;
      session.send(' You requested to covert to Chinese Yuan and the value is...'+ convertedval);
      break;
    case 'euro':
    convertedval =dollarvalue * 0.85;
    session.send(' You requested to covert to Chinese Yuan and the value is...'+ convertedval);
    break;

  }
}
}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) & isFinite(n);
}

bot.dialog('/', function(session){

  CurrencyConvertor(session);



  var skypemsg = session.message.text.toLowerCase();
  if (skypemsg === 'hi' || skypemsg  === 'hello' || skypemsg === 'hey'){
    session.send('Hi, I am your Currency convertor BOT. I only understand money');
  }
  else {
    session.send('Sorry, I dont understand. Could you repeat');
  }
});


app.get('/', function(req,res){
  res.send('Currency convertor BOT listening');
})


app.listen(listeningport, function(){
console.log('Currency convertor bot listening at ' + listeningport);

})

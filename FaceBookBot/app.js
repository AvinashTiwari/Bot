// Reference express
var express = require('express');
var app = express();

//Reference FB BOT Framework

var FBBotFramework = require('fb-bot-framework');

var listeningport =  process.env.PORT || 4000;

var currencyobtained = false;
var countryobtained = false;
var dollarvalue=0.0;
var country='';


// Initialise the FB BOT FBBotFramework

var bot= new  FBBotFramework({
  page_token: 'EAAc8lJMIRcQBAEcCtiKLPCbjBqp0din4ToogiyZBMhEJ0dNcvZAOkCvPwO7YHd9ZClnDAVqOr3IslpCs21hW2zYLEg802STFbzchcGKcqn6AJ86nsOHfZBMp6mAuv6n1Wh7g7lRZBjjHC6rzWT5GYHEB5tEv4KanutniJqPqSLwZDZD',
  verify_token: 'verify_token'
});

CurrencyConvertor = function(userId, msg){

  var orgtext = msg;

  if(!isNumeric(orgtext)){
  var message = orgtext.toLowerCase();
  }
  else {
    message = orgtext;
  }
  //var frmuser = session.message.user.name;


  if(message === 'hi' || message === 'hello' || message === 'hey'){
    bot.sendTextMessage(userId,'Hello.I am your curency convertor BOT.');
  }
  else if(message === 'canada' || message === 'india' || message === 'euro'){
    countryobtained = true;
    country=message;
  }
  else if(isNumeric(message)){
  dollarvalue=message;
  currencyobtained=true;
  }

  if(currencyobtained &&  !countryobtained){
    bot.sendTextMessage(userId,'Please enter the country to convert');
  }
  if(!currencyobtained && countryobtained){
    bot.sendTextMessage(userId,'Please enter the currency in USD ' + dollarvalue + ' ' + message);
  }
  if(!currencyobtained && !countryobtained){
    bot.sendTextMessage(userId,'Please enter currency in USD to convert');
  }

  if (currencyobtained && countryobtained) {

    countryobtained=false;
    currencyobtained=false;

  var convertedvalue=0.0;

    switch(country){
      case 'canada':
        convertedvalue = dollarvalue * 1.25;
        bot.sendTextMessage(userId,' You requested to convert to Canandian currency and the value is ' + convertedvalue);
        break;
      case 'india':
          convertedvalue = dollarvalue * 64.67;
          bot.sendTextMessage(userId,' You requested to convert to Indian currency and the value is ' + convertedvalue);
          break;
      case 'euro':
              convertedvalue = dollarvalue * 0.85;
              bot.sendTextMessage(userId,' You requested to convert to Euro and the value is ' + convertedvalue);
              break;

        }

        var quickreply = [
          {
            "content_type" : "text",
            "title": "👍",
            "payload" : "thumbs_up"
          },
          {
            "content_type" : "text",
            "title": "👎",
            "payload" : "thumbs_down"
          }

        ];

        bot.sendQuickReplies(userId, ' Please rate my service', quickreply);

  }

};

//Setup an express middleware for the webhook
app.use('/fb/msg', bot.middleware());

// Setup a listener for incoming messages
bot.on('message', function(userId, msg){
 // bot.sendTextMessage(userId, 'Hi, i am a copy cat :' + msg);
CurrencyConvertor(userId,msg);
});


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


// setup an event handler for the quickreplies
bot.on('quickreply', function(userid,payload){
if(payload === 'thumbs_up'){
  bot.sendTextMessage(userid, ' I am humbled. Thank you');
}
else if(payload === 'thumbs_down'){
    bot.sendTextMessage(userid, ' I am Sorry i was unable to help you');
}

});
// Implement the Get() method
app.get('/',  function(req, res){
  res.send("Facebook BOT listening...");
});

// start listening at the PORT
app.listen(listeningport, function(){
  console.log('Facebook BOT listening');
});

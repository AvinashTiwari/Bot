
# coding: utf-8

# In[3]:


import json
import os
import requests
from flask import Flask
from flask import  request
from flask import make_response


# In[4]:


app = Flask(__name__)

app.route('/webhook', method=['POST'])
def webhook():
    req = request.get_json(silent=True, force=True)
    print(json.dumps(req,indent=4))
    
    res = makeResponse(req)
    res = json.dumps(res,indent=4)
    r = make_response(res)
    r.header['Content-Type'] = 'application/json'
    return r


# In[5]:


def makeResponse(req):
    result = req.get('result')
    parameters = req.get('parameters')
    city = req.get('geo-city')
    date = req.get('date')
    speech = "The forecast for city " + city + " for date " + date + " is"
    
    r =  requests("https://samples.openweathermap.org/data/2.5/weather?q="+city+"&appid=b6907d289e10d714a6e88b30761fae22")
    json_object = r.json()
    weather = json_object['list']
    for i in range(0,30):
        if date in weather[i]['dt_txt']:
            condtion = weather[i]['weather'][0]['description']
            break
    
    speech = "The forecast for city " + city + " for date " + date + " is" + condtion

    return{
         "speech":speech,
         "displayText":speech,
         "source": "api-webhook"
    }

    


# In[6]:


if __name__ == '__main__':
    os.getenv('PORT', 5000)
    port = int(5000)
    print("Application running on port %d" %port)
    app.run(debug=False, port=port,host='0.0.0.0')


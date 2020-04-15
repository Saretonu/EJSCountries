const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post("/", function(req, res){
    let selectcountry = req.body.selectcountry;
    let countryUrl = `https://restcountries.eu/rest/v2/name/${selectcountry}`;
    request(countryUrl, function(error, response, body){
        console.log("Server status code ", response.statusCode);
        let data = JSON.parse(response.body);
        console.log("data",data);
        let ret = { name: ifobject(data[0].name),
            topLevelDomain: ifobject(data[0].topLevelDomain),
            callingCodes: ifobject(data[0].callingCodes),
            capital: ifobject(data[0].capital),
            region: ifobject(data[0].region),
            subregion: ifobject(data[0].subregion),
            population: ifobject(data[0].population),
            timezones: ifobject(data[0].timezones),
            languages: ifobject(data[0].languages),
            currencies: currenciesPrint(data[0].currencies),
            flag: ifobject(data[0].flag)
        };
        res.send(ret);
    });  
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});

function currenciesPrint(input){
    if(typeof input == "object"){
        let ret = "";
        for(i in input){
            ret += input[i].code + ", " + input[i].name + ", " + input[i].symbol + "; ";
        }
        return ret;
    } else {
        return input;
    }
}

function ifobject(input){
    if(typeof input == "object"){
        let ret = "";
        for(i in input){
            ret += input[i]+"; ";
        }
        return ret;
    } else {
        return input;
    }
}

/*app.listen(3000, function(){
    console.log("Server has started.");
});*/
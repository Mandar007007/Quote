const express = require("express")
const http = require("http")
const app = express();
const requests = require('requests')

app.set("view engine","hbs")


app.get("/",(req,res) => {
    res.render("index.hbs");
})

app.get("/about",(req,res) => {
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=4ad53ddf27a308e3fe58c175c8895884`)
    .on('data', function (chunk) {
        const objdata = JSON.parse(chunk)
        let arr = [objdata];
        
        console.log(`city name is ${req.query.name} and Temprature is ${objdata.main.temp}`)
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
     
      console.log('end');
      res.end();
    });
    res.render("about.hbs",{
        city:`${req.query.name}`
    })
})


app.listen(8000,() => {
    console.log("listning on port 8000")
})


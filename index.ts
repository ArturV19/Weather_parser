import KEY from "./key.js";

import {Request, Response} from "express";
import fetch from "node-fetch";
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');


const urlEncodedParser = bodyParser.urlencoded({
    extended: false,
});


app.get('/', urlEncodedParser, (req: Request, res: Response) => {
    res.render('pages/index');
});

// type JsonType = {
//     cod: number;
//     message: string;
//     main: {
//         temp: number;
//         pressure: number;
//     }
// }

app.get('/weather_data', (req, res) => {
    console.log(res.req);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${KEY}&units=metric`)
        .then(res => res.json())
        .then((data) => res.send(data));
    //  https://medium.com/@iampika/es6-arrow-functions-syntax-and-lexical-scoping-d061732071e7
});

app.get('/weather', urlEncodedParser, (req: Request, res: Response) => {
    res.render('pages/show_weather_info_proxy', {city: req.query.city});
});

app.listen(PORT);
console.log(`Server run on port ${PORT}`);
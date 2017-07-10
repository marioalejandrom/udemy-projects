/**
 * Created by mario on 7/8/17.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

app.use( (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use ((req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Site on Maintenance',
//         welcomeMessage: 'Sorry, the site is currenlty on maintenance, come back shortly.'
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello, you are Welcome'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Servers is up on port 3000');
});
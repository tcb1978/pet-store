require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const animal_controller = require(__dirname + '/animal_controller.js')

//Express
const app = express();
app.use(express.static(`${__dirname}/../build`))
const animalUrl = `/api/animals`
app.post(animalUrl, animal_controller.post)
app.put(`${animalUrl}/:id`, animal_controller.put)
app.delete(`${animalUrl}/:id`, animal_controller.delete)
app.get(`${animalUrl}`, animal_controller.get)
app.get(`${animalUrl}`, animal_controller.get)
app.get(`${animalUrl}`, animal_controller.get)

//middleware
app.get('/user/:id', function (req, res, next) {
    res.send('USER')
})

app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})

app.use(function (req, res, next) {
    console.log('USER:', userInfo.now())
    next()
})

app.use(bodyParser.json());

const db = app.get('db');

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
    }).catch((error) => console.error());


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port = 3333
app.listen(port, () => console.log(`listening on port ${port}`));
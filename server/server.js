require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const animal_controller = require(__dirname + '/animal_controller.js')
const path = require('path')

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


app.post('/login', (req, res) => {
    const { userId } = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
        }
    }).then(response => {
        const userData = response.data;
        app.get('db').find_user(userData.user_id).then(users => {
            if (!users.length) {
                app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name])
                    .then((user) => {
                        req.session.user = user[0]
                        res.json({ user: req.session.user });
                    })
                    .catch(error => {
                        console.log('error', error);
                    })
            } else {
                req.session.user = users[0]
                console.log(users[0]);
                res.json({ user: req.session.user });
            }
        })
    }).catch(error => {
        console.log('error', error);
        res.status(500).json({ message: 'Error!' });
    });
});

app.get('/user-data', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port = 3333
app.listen(port, () => console.log(`listening on port ${port}`));
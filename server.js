const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'clarifai'
    }
});

const app = express();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    //res.send(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)}); // Second parameter = function that calls another function with the same + more parameters. (Dependency injection)

//Could also do (With modification 1 in signin.js):
//app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db) });

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res) });

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is runnin on port ${process.env.PORT}`);
}) //Function will run on this port once it's running

// Necessary Routes/endpoints:

// / (root) route --> GET = side content
// /signin route --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT
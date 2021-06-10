const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Jane',
            email: 'j',
            password: 'a',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Robert',
            email: 'robert@gmail.com',
            password: 'platypus',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
    console.log('main page is loaded');
})


app.post('/signin', (req, res) => {
    console.log('getting post request for signin route');
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('Error logging in');
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    //Basic asynchronous usage
bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB
     console.log('hash');
   })
    database.users.push(
        {
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
})


bcrypt.compare('apples', '$2a$10$kVKybjRH3ORceGntkVwk4e3BmKYTDR1mEA8eSuI0u3Yi.L4hWWUG2', function(err, res) {
    console.log('Passowrd match:', res);
})

app.listen(3001, () => {
    console.log('App is runnin on port 3001');
}) //Function will run on port 300 once it's running


// Necessary Routes/endpoints:

// / (root) route --> GET = side content
// /signin route --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT
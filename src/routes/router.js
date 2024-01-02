const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const router = Router();
let currUser = null;
const saltRounds = 10;

router.get('/', async function (req, res) {
    res.render('login');
    console.log(currUser);
});

router.get('/logout', async function (req, res) {
    currUser = null;
    res.render('login');
});

router.get('/register', async function (req, res) {
    console.log(currUser);
    res.render('register');
});

router.post('/validate', async function (req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ name: username });
        console.log(username);
        console.log(password);
        if (user && bcrypt.compareSync(password, user.password)) {
            currUser = user;
            res.redirect('/secret/' + username);
            
        } else {
            console.log("invalid password");
        }        
    } catch (error) {
        console.error('Error during validation:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/insert', async function (req, res) {
    const { username, secret, password } = req.body;

    try {
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            console.log(hash);
                const newUser = new User({ name: username, secret: secret, password: hash });
                try {
                    await newUser.save();
                    console.log('User saved successfully');
                } catch (error) {
                    console.error('Error during user insertion:', error);
                }
            });

        res.render('login');
    } catch (error) {
        console.error('Error during user insertion:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/secret/:username', async function(req, res) {
    const selUsername  = req.params.username;
    console.log(currUser);
    const user = await User.findOne({ name: selUsername });
    console.log(user);
    if (user.name===currUser.name) {
        res.render('secret', { username: user.name, secret: user.secret });
    } else {
        res.status(404).send('You do not have permission to see this page');
    }
});


module.exports = router;

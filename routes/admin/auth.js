const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signUptemplate = require('../../views/admin/auth/signup');
const signIntemplate = require('../../views/admin/auth/signin');
const { 
    requireEmail, 
    requirePassword, 
    requirePasswordConfirmation, 
    requireEmailExists, 
    requireValidPasswordForUser 
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signUptemplate({ req }));
});


router.post(
    '/signup', 
    [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signUptemplate),
    async (req, res) => {
        // get access to email password and password comfirmation
        const { email, password, passwordConfirmation} = req.body;

        // Create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password });

        // Store the id of that user inside the users cookie
        req.session.userID = user.id; // Added by the cookie session!

       res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

router.get('/signin', (req, res) => {
    res.send(signIntemplate({}));
});

router.post('/signin',[
    requireEmailExists, 
    requireValidPasswordForUser],
    handleErrors(signIntemplate),
    async (req, res) => {
        const { email } = req.body;

        const user = await usersRepo.getOneBy({ email });

        req.session.userID = user.id;

        res.redirect('/admin/products');
});

module.exports = router;
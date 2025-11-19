const express = require('express');
const passport = require('passport');
const router = express.Router();

// Rota para iniciar o login com Discord
router.get('/', passport.authenticate('discord'));

// Rota de callback que o Discord chama após o login
router.get('/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/dashboard'); // Redireciona para o painel após o sucesso
});

// Rota de logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
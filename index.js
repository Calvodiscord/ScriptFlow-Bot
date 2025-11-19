// ScriptFlow-Bot-main/index.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path');
const bot = require('./bot/bot.js'); // Importa a instância do bot

const app = express();

// Configuração da Sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// COLE ESTE BLOCO CORRIGIDO NO LUGAR DO ANTIGO

const scopes = ['identify', 'guilds'];

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: scopes
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para passar a instância do bot para as rotas
app.use((req, res, next) => {
    req.bot = bot;
    next();
});

// Rotas
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

// Rota principal
app.get('/', (req, res) => {
    res.render('login');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🌐 Servidor web rodando na porta ${port}`);
    console.log(`==> Seu serviço está online 🚀`);
    console.log(`==> ////////////////////////////////////`);
    console.log(`==>`);
    console.log(`==> Disponível no seu URL principal`);
    console.log(`==>`);
    console.log(`==> ////////////////////////////////////`);
});}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para passar a instância do bot para as rotas
app.use((req, res, next) => {
    req.bot = bot;
    next();
});

// Rotas
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

// Rota principal
app.get('/', (req, res) => {
    res.render('login');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🌐 Servidor web rodando em http://localhost:${port}`);
});

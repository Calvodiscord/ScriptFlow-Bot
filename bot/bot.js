const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Crie uma instância do cliente do bot com as permissões (Intents) necessárias
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

bot.on('ready', () => {
    console.log(`🤖 ${bot.user.username} está online!`);
});

// Faça login no Discord com o token do seu bot
bot.login(process.env.BOT_TOKEN);

// Exporte o bot para que o servidor web possa usá-lo
module.exports = bot;

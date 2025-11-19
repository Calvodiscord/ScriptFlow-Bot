// ScriptFlow-Bot-main/routes/dashboard.js

const express = require('express');
const router = express.Router();

// Middleware para verificar se o usuário está autenticado
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.get('/', checkAuth, (req, res) => {
    // Filtra para mostrar apenas os servidores onde o usuário é administrador
    const adminGuilds = req.user.guilds.filter(g => (g.permissions & 0x8) === 0x8);
    res.render('dashboard', { user: req.user, guilds: adminGuilds });
});

// Rota para o comando de enviar mensagem
router.post('/send-message', checkAuth, async (req, res) => {
    const { channelId, message } = req.body;
    
    if (!channelId || !message) {
        return res.status(400).send("Channel ID e mensagem são obrigatórios.");
    }
    
    try {
        const channel = await req.bot.channels.fetch(channelId);
        if (channel) {
            await channel.send(message);
            res.redirect('/dashboard?status=success');
        } else {
            res.redirect('/dashboard?status=error_channel_not_found');
        }
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        res.redirect('/dashboard?status=error_sending');
    }
});

module.exports = router;    }
});

module.exports = router;

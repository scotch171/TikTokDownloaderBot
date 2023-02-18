const { Telegraf } = require('telegraf');
const axios = require("axios");
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Работаем'));
bot.help((ctx) => ctx.reply('Бог помощь'));


bot.on('text', async (ctx) => {
    const text = ctx.update.message.text;

    if (!text.includes("tiktok.com")) {
        return
    }
    ctx.reply('Начинаю загрузку');

    try {
        const video = await downloadTikTok(text);
        ctx.replyWithVideo(video)
    } catch (e) {
        bot.sendMessage(ctx.chat.id, 'Бот не работает')
        console.log(e);
    }
});

bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id);

    // Using context shortcut
    await ctx.leaveChat();
});

/**
 *
 * @param {string} url
 * @returns {string}
 */
async function downloadTikTok(url) {
    const options = {
        method: 'GET',
        url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
        params: {url: url},
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_KEY,
            'X-RapidAPI-Host': process.env.RAPID_HOST
        }
    };
    const response = await axios.request(options);
    return await response.data.video[0]
}


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
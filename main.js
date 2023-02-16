const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");
require('dotenv').config();

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.on('message', async (message) => {
    if (!message.text.includes("tiktok.com")) {
        return
    }
    bot.sendMessage(message.chat.id, 'Начинаю загрузку');

    try {
        const video = await downloadTikTok(message.text);
        await bot.sendVideo(message.chat.id, video);
    } catch (e) {
        bot.sendMessage(message.chat.id, 'Бот не работает')
        console.log(e);
    }
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
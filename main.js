const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");
const TOKEN = 'telegram token';

/** @see https://rapidapi.com/maatootz/api/tiktok-downloader-download-tiktok-videos-without-watermark/ */
const RAPID_KEY = 'key';
const RAPID_HOST = 'host';


const bot = new TelegramBot(TOKEN, {polling: true});

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
            'X-RapidAPI-Key': RAPID_KEY,
            'X-RapidAPI-Host': RAPID_HOST
        }
    };
    const response = await axios.request(options);
    return await response.data.video[0]
}
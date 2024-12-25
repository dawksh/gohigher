import TelegramBot from "node-telegram-bot-api"
import { config } from "dotenv"

config()

const token = process.env.TELEGRAM_BOT_KEY as string;

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match?.[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, "");
});
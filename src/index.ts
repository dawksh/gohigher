import TelegramBot from "node-telegram-bot-api"
import { config } from "dotenv"
import { handleMessage } from "./handlers/messages";

config()

const token = process.env.TELEGRAM_BOT_KEY as string;

const bot = new TelegramBot(token, { polling: true })

bot.on('message', (msg) => handleMessage(msg, bot));

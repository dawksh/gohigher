import TelegramBot, { Message } from "node-telegram-bot-api";

const handleMessage = async (msg: Message, bot: TelegramBot) => {
    const { chat, text } = msg;

    switch (text) {
        case "/start":
            bot.sendMessage(chat.id, "gohigher.life");
            break
        case "/join":
            bot.sendMessage(chat.id, "Join a new group");
            break
        case "/verify":
            bot.sendMessage(chat.id, "Verify using Strava");
            break
    }
}

const startSession = () => {

}

export { handleMessage }
import TelegramBot, { Message } from "node-telegram-bot-api";
import { supabase } from "../lib/supabase";

const handleMessage = async (msg: Message, bot: TelegramBot) => {
    const { chat, text } = msg;

    switch (text) {
        case "/start":
            startSession(chat.id, bot, msg.from?.username);
            break
        case "/join":
            bot.sendMessage(chat.id, "Join a new group");
            break
        case "/verify":
            bot.sendMessage(chat.id, "Verify using Strava");
            break
    }
}

const startSession = async (chatId: number, bot: TelegramBot, username?: string) => {
    const { data, error } = await supabase.from("users").select("*").eq("chat_id", chatId);
    if (!error && data.length > 0) {
        const user = data[0];
        bot.sendMessage(chatId, `Welcome back ${user.username}!`)
    } else {
        const { data, error } = await supabase.from("users").upsert({
            chat_id: chatId,
            username
        }).returns();
        if (!error && data) {
            bot.sendMessage(chatId, `Successfully registered`)
            return
        }
        bot.sendMessage(chatId, `Something went wrong`)
    }
}

export { handleMessage }
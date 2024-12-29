import TelegramBot, { Message } from "node-telegram-bot-api";
import { supabase } from "../lib/supabase";
import { generateRequestURL } from "../lib/reclaim";

const handleMessage = async (msg: Message, bot: TelegramBot) => {
    const { chat, text } = msg;

    switch (text) {
        case "/start":
            await startSession(chat.id, bot, msg.from?.username);
            break
        case "/join":
            await joinSession(chat.id, bot, text)
            break
        case "/verify":
            generateRequestURL("stravaWeek", bot, chat.id)
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

const joinSession = async (chatId: number, bot: TelegramBot, text: string) => {
    const { data: userData, error } = await supabase.from("users").select("*").eq("chat_id", chatId);

    if (userData?.length == 0 || Boolean(error)) return bot.sendMessage(chatId, "Unexpected Error Occured")

    const splitText = text.split(" ")
    const TYPES = {
        "10K Steps": "3d8d59b5-d46a-44af-9926-49fb914c433f"
    }

    if (splitText.length == 1) {

        await bot.sendMessage(chatId, `
Available Groups:
${Object.keys(TYPES).map((el, idx) => `${idx + 1} -> ${el}`)}

send \`/join <Group ID> <Max Users>\` to create a group.
            `)
        return
    }
    if (splitText.length == 2) {
        const { data: groupData, error: groupError } = await supabase.from("groups").select("*").eq("id", splitText[1]);

        if (!groupError && groupData.length > 0) {

            const max = groupData[0].max_users;

            if (max == groupData.length) {
                await bot.sendMessage(chatId, "Group is already full");
                return;
            }

            const { data, error } = await supabase.from("groups").insert({
                id: splitText[1],
                condition: splitText[1],
                user: userData?.[0].id
            })

            if (error) {
                bot.sendMessage(chatId, "Unexpected Error Occurred")
                return
            }

        }
    }

    if (splitText.length == 3) {
        const { data: groupData, error: groupError } = await supabase.from("groups").insert({

        });


    }



}

export { handleMessage }
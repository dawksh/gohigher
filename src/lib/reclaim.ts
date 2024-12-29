import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";

config();

export const providerMap: Record<string, string> = {
    stravaWeek: "95312cc7-d3ef-44fe-a4c7-b8de178440f7",
};

export const generateRequestURL = async (provider: string, bot: TelegramBot, chatID: number) => {
    const reclaimProofRequest = await ReclaimProofRequest.init(process.env.RECLAIM_APP_ID as string, process.env.RECLAIM_APP_SECRET as string, providerMap[provider]);

    const requestURL = await reclaimProofRequest.getRequestUrl();

    await bot.sendMessage(chatID, "Click Link Below to verify Strava Status", {
        reply_markup: {
            inline_keyboard: [[{ text: 'Verify with Strava', url: requestURL }]],
        },
    })

    reclaimProofRequest.startSession({
        onSuccess: (proof) => {
            console.log(proof)
        },
        onError: (error) => {
            console.log(error)
        }
    })

}


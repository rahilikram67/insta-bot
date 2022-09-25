
import { Message } from "discord.js"




export function messageSendError(message: Message) {
    message.channel.send("Error occured at server side\nContact Dev!").catch(err => { })
}
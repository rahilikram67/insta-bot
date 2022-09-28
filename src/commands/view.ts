import { EmbedBuilder, Message } from "discord.js"
import { messageSendError } from "../utils/errors"
import { reply } from "../utils/func"
import { RestProps } from "../utils/UserTypes"


export async function view(message: Message, config: Config) {
    const { usernames } = config

    let sended = false
    if (config.usernames && config.usernames.length) {
        sended = true
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("#777777")
                    .setAuthor({ name: "Urls", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                    .setTitle('Insta Bot Config')
                    .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                    .setTimestamp()
                    .setDescription(`${usernames.length ? usernames.join("\n\n") : "\u200b"}`)
                    .addFields({ name: "Instagram Logged In", value: (config as any).login ? "Yes" : "No" })
            ]
        }).catch(err => messageSendError(message))
    }
    // channels mapping

    if (config.channelMap.length) {
        sended = true
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor("#777777")
                    .setAuthor({ name: "Notification Location", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                    .setTitle('Insta Bot Config')
                    .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                    .setTimestamp()
                    .setDescription(`
                  ${config.channelMap.join("\n")}
                `)
            ]
        }).catch(err => messageSendError(message))
    }

    if (!sended) reply(message, "No entries")

}


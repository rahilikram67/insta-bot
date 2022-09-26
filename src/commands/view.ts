import { EmbedBuilder, Message } from "discord.js"
import { messageSendError } from "../utils/errors"


export async function view(message: Message, config: Config) {
    const { urls } = config
    
    
    config.urls && config.urls.length && message.channel.send({
        embeds: [
            new EmbedBuilder()
                .setColor("#777777")
                .setAuthor({ name: "Urls", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                .setTitle('Insta Bot Config')
                .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                .setTimestamp()
                .setDescription(`${urls.length ? urls.join("\n\n") : "\u200b"}`)
        ]
    }).catch(err => messageSendError(message))
    // channels mapping

    config.channelMap.length && message.channel.send({
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

import { EmbedBuilder, Message } from "discord.js";
import { isEmpty, omit } from "lodash";
import { messageSendError } from "../utils/errors";
import { reply } from "../utils/func";

export async function status(message: Message, config: Config) {
    if (isEmpty(config.previous)) return reply(message, "No entries")
    const embeds: EmbedBuilder[] = []
    for (const v of Object.entries(config.previous)) {
        const [url, item] = v
        if (!item) continue
        const { caption, link, name, pic, time } = item
        embeds.push(
            new EmbedBuilder()
                .setColor(0x777777)
                .setTitle(name)
                .setImage(pic)
                .setDescription(caption+"\n"+link)
                .setURL(url)
                .setTimestamp(time)
        )
    }

    message.channel.send({
        embeds
    }).catch(err => messageSendError(message))
}
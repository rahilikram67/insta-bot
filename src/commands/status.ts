import { Embed, EmbedBuilder, Message } from "discord.js";
import { isEmpty, omit } from "lodash";
import { messageSendError } from "../utils/errors";
import { reply } from "../utils/func";

export async function status(message: Message, config: Config) {
    if (isEmpty(config.previous)) return reply(message, "No entries")
    const embeds: EmbedBuilder[] = []
    for (const v of Object.entries(config.previous)) {
        const [url, item] = v
        if (!item) continue
        const { caption, postlink, name, postpic, time, profileimg } = item
        embeds.push(
            new EmbedBuilder()
                .setColor("#777777")
                .setAuthor({ name, iconURL: profileimg })
                .setTitle("User Profile")
                .setImage(postpic)
                .setDescription(`***Caption***:\n${caption}\n***[PostLink](${postlink})***`)
                .setURL(url)
                .setTimestamp(time)
        )
    }

    message.channel.send({
        embeds
    }).catch(err => messageSendError(message))
}
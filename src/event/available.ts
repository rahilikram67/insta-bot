import { DMChannel, EmbedBuilder } from "discord.js";
import { RestProps } from "../utils/UserTypes";

import { grab } from "./grab";
export async function available(config: Config & RestProps) {
    if (config.lock || !config.usernames.length || !config.channelMap.length) {
        return
    }
    config.lock = true
    // start process
    const embeds: EmbedBuilder[] = []
    
    for (const user of config.usernames) {
        config.searches.next = user
        let post = await grab(config)
        if (post && (!config.previous[user] || config.previous[user].caption.localeCompare(post.caption))) embeds.push(
            new EmbedBuilder()
                .setColor("#777777")
                .setAuthor({ name: post.name })
                .setThumbnail(post.profileimg)
                .setTitle("User Profile")
                .setImage(post.postpic)
                .setDescription(`***Caption***:\n${post.caption}\n***[PostLink](${post.postlink})***`)
                .setURL(`https://www.instagram.com/${user}/`)
                .setTimestamp(post.time)
        )
        if (post) post.time = Date.now()
        config.previous[user] = post as any
    }
    for (const v of config.channelMap) {
        let channel: DMChannel = config.client.channels.cache.get(v) as any
        if (channel) channel.send({ embeds }).catch(() => { })
    }
    config.lock = false
}


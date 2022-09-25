import { Client, DMChannel, EmbedBuilder } from "discord.js";


import play from "playwright"
import { grab } from "./grab";
export async function available(config: Config & { client: Client, page: play.Page }) {
    if (config.lock || !config.urls.length || !config.channelMap.length) return
    config.lock = true
    //api call with no concurrency amd message sending concurrency
    const embeds: EmbedBuilder[] = []
    for (const url of config.urls) {
        let post = await grab(config.page, url)
        if (post && !config.previous[url]) embeds.push(
            new EmbedBuilder()
                .setColor(0x777777)
                .setTitle(post.name)
                .setImage(post.pic)
                .setDescription(post.caption + "\n" + post.link)
                .setURL(url)
                .setTimestamp(post.time)
        )
        if (post) post.time = Date.now()
        config.previous[url] = post as any
    }
    for (const v of config.channelMap) {
        let channel: DMChannel = config.client.channels.cache.get(v) as any
        if (channel) channel.send({ embeds }).catch(() => { })
    }

    config.lock = false
}


import { Message } from "discord.js";
import { union } from "lodash";
import { reply } from "../utils/func";
import { db } from "../utils/stormDb";

export function include(message: Message, config: Config) {

    const matches = message.content.split(/\s+/g)

    matches.shift()
    const arr_len = matches.length
    if (!arr_len) return reply(message, "Commands are incorrect")
    let temp = ""
    for (const value of matches) {
        if (!value) continue
        if (!value || !/^\d+$/g.test(value)) return reply(message, "Error please type !info to see how to type command")
        config.channelMap = union(config.channelMap, [value])
        temp += `${value}\n`
    }
    db.set(`setting.channelMap`, config.channelMap).save()
    reply(message, temp)
}
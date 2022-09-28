import { Message } from "discord.js"
import { union, uniq } from "lodash"
import { reply } from "../utils/func"
import { db } from "../utils/stormDb"

export async function add(message: Message, config: Config) {
    const matches = message.content.split(/\s+/g)
    matches.shift()
    const arr_len = matches.length
    if (arr_len && arr_len > 1) return reply(message, "Commands are incorrect")
    config.usernames = union(config.usernames,[matches[0]])
    db.set("setting.usernames", config.usernames as any).save()
    reply(message, `Username ${matches[0]} has been added`)
}





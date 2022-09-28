import { Client } from "discord.js";



export const defaults: Config & { client?: Client } = {
    usernames: [],
    lock: false,
    previous: {},
    channelMap: [],
}
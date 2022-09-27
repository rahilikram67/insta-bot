import { Client } from "discord.js";



export const defaults: Config & { client?: Client,login:boolean } = {
    urls: [],
    lock: false,
    login: true,
    previous: {},
    channelMap: [],
}
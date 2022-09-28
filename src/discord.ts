import { Client, GatewayIntentBits, Message } from "discord.js"

import { add } from "./commands/add"
import { del } from "./commands/del"
import { view } from "./commands/view"
import { available } from "./event/available"
import { status } from "./commands/status"
import { include } from "./commands/include"


import { clone } from "lodash"
import { reset } from "./commands/reset"
import { info } from "./commands/info"
import { db } from "./utils/stormDb"
import { defaults } from "./utils/defaults"
import { chromium } from 'playwright-extra';

import stealth from "puppeteer-extra-plugin-stealth"
import { CronJob } from "cron"
import { logger } from "./utils/login"
import { RestProps } from "./utils/UserTypes"

export const discordServer = async () => {
    const config: Config & RestProps = clone(db.value()?.setting || defaults) as any
    if (!db.value()?.setting?.usernames) db.set("setting", defaults).save()
    config.client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    })
    config.searches = { pre: "", next: "" }
    const cmds: { [key: string]: (message: Message, config: Config) => void } = {
        "add": add,
        "del": del,
        "view": view,
        "status": status,
        "include": include,
        "reset": reset,
        "info": info
    }
    try {
        chromium.use(stealth())
        const browser = await chromium.launch()
        config.page = await browser.newPage()
        config.page.route("**/*", (route) => {
            const request = route.request()
            if (request.url().includes("/login")) { }
            route.continue()
        })

    } catch (error) {
        return console.error(error)
    }

    let login = false

    config.client.on("messageCreate", async (message) => {
        if (!message.member?.permissions.has("Administrator")) return
        const cmd = message.content.split(" ")[0].slice(1)
        if (!cmds[cmd]) { }
        else cmds[cmd](message, config)
    })



    config.client.on("ready", (client) => {
        console.log("Bot is ready!")
        var cron = new CronJob("*/3 * * * * *", async () => {
            cron.stop()
            if (login) await available(config)
            else login = await logger(config) == true
            if (!config.lock) db.set("setting.previous", config.previous).save()
            cron.start()
        })
        cron.start()
    })
    config.client.login(process.env.TOKEN)
    return config
}






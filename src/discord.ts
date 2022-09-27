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
import play from "playwright"
import stealth from "puppeteer-extra-plugin-stealth"
import { CronJob } from "cron"
import { logger } from "./utils/login"
import { RestProps } from "./utils/UserTypes"

export const discordServer = async () => {
    const config: Config & RestProps = clone(db.value()?.setting || defaults) as any
    if (!db.value()?.setting?.urls) db.set("setting", defaults).save()
    config.client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    })
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
        const browser = await chromium.launchPersistentContext("./login")
        config.page = await browser.newPage()
        config.page.route("**/*", (route) => {
            const request = route.request()
            if (request.isNavigationRequest() && request.url().includes("/login")) config.login = false
            route.continue()
        })
    } catch (error) {
        return console.error(error)
    }


    config.client.on("messageCreate", async (message) => {
        if (!message.member?.permissions.has("Administrator")) return
        const cmd = message.content.split(" ")[0].slice(1)
        if (!cmds[cmd]) { }
        else cmds[cmd](message, config)
    })



    config.client.on("ready", (client) => {
        console.log("Bot is ready!")
        new CronJob("*/5 * * * * *", () => {
            available(config)
            logger(config)
            if (!config.lock) db.set("setting.previous", config.previous).save()
        }).start()
    })
    config.client.login(process.env.TOKEN)
    return config
}






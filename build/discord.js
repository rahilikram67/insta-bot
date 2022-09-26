"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordServer = void 0;
const discord_js_1 = require("discord.js");
const add_1 = require("./commands/add");
const del_1 = require("./commands/del");
const view_1 = require("./commands/view");
const available_1 = require("./event/available");
const status_1 = require("./commands/status");
const include_1 = require("./commands/include");
const lodash_1 = require("lodash");
const reset_1 = require("./commands/reset");
const info_1 = require("./commands/info");
const stormDb_1 = require("./utils/stormDb");
const defaults_1 = require("./utils/defaults");
const playwright_1 = __importDefault(require("playwright"));
const cron_1 = require("cron");
const discordServer = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const config = (0, lodash_1.clone)(((_a = stormDb_1.db.value()) === null || _a === void 0 ? void 0 : _a.setting) || defaults_1.defaults);
    if (!((_c = (_b = stormDb_1.db.value()) === null || _b === void 0 ? void 0 : _b.setting) === null || _c === void 0 ? void 0 : _c.urls))
        stormDb_1.db.set("setting", defaults_1.defaults).save();
    config.client = new discord_js_1.Client({
        intents: [
            discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.MessageContent
        ],
    });
    const cmds = {
        "add": add_1.add,
        "del": del_1.del,
        "view": view_1.view,
        "status": status_1.status,
        "include": include_1.include,
        "reset": reset_1.reset,
        "info": info_1.info
    };
    try {
        const browser = yield playwright_1.default.firefox.launch();
        const context = yield browser.newContext({
            bypassCSP: true,
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0"
        });
        config.page = yield context.newPage();
    }
    catch (error) {
        return console.error(error);
    }
    config.client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.permissions.has("Administrator")))
            return;
        const cmd = message.content.split(" ")[0].slice(1);
        if (!cmds[cmd]) { }
        else
            cmds[cmd](message, config);
    }));
    config.client.on("ready", (client) => {
        console.log("Bot is ready!");
        new cron_1.CronJob("*/5 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, available_1.available)(config);
            if (!config.lock)
                stormDb_1.db.set("setting.previous", config.previous).save();
        })).start();
    });
    config.client.login(process.env.TOKEN);
    return config;
});
exports.discordServer = discordServer;

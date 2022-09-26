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
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
const discord_js_1 = require("discord.js");
const lodash_1 = require("lodash");
const errors_1 = require("../utils/errors");
const func_1 = require("../utils/func");
function status(message, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, lodash_1.isEmpty)(config.previous))
            return (0, func_1.reply)(message, "No entries");
        const embeds = [];
        for (const v of Object.entries(config.previous)) {
            const [url, item] = v;
            if (!item)
                continue;
            const { caption, postlink, name, postpic, time, profileimg } = item;
            embeds.push(new discord_js_1.EmbedBuilder()
                .setColor("#777777")
                .setAuthor({ name, iconURL: profileimg })
                .setTitle("User Profile")
                .setImage(postpic)
                .setDescription(`***Caption***:\n${caption}\n***[PostLink](${postlink})***`)
                .setURL(url)
                .setTimestamp(time));
        }
        message.channel.send({
            embeds
        }).catch(err => (0, errors_1.messageSendError)(message));
    });
}
exports.status = status;

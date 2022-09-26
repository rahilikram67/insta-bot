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
exports.view = void 0;
const discord_js_1 = require("discord.js");
const errors_1 = require("../utils/errors");
function view(message, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { urls } = config;
        config.urls && config.urls.length && message.channel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor("#777777")
                    .setAuthor({ name: "Urls", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                    .setTitle('Insta Bot Config')
                    .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                    .setTimestamp()
                    .setDescription(`${urls.length ? urls.join("\n\n") : "\u200b"}`)
            ]
        }).catch(err => (0, errors_1.messageSendError)(message));
        // channels mapping
        config.channelMap.length && message.channel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor("#777777")
                    .setAuthor({ name: "Notification Location", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                    .setTitle('Insta Bot Config')
                    .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                    .setTimestamp()
                    .setDescription(`
                  ${config.channelMap.join("\n")}
                `)
            ]
        }).catch(err => (0, errors_1.messageSendError)(message));
    });
}
exports.view = view;

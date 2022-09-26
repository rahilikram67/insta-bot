"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = void 0;
const discord_js_1 = require("discord.js");
const errors_1 = require("../utils/errors");
function info(message, config) {
    message.channel.send({
        embeds: [
            new discord_js_1.EmbedBuilder()
                .setColor("#777777")
                .setTitle("Available Commands")
                .setAuthor({ name: "Monitor" })
                .addFields([
                { name: "Add Url", value: "```!add [url]```" },
                { name: "Remove Url", value: "```!del [url]```" },
                { name: "See Configuration", value: "```!view```" },
                { name: "Status of most recent url calls", value: "```!status```" },
                { name: "Set channel to store monitor ", value: "```!include channelID (can be repeated by space)```" },
                { name: "Reset Configuration", value: "```!reset```" },
                { name: "Information about Commands", value: "```!info```" }
            ])
        ]
    }).catch(err => (0, errors_1.messageSendError)(message));
}
exports.info = info;

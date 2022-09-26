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
exports.available = void 0;
const discord_js_1 = require("discord.js");
const grab_1 = require("./grab");
function available(config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (config.lock || !config.urls.length || !config.channelMap.length)
            return;
        config.lock = true;
        //api call with no concurrency amd message sending concurrency
        const embeds = [];
        for (const url of config.urls) {
            let post = yield (0, grab_1.grab)(config.page, url);
            if (post && (!config.previous[url] || config.previous[url].caption != post.caption))
                embeds.push(new discord_js_1.EmbedBuilder()
                    .setColor("#777777")
                    .setAuthor({ name: post.name })
                    .setThumbnail(post.profileimg)
                    .setTitle("User Profile")
                    .setImage(post.postpic)
                    .setDescription(`***Caption***:\n${post.caption}\n***[PostLink](${post.postlink})***`)
                    .setURL(url)
                    .setTimestamp(post.time));
            if (post)
                post.time = Date.now();
            config.previous[url] = post;
        }
        for (const v of config.channelMap) {
            let channel = config.client.channels.cache.get(v);
            if (channel)
                channel.send({ embeds }).catch(() => { });
        }
        config.lock = false;
    });
}
exports.available = available;

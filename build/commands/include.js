"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.include = void 0;
const lodash_1 = require("lodash");
const func_1 = require("../utils/func");
const stormDb_1 = require("../utils/stormDb");
function include(message, config) {
    const matches = message.content.split(/\s+/g);
    matches.shift();
    const arr_len = matches.length;
    if (!arr_len)
        return (0, func_1.reply)(message, "Commands are incorrect");
    let temp = "";
    for (const value of matches) {
        if (!value)
            continue;
        if (!value || !/^\d+$/g.test(value))
            return (0, func_1.reply)(message, "Error please type !info to see how to type command");
        config.channelMap = (0, lodash_1.union)(config.channelMap, [value]);
        temp += `${value}\n`;
    }
    stormDb_1.db.set(`setting.channelMap`, config.channelMap).save();
    (0, func_1.reply)(message, temp);
}
exports.include = include;

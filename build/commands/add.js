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
exports.add = void 0;
const lodash_1 = require("lodash");
const func_1 = require("../utils/func");
const stormDb_1 = require("../utils/stormDb");
function add(message, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const matches = message.content.split(/\s+/g);
        matches.shift();
        const arr_len = matches.length;
        if (arr_len && arr_len > 1)
            return (0, func_1.reply)(message, "Commands are incorrect");
        config.urls = (0, lodash_1.union)(config.urls, [matches[0]]);
        stormDb_1.db.set("setting.urls", config.urls).save();
        (0, func_1.reply)(message, `url ${matches[0]} has been added`);
    });
}
exports.add = add;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = void 0;
const defaults_1 = require("../utils/defaults");
const func_1 = require("../utils/func");
const stormDb_1 = require("../utils/stormDb");
function reset(message, config) {
    Object.assign(config, Object.assign(Object.assign({}, defaults_1.defaults), { _403: null }));
    stormDb_1.db.set("setting", defaults_1.defaults).save();
    (0, func_1.reply)(message, "Reset to default values");
}
exports.reset = reset;

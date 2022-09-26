"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reply = void 0;
function reply(message, msg) {
    message.reply({
        content: msg
    }).then(res => setTimeout(() => res.delete(), 2000));
}
exports.reply = reply;

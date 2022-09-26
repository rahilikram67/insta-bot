"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSendError = void 0;
function messageSendError(message) {
    message.channel.send("Error occured at server side\nContact Dev!").catch(err => { });
}
exports.messageSendError = messageSendError;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const stormdb_1 = __importDefault(require("stormdb"));
const engine = new stormdb_1.default.localFileEngine("./db.stormdb");
exports.db = new stormdb_1.default(engine);

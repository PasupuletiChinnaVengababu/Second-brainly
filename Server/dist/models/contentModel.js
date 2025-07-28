"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.linkModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const contentSchema = new Schema({
    link: { type: String, required: true },
    title: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
});
const sharbleSchema = new Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
});
exports.linkModel = mongoose_1.default.model("Tag", sharbleSchema);
exports.contentModel = mongoose_1.default.model("Content", contentSchema);

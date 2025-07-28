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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = require("./models/userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_js_1 = require("./middleware/auth.js");
const contentModel_1 = require("./models/contentModel");
const random_1 = require("./random");
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "100Rupees";
mongoose_1.default.connect("mongodb+srv://amchinnavengababu:xebuMHvrUlwlV93Z@cluster0.qotcnag.mongodb.net/brainly");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/Signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.userModel.create({
        email,
        password
    });
    res.json({ user, success: true });
}));
app.post("/Signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.userModel.findOne({
            email,
            password
        });
        //@ts-ignore
        let token;
        if (user) {
            token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        }
        res.json({ user, token });
    }
    catch (error) {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
app.post("/Create", auth_js_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, title } = req.body;
    //@ts-ignore
    const userId = req.userId;
    const content = yield contentModel_1.contentModel.create({
        link,
        title,
        userId,
        tags: []
    });
    res.json({ content, success: true });
}));
app.get("/content", auth_js_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const contents = yield contentModel_1.contentModel.find({ userId }).populate("userId", "email");
    res.json(contents);
}));
app.get("/content/youtube", auth_js_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const title = "youtube";
    const contents = yield contentModel_1.contentModel.find({ title }).populate("userId", "email");
    res.json(contents);
}));
app.delete("/content/:id", auth_js_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.params.id;
    //@ts-ignore
    const userId = req.userId;
    const contents = yield contentModel_1.contentModel.deleteMany({ userId, _id: id });
    res.json(contents);
}));
app.post("/share", auth_js_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const { share } = req.body;
    if (share) {
        const hash = (0, random_1.Random)(1000);
        const link = yield contentModel_1.linkModel.create({
            hash,
            userId
        });
        res.json({ hash });
    }
    else {
        yield contentModel_1.linkModel.deleteOne({ userId });
        res.json({ message: "no link sharable" });
    }
}));
app.get("/share/:hash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.hash;
    const link = yield contentModel_1.linkModel.findOne({ hash });
    if (link) {
        const user = yield userModel_1.userModel.find({ _id: link.userId });
        const content = yield contentModel_1.contentModel.find({ userId: link.userId });
        res.json({ user, content });
    }
    res.json({ message: "no user with links" });
}));
// app.post("/api/v1/brain/share", Auth, async (req, res) => {
//     const { share } = req.body;
//     if (share) {
//         // Check if a link already exists for the user.
//         //@ts-ignore
//         const existingLink = await linkModel.findOne({ userId: req.userId });
//         if (existingLink) {
//             res.json({ hash: existingLink.hash }); // Send existing hash if found.
//             return;
//         }
//         // Generate a new hash for the shareable link.
//         const hash = Random(10);
//         //@ts-ignore
//         await linkModel.create({ userId: req.userId, hash });
//         res.json({ hash }); // Send new hash in the response.
//     } else {
//         // Remove the shareable link if share is false.
//         //@ts-ignore
//         await linkModel.deleteOne({ userId: req.userId });
//         res.json({ message: "Removed link" }); // Send success response.
//     }
// });
// // Route 7: Get Shared Content
// app.get("/api/v1/brain/:shareLink", async (req, res) => {
//     const hash = req.params.shareLink;
//     // Find the link using the provided hash.
//     const link = await linkModel.findOne({ hash });
//     if (!link) {
//         res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
//         return;
//     }
//     // Fetch content and user details for the shareable link.
//     const content = await contentModel.find({ userId: link.userId });
//     const user = await userModel.findOne({ _id: link.userId });
//     if (!user) {
//         res.status(404).json({ message: "User not found" }); // Handle missing user case.
//         return;
//     }
//     res.json({
//         username: user.email,
//         content
//     }); // Send user and content details in response.
// });
app.listen(3000);

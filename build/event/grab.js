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
exports.grab = void 0;
const lodash_1 = require("lodash");
function grab(page, url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!page)
            return;
        yield new Promise(resolve => setTimeout(resolve, (0, lodash_1.random)(1, 5) * 1000));
        page.on("request", (r) => redirectHandler(r, page));
        try {
            yield page.goto(url);
            yield page.locator("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img").first().waitFor({ state: "attached", timeout: 15000 });
            yield page.locator("span._aacl").first().waitFor({ state: "attached", timeout: 15000 });
            yield page.locator("article > div > div > div > div:nth-child(1) > a").first().waitFor({ state: "attached", timeout: 15000 });
            yield page.locator("span > img").first().waitFor({ state: "attached", timeout: 15000 });
            const ref = yield page.$$("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img");
            const post_tag = yield page.$$("article > div > div > div > div:nth-child(1) > a");
            const profile_img = yield page.$$("span > img");
            const _name = yield page.$$("span._aacl");
            const name = yield _name[0].textContent();
            const src = yield ref[0].getAttribute("src");
            const alt = yield ref[0].getAttribute("alt");
            page.off("request", (r) => redirectHandler(r, page));
            return {
                caption: alt || "",
                name: name || "",
                postlink: "https://www.instagram.com" + (yield post_tag[0].getAttribute("href")),
                postpic: src || "",
                time: Date.now(),
                profileimg: (yield profile_img[0].getAttribute("src")) || ""
            };
        }
        catch (error) {
            console.log(yield page.content());
            console.log(error);
            page.off("request", (r) => redirectHandler(r, page));
        }
    });
}
exports.grab = grab;
function redirectHandler(request, page) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.isNavigationRequest() && request.url().includes("login/?next")) {
            console.log("login/?next");
            yield page.evaluate("window.stop()");
        }
    });
}

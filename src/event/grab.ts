import { random, sample } from "lodash"
import play from "playwright"
import fs from "fs"
export async function grab(page: play.Page, url: string): Promise<Post | undefined> {
    if (!page) return
    await new Promise(resolve => setTimeout(resolve, random(1, 5) * 1000))
    //page.on("request", (r) => redirectHandler(r, page))
    
    try {
        await page.goto(url)
        await page.locator("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img").first().waitFor({ state: "attached", timeout: 0 })
        await page.locator("span._aacl").first().waitFor({ state: "attached", timeout: 0 })
        await page.locator("article > div > div > div > div:nth-child(1) > a").first().waitFor({ state: "attached", timeout: 0 })
        await page.locator("span > img").first().waitFor({ state: "attached", timeout: 0 })
        const ref = await page.$$("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img")
        const post_tag = await page.$$("article > div > div > div > div:nth-child(1) > a")
        const profile_img = await page.$$("span > img")
        const _name = await page.$$("span._aacl")
        const name = await _name[0].textContent()
        const src = await ref[0].getAttribute("src")
        const alt = await ref[0].getAttribute("alt")
        //page.off("request", (r) => redirectHandler(r, page))
        return {
            caption: alt || "",
            name: name || "",
            postlink: "https://www.instagram.com" + (await post_tag[0].getAttribute("href")),
            postpic: src || "",
            time: Date.now(),
            profileimg: await profile_img[0].getAttribute("src") || ""
        }
    } catch (error) {
        console.log(error)
       // page.off("request", (r) => redirectHandler(r, page))
    }
}


async function redirectHandler(request: play.Request, page: play.Page) {
    if (request.isNavigationRequest() && request.url().includes("login/?next")) {
        console.log("login/?next")
        await page.evaluate("window.stop()")
    }
}


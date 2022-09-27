import { random } from "lodash"
import play from "playwright"
import UserAgent from "user-agents"
const userAgent = new UserAgent({ deviceCategory: "desktop" });
export async function grab(browser: play.Browser, url: string): Promise<Post | undefined> {
    if (!browser) return
    const page = await (await browser.newContext({ userAgent: userAgent.random().toString() })).newPage()
    await new Promise(resolve => setTimeout(resolve, random(1, 5) * 1000))
    page.on("request", (r) => redirectHandler(r, page))
    try {
        await page.goto(url)
        await page.locator("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img").first().waitFor({ state: "attached", timeout: 15000 })
        await page.locator("span._aacl").first().waitFor({ state: "attached", timeout: 15000 })
        await page.locator("article > div > div > div > div:nth-child(1) > a").first().waitFor({ state: "attached", timeout: 15000 })
        await page.locator("span > img").first().waitFor({ state: "attached", timeout: 15000 })
        const ref = await page.$$("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img")
        const post_tag = await page.$$("article > div > div > div > div:nth-child(1) > a")
        const profile_img = await page.$$("span > img")
        const _name = await page.$$("span._aacl")
        const name = await _name[0].textContent()
        const src = await ref[0].getAttribute("src")
        const alt = await ref[0].getAttribute("alt")
        page.off("request", (r) => redirectHandler(r, page))
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
        page.off("request", (r) => redirectHandler(r, page))
    }
}


async function redirectHandler(request: play.Request, page: play.Page) {
    if (request.isNavigationRequest() && request.url().includes("login/?next")) {
        await page.evaluate("window.stop()")
    }
}


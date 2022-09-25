import { random } from "lodash"
import play from "playwright"


export async function grab(page: play.Page, url: string): Promise<Post | undefined> {
    if (!page) return
    await new Promise(resolve => setTimeout(resolve, random(1, 6) * 1000))
    try {
        await page.goto(url)
        await page.locator("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img").first().waitFor({ state: "visible", timeout: 0 })
        await page.locator("span._aacl").first().waitFor({ state: "visible", timeout: 0 })
        const ref = await page.$$("article > div > div > div > div:nth-child(1) > a > div > div._aagv > img")
        const _name = await page.$$("span._aacl")
        const name = await _name[0].textContent()
        const src = await ref[0].getAttribute("src")
        const alt = await ref[0].getAttribute("alt")
        return { caption: alt || "", name: name || "", link: url, pic: src || "", time: Date.now() }
    } catch (error) { console.log(error) }
}


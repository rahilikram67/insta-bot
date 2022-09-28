import { random } from "lodash"
import play from "playwright"
import { RestProps } from "../utils/UserTypes";


export async function grab(config: Config & RestProps): Promise<Post | undefined> {
    const { page, searches } = config
    await new Promise(resolve => setTimeout(resolve, random(1, 5) * 1000))
    console.log("grabbing ", searches)
    try {
        if (!searches.pre) await page.locator('text="Search"').click({ timeout: 500 });
        else await page.locator(`div[role="button"]:has-text("${searches.pre}")`).click();
        await page.locator('[placeholder="Search"]').type(searches.next, { delay: random(50, 70, false) });
        searches.pre = searches.next
        await page.locator(`._abm4 > .qi72231t > div:has-text("${searches.next}")`).first().click();

        // scarping
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
    }
}



import play from "playwright"
import { RestProps } from "./UserTypes"

export async function logger(config: Config & RestProps) {
    if (config.lock || config.login) return false
    config.lock = true
    const { page } = config
    try {
        await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: "networkidle" })
        await page.locator('[name=username]').click();
        await page.locator('[name=username]').fill(process.env.LOGIN || "",);
        await page.locator('[aria-label="Password"]').click();
        await page.locator('[aria-label="Password"]').fill(process.env.PASSWORD || "");
        await page.locator('button:has-text("Log In")').first().click();
        await page.waitForNavigation({ waitUntil: "networkidle" })
        config.login = true
    } catch (error) {
        config.login = false
        console.error(error)
    }
    config.lock = false
}
import { RestProps } from "./UserTypes"

export async function logger(config: Config & RestProps) {
    if (config.lock || config.login) return false
    config.lock = true
    const { page } = config
    try {
        await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: "networkidle" })
        await page.locator('[name=username]').click();
        await page.locator('[name=username]').type(process.env.LOGIN || "", { delay: 60 });
        await page.locator('[aria-label="Password"]').click();
        await page.locator('[aria-label="Password"]').type(process.env.PASSWORD || "", { delay: 60 });
        await page.locator('button:has-text("Log In")').first().click();
        await page.waitForNavigation({ waitUntil: "networkidle" })
        config.login = true
    } catch (error) {
        config.login = false
        console.error(error)
    }
    config.lock = false
}
import { RestProps } from "./UserTypes"

export async function logger(config: Config & RestProps) {
    if (config.lock) return
    config.lock = true
    const { page } = config
    let login = false
    try {
        await page.goto("https://www.instagram.com/")
        await page.locator('[name=username]').click();
        await page.locator('[name=username]').type(process.env.LOGIN || "", { delay: 60 });
        await page.locator('[name=password]').click();
        await page.locator('[name=password]').type(process.env.PASSWORD || "", { delay: 60 });
        await page.locator('button:has-text("Log In")').first().click();
        await page.waitForNavigation()
        console.log("logged")
        login = true
    } catch (error) {
        console.error(error)
    }
    config.lock = false
    return login
}
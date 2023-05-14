import { env } from 'node:process'
import puppeteer, { Protocol } from 'puppeteer'
import logger from '../utils/logger'

async function getAuthenticationCookie(): Promise<string | null> {
  const browser = await puppeteer.launch()
  let sessionCookie: Protocol.Network.CookieParam | undefined = undefined
  try {
    const page = await browser.newPage()

    const EMAIL = env.EMAIL as string
    const CUMPLO_LOGIN_URL = env.CUMPLO_LOGIN_URL as string
    await page.goto(`${CUMPLO_LOGIN_URL}${EMAIL}`)

    const emailSelector = '#user_email'
    logger.info('Waiting for email selector...')
    await page.waitForSelector(emailSelector)
    await page.type(emailSelector, EMAIL)

    const passwordSelector = '#user_password'
    logger.info('Waiting for password selector...')
    await page.waitForSelector(passwordSelector)
    const PASSWORD = env.PASSWORD as string
    await page.type(passwordSelector, PASSWORD)

    const buttonSelector = '.btn-validation'
    logger.info('Waiting for button selector...')
    await page.waitForSelector(buttonSelector)
    await page.click(buttonSelector)

    const COOKIE_SETTER_URL = env.COOKIE_SETTER_URL as string
    logger.info('Waiting for cookie response...')
    await page.waitForResponse(COOKIE_SETTER_URL)

    const cookies = await page.cookies()
    const SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME as string
    sessionCookie = cookies.find((cookie) => cookie.name === SESSION_COOKIE_NAME)
  } catch (error) {
    console.error(`Got an error while getting the authentication cookie: ${error}`)
  } finally {
    await browser.close()
  }
  return sessionCookie ? sessionCookie.value : null
}

export default getAuthenticationCookie

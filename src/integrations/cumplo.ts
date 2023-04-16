import { env } from 'node:process'
import puppeteer from 'puppeteer'

async function getAuthenticationCookie(): Promise<string | null> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const EMAIL = env.EMAIL as string
  const CUMPLO_LOGIN_URL = env.CUMPLO_LOGIN_URL as string
  await page.goto(`${CUMPLO_LOGIN_URL}${EMAIL}`)

  await page.setViewport({ width: 1080, height: 1024 })

  const emailSelector = '#user_email'
  await page.waitForSelector(emailSelector)
  await page.type(emailSelector, EMAIL)

  const passwordSelector = '#user_password'
  await page.waitForSelector(passwordSelector)
  const PASSWORD = env.PASSWORD as string
  await page.type(passwordSelector, PASSWORD)

  const buttonSelector = '.btn-validation'
  await page.waitForSelector(buttonSelector)
  await page.click(buttonSelector)

  const COOKIE_SETTER_URL = env.COOKIE_SETTER_URL as string
  await page.waitForResponse(COOKIE_SETTER_URL)

  const cookies = await page.cookies()
  const SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME as string
  const sessionCookie = cookies.find((cookie) => cookie.name === SESSION_COOKIE_NAME)

  await browser.close()
  return sessionCookie ? sessionCookie.value : null
}

export default getAuthenticationCookie

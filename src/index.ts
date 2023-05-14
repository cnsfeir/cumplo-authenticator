require('dotenv').config()
import { HttpFunction, Request, Response } from '@google-cloud/functions-framework'
import { env } from 'node:process'
import getAuthenticationCookie from './integrations/cumplo'

export const getCumploAuthenticationCookie: HttpFunction = async (
  request: Request,
  response: Response
) => {
  const cookie = await getAuthenticationCookie()
  if (!cookie) {
    response.status(500).send('Could not get cookie')
  } else {
    response.status(200).json({ cookie })
  }
}

if (env.ENVIRONMENT === 'DEVELOPMENT') {
  const testLocally = async () => {
    console.log('Executing getAuthenticationCookie() locally')
    const cookie = await getAuthenticationCookie()
    if (!cookie) {
      console.log('Could not get the authentication cookie')
    } else {
      console.log(`Cookie : ${cookie}`)
    }
  }
  testLocally()
}

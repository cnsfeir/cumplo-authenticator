import { HttpFunction, Request, Response } from '@google-cloud/functions-framework'
import getAuthenticationCookie from './integrations/cumplo'

export const getAuthorizationCookie: HttpFunction = (request: Request, response: Response) => {
  const cookie = getAuthenticationCookie()
  if (!cookie) {
    response.status(500).send('Could not get cookie')
    return
  }
  response.status(200).json({ cookie })
}

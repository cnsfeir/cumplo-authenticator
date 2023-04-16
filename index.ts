import { Request, Response, http } from '@google-cloud/functions-framework'
import getAuthorizationCookie from './src/integrations/cumplo'

http('TypescriptFunction', (request: Request, response: Response) => {
  const cookie = getAuthorizationCookie()
  if (!cookie) {
    response.status(500).send('Could not get cookie')
    return
  }
  response.status(200).json({ cookie })
})

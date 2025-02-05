import { env } from '$env/dynamic/private'
import type { HandleFetch } from '@sveltejs/kit'

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  // if (request.url.startsWith(env.BACKEND_URL) || request.url.startsWith("http://" + env.BACKEND_URL) || request.url.startsWith("https://" + env.BACKEND_URL)) {
  //   let access_token = event.cookies.get('session')
  //   if (access_token) {
  //     request.headers.set('Authorization', `Bearer ${access_token}`)
  //     request.headers.set('Content-Type', 'application/json');
  //   }
  // }
  return fetch(request)

}

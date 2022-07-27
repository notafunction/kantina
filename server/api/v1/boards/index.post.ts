export default defineEventHandler((event) => {
  const cookies = useCookies(event)

  return cookies['.user']
})

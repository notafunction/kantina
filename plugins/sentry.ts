import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { name, version } from '@/package.json'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { vueApp } = nuxtApp

  console.log(nuxtApp)
  Sentry.init({
    app: vueApp,
    release: `${name}@${version}`,
    environment: config.environment,
    dsn: config.public.sentry.dsn,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(
          nuxtApp.$router
        ),
        tracingOrigins: ['localhost', 'kantina.app', /^\//],
      }),
    ],
    logErrors: true,
    tracesSampleRate: config.sentry.tracesSampleRate,
    debug: config.sentry.debug,
    beforeSend(event, hint) {
      if (event.exception) {
        console.error(
          `[Exception handled by Sentry]: (${hint.originalException})`,
          { event, hint }
        )
      }

      return event
    },
  })

  return {
    provide: {
      sentrySetContext: (n, context) => Sentry.setContext(n, context),
      sentrySetUser: (user) => Sentry.setUser(user),
      sentrySetTag: (tagName, value) => Sentry.setTag(tagName, value),
      sentryAddBreadcrumb: (breadcrumb) => Sentry.addBreadcrumb(breadcrumb),
    },
  }
})

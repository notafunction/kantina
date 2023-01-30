type IsFunction<T> = T extends (...args: any[]) => any ? T : never
export const isFunction = <T extends {}>(value: T): value is IsFunction<T> =>
  typeof value === 'function'

export const AuthErrorMessage = {
  'auth/user-not-found': 'Email not found',
  'auth/wrong-password':
    'The email or password do not match an existing account',
  'auth/email-already-in-use': 'That email address is already signed up',
  'auth/popup-closed-by-user': ''
}

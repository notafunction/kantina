import { useState } from '#app'

const useUser = () => {
  const user = useState('user', () => null)

  const setUser = (_user) => {
    user.value = _user
  }

  return {
    user,
    setUser,
  }
}

export default useUser

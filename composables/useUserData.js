import { useState } from '#app'

const useUserData = () => {
  const userData = useState('user', () => {})

  const setUserData = (user) => {
    userData.value = user
  }

  return {
    userData,
    setUserData
  }
}

export default useUserData
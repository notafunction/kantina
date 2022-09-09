import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { UserProfileContext } from './UserProfileContext'
import { useDatabase, useUser } from 'reactfire'
import { get, ref } from 'firebase/database'

const UserProfileProvider = (props) => {
  const db = useDatabase()
  const user = useUser()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (user.status === 'success') {
      if (!user.data) {
        return setProfile(null)
      }

      const fetchData = async () => {
        const snap = await get(ref(db, `users/${user.data.uid}`))

        if (snap.exists()) {
          setProfile(snap.val())
        }
      }

      fetchData().catch(console.error)
    }
  }, [user.data])

  return <UserProfileContext.Provider value={profile}>{props.children}</UserProfileContext.Provider>
}

UserProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default UserProfileProvider

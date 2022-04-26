import { useSelector } from 'react-redux'

const userHasPermission = (permission) => {
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const role = useSelector(
    ({
      firebase: {
        data: { roles }
      }
    }) => roles[profile.role]
  )

  console.log(Object.keys(role))

  return Object.keys(role).includes(permission)
}

export default userHasPermission

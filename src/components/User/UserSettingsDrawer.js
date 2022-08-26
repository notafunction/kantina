import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Upload, Form, Input, message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import SettingsDrawer from '../SettingsDrawer'
import styled from 'styled-components'
import { useAuth, useFirebaseApp, useUser } from 'reactfire'

const StyledUpload = styled(Upload)`
  .ant-upload {
    width: 128px;
    height: 128px;
    overflow: hidden;

    img {
      object-fit: cover;
      min-height: 100%;
      min-width: 100%;
    }
  }
`

const getBase64 = (image, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(image)
}

const UserSettingsDrawer = (props) => {
  const { status, data: user } = useUser()
  const firebase = useFirebaseApp()
  const auth = useAuth()
  // const storage = useStorage()

  const [avatarFileList, setAvatarFileList] = useState([])
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const beforeAvatarUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isLt2M) {
      message.error('Image must be smaller than 2MB')
      return false
    }

    setAvatarFileList([...avatarFileList, file])
    getBase64(file, setAvatarPreviewUrl)
    return false
  }

  const uploadAndGetAvatarUrl = async () => {
    try {
      const result = await firebase.uploadFile('userAvatars', avatarFileList[0], null, {
        name: auth.uid
      })
      return result.uploadTaskSnapshot.ref.getDownloadURL()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const onSave = async () => {
    setLoading(true)
    const { avatar: _avatar, ...values } = await form.validateFields()
    try {
      const avatarUrl = await uploadAndGetAvatarUrl()
      await firebase.updateProfile({
        ...values,
        avatarUrl
      })
      message.success('Your settings have been saved')
      props.close()
    } catch (error) {
      console.log(error)
      message.error('There was a problem saving your changes')
    } finally {
      setLoading(false)
    }
  }

  const onClose = () => {
    setAvatarFileList([])
    setAvatarPreviewUrl(null)
    setLoading(false)
    props.close()
  }

  if (status === 'loading') return <Spin />

  console.log(user)

  return (
    <SettingsDrawer
      title="User Settings"
      onOk={onSave}
      visible={props.visible}
      close={onClose}
      destroyOnClose={true}
      okButtonProps={{ loading }}>
      <Form layout="vertical" form={form} onFinish={onSave}>
        <Form.Item name="avatar" label="Avatar">
          <StyledUpload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeAvatarUpload}
            fileList={avatarFileList}
            maxCount={1}>
            {avatarPreviewUrl ? (
              <img src={avatarPreviewUrl} />
            ) : loading ? (
              <LoadingOutlined />
            ) : (
              <img src={user.photoURL} />
            )}
          </StyledUpload>
        </Form.Item>
        <Form.Item
          name="displayName"
          label="Name"
          initialValue={user.displayName}
          rules={[{ required: true, message: 'Your name is required' }]}>
          <Input />
        </Form.Item>
      </Form>
    </SettingsDrawer>
  )
}

UserSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default UserSettingsDrawer

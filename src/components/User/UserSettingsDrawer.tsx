import React from 'react'
import { Upload, Form, Input, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import SettingsDrawer from '../SettingsDrawer'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../store'

export interface UserSettingsDrawerProps {
  close: () => void
  visible: boolean
}

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

const getBase64 = (image: File, callback: (result: any) => any) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(image)
}

const UserSettingsDrawer = (props: UserSettingsDrawerProps) => {
  const [avatarFileList, setAvatarFileList] = React.useState<File[]>([])
  const [avatarPreviewUrl, setAvatarPreviewUrl] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [form] = Form.useForm()
  const firebase = useFirebase()
  const auth = useSelector(({ firebase: { auth } }: RootState) => auth)
  const profile = useSelector(({ firebase: { profile } }: RootState) => profile)

  const beforeAvatarUpload = (file: File) => {
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
      const result = await firebase.uploadFile('userAvatars', avatarFileList[0], undefined, {
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
      console.log(avatarUrl)
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
            // @ts-ignore:next-line
            fileList={avatarFileList}
            maxCount={1}>
            {avatarPreviewUrl ? (
              <img src={avatarPreviewUrl} />
            ) : loading ? (
              <LoadingOutlined />
            ) : (
              <img src={profile.avatarUrl} />
            )}
          </StyledUpload>
        </Form.Item>
        <Form.Item
          name="displayName"
          label="Name"
          initialValue={profile.displayName}
          rules={[{ required: true, message: 'Your name is required' }]}>
          <Input />
        </Form.Item>
      </Form>
    </SettingsDrawer>
  )
}

export default UserSettingsDrawer

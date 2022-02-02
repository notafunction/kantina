import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Form, Input, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import SettingsDrawer from '../SettingsDrawer'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const beforeAvatarUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    message.error('Image must be smaller than 2MB')
  }
}

// const getBase64 = (image, callback) => {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(image)
// }

const UserSettingsDrawer = (props) => {
  const [avatarLoading, setAvatarLoading] = React.useState(false)
  const [form] = Form.useForm()
  const firebase = useFirebase()
  const profile = useSelector(({ firebase: { profile } }) => profile)

  const handleAvatarChange = async (event) => {
    const result = await firebase.uploadFile('userAvatars', event.file.originFileObj)
    console.log(result)
    switch (event.file.status) {
      case 'uploading': {
        setAvatarLoading(true)
        return
      }
      case 'error': {
        message.error('There was a problem uploading your image')
        setAvatarLoading(false)
        return
      }
      case 'done': {
        setAvatarLoading(false)
        return
      }
      default: {
        return
      }
    }
  }

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await firebase.updateProfile(values)
      message.success('Your settings have been saved')
      props.close()
    } catch (error) {
      console.log(error)
      message.error('There was a problem saving your changes')
    }
  }

  return (
    <SettingsDrawer title="User Settings" onOk={onSave} visible={props.visible} close={props.close}>
      <Form layout="vertical" form={form} onFinish={onSave}>
        <Form.Item name="avatar" label="Avatar">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeAvatarUpload}
            onChange={handleAvatarChange}>
            {avatarLoading ? <LoadingOutlined /> : <img src={profile.avatarUrl} />}
          </Upload>
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

UserSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default UserSettingsDrawer

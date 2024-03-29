import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Upload, Form, Input, message, Spin, Image, Modal, Alert, Button } from 'antd'
import styled from 'styled-components'
import { useAuth, useDatabase, useStorage, useUser } from 'reactfire'
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { update, ref as databaseRef } from 'firebase/database'
import { updateProfile, sendEmailVerification, updateEmail, updatePassword } from 'firebase/auth'

const StyledUpload = styled(Upload)`
  .ant-upload {
    width: 64px;
    height: 64px;
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

const UserSettingsModal = (props) => {
  const { status, data: user } = useUser()
  const db = useDatabase()
  const storage = useStorage()
  const auth = useAuth()

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
      const result = await uploadBytes(
        storageRef(storage, `userAvatars/${props.user.uid}`),
        avatarFileList[0]
      )
      return await getDownloadURL(result.ref)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const onSave = async () => {
    const { avatar: _avatar, ...values } = await form.validateFields()
    try {
      const payload = values

      if (avatarFileList.length) {
        payload.photoURL = await uploadAndGetAvatarUrl()
      }

      await Promise.all([
        update(databaseRef(db, `users/${props.user.uid}`), payload),
        updateProfile(props.user, payload)
      ])

      props.close()
    } catch (error) {
      console.log(error)
      message.error(error.message)
    }
  }

  const onClose = () => {
    setAvatarFileList([])
    setAvatarPreviewUrl(null)
    setLoading(false)
    props.close()
  }

  if (status === 'loading') return <Spin />

  return (
    <Modal title="User Settings" onOk={onSave} open={props.visible} onCancel={onClose}>
      {!user.emailVerified ? (
        <Alert
          message="Email Needs Verification"
          description="To gain access to all of Kantina's features, you'll need to verify your email address."
          type="warning"
          showIcon
          closable
          className="mb-4"
          action={
            <Button size="small" type="ghost" onClick={() => sendEmailVerification(user)}>
              Resend
            </Button>
          }
        />
      ) : null}
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
            ) : (
              <Image
                preview={false}
                src={props.user.photoURL}
                shape="square"
                style={{ width: '100%', height: '100%' }}
              />
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

        <Form.Item
          name="emailAddress"
          label="Email Address"
          initialValue={user.email}
          rules={[{ required: true, message: 'Your email address is required' }]}>
          <Input readOnly />
        </Form.Item>
      </Form>
    </Modal>
  )
}

UserSettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default UserSettingsModal

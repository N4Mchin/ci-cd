import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

@withI18n()
class Photo extends PureComponent {
  constructor(props) {
    super(props)
    const imageUrl =
      props.value &&
      `data:${props.value['0'].contentType};base64,${props.value['0'].data}`

    this.state = {
      loading: false,
      imageUrl: imageUrl,
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        const array = imageUrl.split(';', 2)
        const contentType = array[0].split('data:')[1]
        const data = array[1].split('base64,')[1]

        this.setState({
          imageUrl,
          loading: false,
        })

        this.props.onChange([
          {
            contentType,
            data,
          },
        ])
      })
    }
  }

  render() {
    const { i18n } = this.props
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl } = this.state
    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="user" />
          {i18n.t`Photo`}
        </div>

        <div className={styles.cont}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
    )
  }
}

Photo.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
}

export default Photo

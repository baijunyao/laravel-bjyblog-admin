import { Upload, Icon, message } from 'antd';
import React, { Component } from 'react';
import { getToken } from '@/utils/request';

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class UploadOnImage extends Component {
  state = {
    action: '',
    loading: false,
    imageUrl: '',
    fileList: [],
  };

  constructor(props: any) {
    super(props);

    this.state = {
      action: props.action,
      loading: false,
      imageUrl: props.imageUrl,
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: props.defaultUrl,
        },
      ],
    };
  }

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {

      this.setState({
        imageUrl: info.file.response.url,
        loading: false,
      })
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, fileList } = this.state;

    return (
      <Upload
        name="cover"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.state.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={{
          Authorization: getToken(),
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

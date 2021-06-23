import { Upload, Icon, message } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { getToken } from '@/utils/request';

interface UploadImagePropsType extends FormComponentProps {
  value: string | undefined;
  onChange: (selectedCategoryId: number | string) => void;
  apiUrl: string;
}

interface UploadImageStateType {
  loading: boolean;
}

function beforeUpload(file: File) {
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

class UploadImage extends Component<UploadImagePropsType, UploadImageStateType> {
  state = {
    loading: false,
  };

  constructor(props: UploadImagePropsType) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleChange = (info: any) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      })

      this.props.onChange(info.file.response.url);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.props.apiUrl}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={{
          Authorization: getToken(),
        }}
      >
        {this.props.value ? <img src={this.props.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default UploadImage;

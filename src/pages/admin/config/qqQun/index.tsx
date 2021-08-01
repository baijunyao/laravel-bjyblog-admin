import {
  Button,
  Card,
  Form, Input,
  message,
  Upload,
  Icon,
} from 'antd';
import React, { Component } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface'

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConfigStateType } from '../model';

const FormItem = Form.Item;

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminConfig/fetch'
      | 'adminConfig/update'
      >
    >;
  loading: boolean;
  adminConfig: ConfigStateType;
}

interface TableListState {
  loading: boolean;
  imageUrl: string;
}

function getBase64(img:any, callback:any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: UploadFile) {
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

@connect(
  ({
     adminConfig,
     loading,
   }: {
    adminConfig: ConfigStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminConfig,
    loading: loading.models.adminConfig,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    loading: false,
    imageUrl: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminConfig/fetch',
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const {
      adminConfig: { data },
      dispatch,
      form,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(id => {
          if (values[id] !== data.list[id].value) {
            dispatch({
              type: 'adminConfig/update',
              payload: {
                id,
                value: values[id],
              },
            });
          }
        })
      }
    });
  };

  handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );

      const {
        dispatch,
      } = this.props;

      dispatch({
        type: 'adminConfig/update',
        payload: {
          id: 153,
          value: info.file.response.url,
        },
      });
    }
  };

  render() {
    const {
      adminConfig: { data },
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    if (data.list.length === 0) {
      return (
        <PageHeaderWrapper>
        </PageHeaderWrapper>
      )
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl ? this.state.imageUrl : data.list[153].value;
    const authorization:string = localStorage.getItem('token') === undefined ? '' : `Bearer ${localStorage.getItem('token')}`;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}
              label={`${formatMessage({ id: 'Article' })} ID`}
            >
              {getFieldDecorator('150', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[150].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'QQ group number' })}
            >
              {getFieldDecorator('151', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[151].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'QQ group code' })}
            >
              {getFieldDecorator('152', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[152].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'QQ group QR code' })}
            >
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/configs/uploadQqQunOrCode"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                headers={{ Authorization: authorization }}
              >
                {imageUrl ? <img src={imageUrl} alt="file" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                {formatMessage({ id: 'Submit' })}
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

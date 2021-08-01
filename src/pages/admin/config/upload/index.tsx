import {
  Button,
  Card,
  Form,
  Input,
  Checkbox,
} from 'antd';
import React, { Component } from 'react';

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
class TableList extends Component<TableListProps> {
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
        Object.keys(values).forEach((id) => {
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

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Type' })}
            >
              {getFieldDecorator('204', {
                initialValue: data.list[204].value,
              })(<Checkbox.Group>
                <Checkbox value="public">{formatMessage({ id: 'Local' })}</Checkbox>
                <Checkbox value="oss_uploads">{formatMessage({ id: 'Aliyun OSS' })}</Checkbox>
              </Checkbox.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun AccessKeyID' })}
            >
              {getFieldDecorator('200', {
                initialValue: data.list[200].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun AccessKeySecret' })}
            >
              {getFieldDecorator('201', {
                initialValue: data.list[201].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun BUCKET' })}
            >
              {getFieldDecorator('202', {
                initialValue: data.list[202].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun ENDPOINT' })}
            >
              {getFieldDecorator('203', {
                initialValue: data.list[203].value,
              })(
                <Input />,
              )}
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

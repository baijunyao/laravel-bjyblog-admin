import {
  Button,
  Card,
  Form, Input,
  Radio,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConfigStateType } from '../model';

const FormItem = Form.Item;
const { TextArea } = Input;

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
              label={formatMessage({ id: 'Use Slug' })}
            >
              {getFieldDecorator('167', {
                rules: [{ required: true }],
                initialValue: data.list[167].value,
              })(<Radio.Group>
                <Radio value="true">{formatMessage({ id: 'Yes' })}</Radio>
                <Radio value="false">{formatMessage({ id: 'No' })}</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Blog Name' })}
            >
              {getFieldDecorator('101', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[101].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Blog Title' })}
            >
              {getFieldDecorator('149', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[149].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Blog Keywords' })}
            >
              {getFieldDecorator('102', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[102].value,
              })(
                <TextArea />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Blog Description' })}
            >
              {getFieldDecorator('103', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[103].value,
              })(
                <TextArea />,
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

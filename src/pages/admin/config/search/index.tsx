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
              label="Driver"
            >
              {getFieldDecorator('177', {
                rules: [{ required: true }],
                initialValue: data.list[177].value,
              })(<Radio.Group>
                <Radio value="algolia">Algolia</Radio>
                <Radio value="elasticsearch">Elasticsearch</Radio>
                <Radio value="null">SQL</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch prefix"
            >
              {getFieldDecorator('178', {
                initialValue: data.list[178].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch host"
            >
              {getFieldDecorator('179', {
                initialValue: data.list[179].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch port"
            >
              {getFieldDecorator('180', {
                initialValue: data.list[180].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch scheme"
            >
              {getFieldDecorator('181', {
                initialValue: data.list[181].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch user"
            >
              {getFieldDecorator('182', {
                initialValue: data.list[182].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch pass"
            >
              {getFieldDecorator('183', {
                initialValue: data.list[183].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Elasticsearch analyzer"
            >
              {getFieldDecorator('184', {
                initialValue: data.list[184].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Algolia id"
            >
              {getFieldDecorator('186', {
                initialValue: data.list[186].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Algolia secret"
            >
              {getFieldDecorator('187', {
                initialValue: data.list[187].value,
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

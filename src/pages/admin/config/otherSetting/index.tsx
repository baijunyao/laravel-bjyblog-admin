import {
  Button,
  Card,
  Form, Input,
  Radio, Select,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConfigStateType } from '../model';
import UpdateForm, { UpdateItem } from '../components/UpdateForm';
import { StandardTableColumnProps } from '../components/StandardTable';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

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
  updateModalVisible: boolean;
  updateFormValues: UpdateItem;
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
    updateModalVisible: false,
    updateFormValues: {
      id: 0,
      value: '',
    },
  };

  columns: StandardTableColumnProps[] = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: formatMessage({ id: 'Handle' }),
      width: 110,
      render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({ id: 'Edit' })}</a>
          </Fragment>
        ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminConfig/fetch',
    });
  }

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateItem) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        value: '',
      },
    });
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminConfig/update',
      payload: fields,
    });
    this.handleUpdateModalVisible();
  };

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

    const { updateModalVisible, updateFormValues } = this.state;

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

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
              label={formatMessage({ id: 'Language' })}
            >
              {getFieldDecorator('166', {
                rules: [{ required: true }],
                initialValue: data.list[166].value,
              })(
                <Select>
                  <Option value="en">{formatMessage({ id: 'English' })}</Option>
                  <Option value="fr">{formatMessage({ id: 'French' })}</Option>
                  <Option value="ru">{formatMessage({ id: 'Russian' })}</Option>
                  <Option value="zh-CN">{formatMessage({ id: 'Chinese(Simplified)' })}</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Timezone' })}
            >
              {getFieldDecorator('195', {
                rules: [{ required: true }],
                initialValue: data.list[195].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Logo Style' })}
            >
              {getFieldDecorator('171', {
                rules: [{ required: true }],
                initialValue: data.list[171].value,
              })(<Radio.Group>
                <Radio value="true">{formatMessage({ id: 'Text with php tag' })}</Radio>
                <Radio value="false">{formatMessage({ id: 'Only text' })}</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'ICP' })}
            >
              {getFieldDecorator('117', {
                initialValue: data.list[117].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Default Author' })}
            >
              {getFieldDecorator('125', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[125].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Article Copyright Word' })}
            >
              {getFieldDecorator('119', {
                initialValue: data.list[119].value,
              })(
                <TextArea />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Image Alt Word' })}
            >
              {getFieldDecorator('141', {
                initialValue: data.list[141].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Image Water Text' })}
            >
              {getFieldDecorator('107', {
                initialValue: data.list[107].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Image Water Color' })}
            >
              {getFieldDecorator('110', {
                initialValue: data.list[110].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Baidu Site URL' })}
            >
              {getFieldDecorator('128', {
                initialValue: data.list[128].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Statistics Code' })}
            >
              {getFieldDecorator('123', {
                initialValue: data.list[123].value,
              })(
                <TextArea />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Admin Email' })}
            >
              {getFieldDecorator('118', {
                initialValue: data.list[118].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Notification Email' })}
            >
              {getFieldDecorator('148', {
                initialValue: data.list[148].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Sentry DSN' })}
            >
              {getFieldDecorator('158', {
                initialValue: data.list[158].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'CDN Domain' })}
            >
              {getFieldDecorator('172', {
                initialValue: data.list[172].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Cookie Domain' })}
            >
              {getFieldDecorator('185', {
                initialValue: data.list[185].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Link Target' })}
            >
              {getFieldDecorator('193', {
                rules: [{ required: true }],
                initialValue: data.list[193].value,
              })(<Radio.Group>
                <Radio value="_blank">{formatMessage({ id: 'New Tab' })}</Radio>
                <Radio value="_self">{formatMessage({ id: 'Current Tab' })}</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Breadcrumb' })}
            >
              {getFieldDecorator('194', {
                rules: [{ required: true }],
                initialValue: data.list[194].value,
              })(<Radio.Group>
                <Radio value="true">{formatMessage({ id: 'Yes' })}</Radio>
                <Radio value="false">{formatMessage({ id: 'No' })}</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                {formatMessage({ id: 'Submit' })}
              </Button>
            </FormItem>
          </Form>
        </Card>
        <UpdateForm
          {...updateMethods}
          updateModalVisible={updateModalVisible}
          updateFormValues={ updateFormValues }
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

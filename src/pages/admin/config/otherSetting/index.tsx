import {
  Button,
  Card,
  Form, Input,
  message, Radio, Select,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { StateType } from '../model';
import UpdateForm, { UpdateItem } from '../components/UpdateForm';
import { StandardTableColumnProps } from '../components/StandardTable';
import { TableListItem } from '../data.d';
import { TableListPagination, TableListParams } from '@/models/data.d';
import { FormattedMessage } from 'umi-plugin-react/locale';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminAndconfigAndindex/fetch'
      | 'adminAndconfigAndindex/update'
      >
    >;
  loading: boolean;
  adminAndconfigAndindex: StateType;
}

interface TableListState {
  updateModalVisible: boolean;
  formValues: { [key: string]: string };
  updateFormValues: UpdateItem;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
     adminAndconfigAndindex,
     loading,
   }: {
    adminAndconfigAndindex: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminAndconfigAndindex,
    loading: loading.models.adminAndconfigAndindex,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    updateModalVisible: false,
    formValues: {},
    updateFormValues: {
      id: 0,
      value: '',
    },
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '操作',
      render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          </Fragment>
        ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndconfigAndindex/fetch',
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'adminAndconfigAndindex/fetch',
      payload: params,
    });
  };

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
      type: 'adminAndconfigAndindex/update',
      payload: fields,
    });

    message.success('修改成功');
    this.handleUpdateModalVisible();
  };

  handleSubmit = (e: React.FormEvent) => {
    const {
      adminAndconfigAndindex: { data },
      dispatch,
      form,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach((id) => {
          console.log('diff');
          console.log(values[id]);
          console.log(data.list[id]);
          if (values[id] !== data.list[id].value) {
            dispatch({
              type: 'adminAndconfigAndindex/update',
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
      adminAndconfigAndindex: { data },
      form: { getFieldDecorator },
    } = this.props;

    console.log('data');
    console.log(data);
    // console.log(data.list['101']);

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
              label="语言"
            >
              {getFieldDecorator('166', {
                rules: [{ required: true }],
                initialValue: data.list[166].value,
              })(
                <Select>
                  <Option value="en">英文</Option>
                  <Option value="fr">法语</Option>
                  <Option value="ru">俄语</Option>
                  <Option value="zh-CN">简体中文</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Logo 风格"
            >
              {getFieldDecorator('171', {
                rules: [{ required: true }],
                initialValue: data.list[171].value,
              })(<Radio.Group>
                <Radio value="true">带 PHP 标签</Radio>
                <Radio value="false">纯文本</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="ICP 备案"
            >
              {getFieldDecorator('117', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[117].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="默认作者"
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
              label="文章保留版权提示"
            >
              {getFieldDecorator('119', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[119].value,
              })(
                <TextArea />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片title和alt内容"
            >
              {getFieldDecorator('141', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[141].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="水印内容"
            >
              {getFieldDecorator('107', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[107].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="水印颜色"
            >
              {getFieldDecorator('110', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[110].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="百度推送site提交链接"
            >
              {getFieldDecorator('128', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[128].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="第三方统计代码"
            >
              {getFieldDecorator('123', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[123].value,
              })(
                <TextArea />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="站长邮箱"
            >
              {getFieldDecorator('118', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[118].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用于接收通知的邮箱"
            >
              {getFieldDecorator('148', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[148].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Sentry DSN"
            >
              {getFieldDecorator('158', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[158].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="CDN 域名"
            >
              {getFieldDecorator('172', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[172].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Cookie Domain"
            >
              {getFieldDecorator('185', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[185].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="链接打开方式"
            >
              {getFieldDecorator('193', {
                rules: [{ required: true }],
                initialValue: data.list[193].value,
              })(<Radio.Group>
                <Radio value="_blank">新标签</Radio>
                <Radio value="_self">当前标签</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="面包屑"
            >
              {getFieldDecorator('194', {
                rules: [{ required: true }],
                initialValue: data.list[194].value,
              })(<Radio.Group>
                <Radio value="true">是</Radio>
                <Radio value="false">否</Radio>
              </Radio.Group>)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="formandbasic-form.form.submit" />
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

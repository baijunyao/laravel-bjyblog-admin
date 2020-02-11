import {
  Button,
  Card,
  Form, Input,
  message, Radio,
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
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
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: data.list[187].value,
              })(
                <Input />,
              )}
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

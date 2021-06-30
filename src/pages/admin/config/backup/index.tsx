import {
  Button,
  Card,
  Form,
  Input,
  Checkbox,
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
import { formatMessage } from 'umi-plugin-react/locale';

const FormItem = Form.Item;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminConfig/fetch'
      | 'adminConfig/update'
      >
    >;
  loading: boolean;
  adminConfig: StateType;
}

interface TableListState {
  updateModalVisible: boolean;
  formValues: { [key: string]: string };
  updateFormValues: UpdateItem;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
     adminConfig,
     loading,
   }: {
    adminConfig: StateType;
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
    formValues: {},
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
      type: 'adminConfig/fetch',
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
              label={formatMessage({ id: 'Type' })}
            >
              {getFieldDecorator('164', {
                initialValue: data.list[164].value,
              })(<Checkbox.Group>
                <Checkbox value="local">{formatMessage({ id: 'Local' })}</Checkbox>
                <Checkbox value="oss">{formatMessage({ id: 'Aliyun OSS' })}</Checkbox>
              </Checkbox.Group>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Notification Email' })}
            >
              {getFieldDecorator('165', {
                initialValue: data.list[165].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'MySQL Dump Path' })}
            >
              {getFieldDecorator('159', {
                initialValue: data.list[159].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun AccessKeyID' })}
            >
              {getFieldDecorator('160', {
                initialValue: data.list[160].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun AccessKeySecret' })}
            >
              {getFieldDecorator('161', {
                initialValue: data.list[161].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun BUCKET' })}
            >
              {getFieldDecorator('162', {
                initialValue: data.list[162].value,
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'Aliyun ENDPOINT' })}
            >
              {getFieldDecorator('163', {
                initialValue: data.list[163].value,
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

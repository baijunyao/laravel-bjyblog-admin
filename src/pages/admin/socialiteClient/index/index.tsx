import {
  Card,
  Form,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { StateType } from './model';
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem } from './data.d';
import { TableListPagination, TableListParams } from '@/models/data.d';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from '@/utils/style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminSocialiteClient/fetch'
      | 'adminSocialiteClient/update'
      | 'adminSocialiteClient/destroy'
    >
  >;
  loading: boolean;
  adminSocialiteClient: StateType;
}

interface TableListState {
  updateModalVisible: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  updateFormValues: UpdateItem;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    adminSocialiteClient,
    loading,
  }: {
    adminSocialiteClient: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminSocialiteClient,
    loading: loading.models.adminSocialiteClient,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    updateFormValues: {
      id: 0,
      client_id: '',
      client_secret: '',
    },
  };

  columns: StandardTableColumnProps[] = [
    {
      title: 'client id',
      dataIndex: 'client_id',
    },
    {
      title: 'client secret',
      dataIndex: 'client_secret',
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
      type: 'adminSocialiteClient/fetch',
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
      type: 'adminSocialiteClient/fetch',
      payload: params,
    });
  };

  handleMenuClick = (e: { key: string }) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'adminSocialiteClient/destroy',
          payload: {
            key: selectedRows.map(row => row.id),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateItem) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        client_id: '',
        client_secret: '',
      },
    });
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSocialiteClient/update',
      payload: fields,
    });
    this.handleUpdateModalVisible();
  };

  render() {
    const {
      adminSocialiteClient: { data },
      loading,
    } = this.props;

    const { selectedRows, updateModalVisible, updateFormValues } = this.state;

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
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

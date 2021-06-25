import {
  Button,
  Card,
  Divider,
  Form,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { CategoryStateType } from '@/models/category';
import CreateForm, { NewCategory } from './components/CreateForm';
import UpdateForm, { UpdateCategory } from './components/UpdateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem } from './data.d';
import { TableListPagination, TableListParams } from '@/models/data.d';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from '@/utils/style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminTag/add'
      | 'adminTag/fetch'
      | 'adminTag/update'
      | 'adminTag/destroy'
      | 'adminTag/forceDelete'
      | 'adminTag/restore'
    >
  >;
  loading: boolean;
  adminTag: CategoryStateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  updateFormValues: UpdateCategory;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    adminTag,
    loading,
  }: {
    adminTag: CategoryStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminTag,
    loading: loading.models.adminTag,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    updateFormValues: {
      id: 0,
      name: '',
      keywords: '',
      description: '',
    },
  };

  columns: StandardTableColumnProps[] = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
      render: (name, record) => <a href={`/category/${record.id}`} target="_blank" rel="noopener noreferrer">{name}</a>,
    },
    {
      title: formatMessage({ id: 'Keywords' }),
      dataIndex: 'keywords',
    },
    {
      title: formatMessage({ id: 'Description' }),
      dataIndex: 'description',
    },
    {
      title: formatMessage({ id: 'Status' }),
      width: 80,
      dataIndex: 'deleted_at',
      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
      ],
      render(val: string|null) {
        return val === null ? status[0] : status[1];
      },
    },
    {
      title: formatMessage({ id: 'Created_at' }),
      width: 115,
      dataIndex: 'created_at',
      sorter: true,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: formatMessage({ id: 'Handle' }),
      width: 110,
      render: (text, record) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({ id: 'Edit' })}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleForceDelete(record)}>{formatMessage({ id: 'Force Delete' })}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleRestore(record)}>{formatMessage({ id: 'Restore' })}</a>
          </Fragment>
        )
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/fetch',
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
      type: 'adminTag/fetch',
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
          type: 'adminTag/destroy',
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

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateCategory) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        name: '',
        keywords: '',
        description: '',
      },
    });
  };

  handleAdd = (fields: NewCategory) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/add',
      payload: fields,
    });
    this.handleModalVisible();
  };

  handleUpdate = (fields: UpdateCategory) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/update',
      payload: fields,
    });
    this.handleUpdateModalVisible();
  };

  handleDestroy = (fields: UpdateCategory) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: UpdateCategory) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: UpdateCategory) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/restore',
      payload: fields,
    });
  };

  render() {
    const {
      adminTag: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, updateFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                {formatMessage({ id: 'Add' })}
              </Button>
            </div>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
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

import {
  Button,
  Card,
  Divider,
  Dropdown,
  Form,
  Icon,
  Menu,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import CreateForm, { NewItem } from './components/CreateForm';
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem } from './data.d';
import { TableListPagination, TableListParams } from '@/models/data.d';

import styles from './style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const type:string[] = ['', 'GitHub', 'Gitee'];
const status:string[] = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminAndopenSourceAndindex/add'
      | 'adminAndopenSourceAndindex/fetch'
      | 'adminAndopenSourceAndindex/update'
      | 'adminAndopenSourceAndindex/destroy'
      | 'adminAndopenSourceAndindex/forceDelete'
      | 'adminAndopenSourceAndindex/restore'
    >
  >;
  loading: boolean;
  adminAndopenSourceAndindex: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  updateFormValues: UpdateItem;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    adminAndopenSourceAndindex,
    loading,
  }: {
    adminAndopenSourceAndindex: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminAndopenSourceAndindex,
    loading: loading.models.adminAndopenSourceAndindex,
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
      sort: 0,
      type: 1,
    },
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '类型',
      dataIndex: 'type',
      filters: [
        {
          text: type[1],
          value: '1',
        },
        {
          text: type[2],
          value: '2',
        },
      ],
      render(val: number) {
        return type[val];
      },
    },
    {
      title: '状态',
      dataIndex: 'deleted_at',
      filters: [
        {
          text: status[0],
          value: '1',
        },
        {
          text: status[1],
          value: '0',
        },
      ],
      render(val: string|null) {
        return val === null ? status[0] : status[1];
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>删除</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleForceDelete(record)}>彻底删除</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleRestore(record)}>恢复</a>
          </Fragment>
        )
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndopenSourceAndindex/fetch',
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
      type: 'adminAndopenSourceAndindex/fetch',
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
          type: 'adminAndopenSourceAndindex/destroy',
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

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateItem) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        name: '',
        sort: 0,
        type: 1,
      },
    });
  };

  handleAdd = (fields: NewItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndopenSourceAndindex/add',
      payload: fields,
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndopenSourceAndindex/update',
      payload: fields,
    });

    message.success('修改成功');
    this.handleUpdateModalVisible();
  };

  handleDestroy = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndopenSourceAndindex/destroy',
      payload: fields,
    });

    message.success('删除成功');
  };

  handleForceDelete = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndopenSourceAndindex/forceDelete',
      payload: fields,
    });

    message.success('删除成功');
  };

  handleRestore = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndopenSourceAndindex/restore',
      payload: fields,
    });

    message.success('恢复成功');
  };

  render() {
    console.log(this.props);
    const {
      adminAndopenSourceAndindex: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, updateFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

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
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
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

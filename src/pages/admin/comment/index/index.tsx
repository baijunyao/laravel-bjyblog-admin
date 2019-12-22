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
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem } from './data.d';
import { TableListPagination, TableListParams } from '@/models/data.d';

import styles from './style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminAndcommentAndindex/fetch'
      | 'adminAndcommentAndindex/update'
      | 'adminAndcommentAndindex/destroy'
      | 'adminAndcommentAndindex/forceDelete'
      | 'adminAndcommentAndindex/restore'
    >
  >;
  loading: boolean;
  adminAndcommentAndindex: StateType;
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
    adminAndcommentAndindex,
    loading,
  }: {
    adminAndcommentAndindex: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminAndcommentAndindex,
    loading: loading.models.adminAndcommentAndindex,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    updateFormValues: {
      id: 0,
      content: '',
      is_audited: 1,
    },
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '内容',
      dataIndex: 'content',
      render: (val: string) => <div dangerouslySetInnerHTML={{ __html: val }} />,
    },
    {
      title: '文章',
      dataIndex: 'article.title',
    },
    {
      title: '用户',
      dataIndex: 'socialite_user.name',
    },
    {
      title: '已审核',
      dataIndex: 'is_audited',
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
      render(val: number) {
        return val === 1 ? status[0] : status[1];
      },
    },
    {
      title: '状态',
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
      type: 'adminAndcommentAndindex/fetch',
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
      type: 'adminAndcommentAndindex/fetch',
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
          type: 'adminAndcommentAndindex/destroy',
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
        content: '',
        is_audited: 1,
      },
    });
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndcommentAndindex/update',
      payload: fields,
    });

    message.success('修改成功');
    this.handleUpdateModalVisible();
  };

  handleDestroy = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndcommentAndindex/destroy',
      payload: fields,
    });

    message.success('删除成功');
  };

  handleForceDelete = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndcommentAndindex/forceDelete',
      payload: fields,
    });

    message.success('删除成功');
  };

  handleRestore = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndcommentAndindex/restore',
      payload: fields,
    });

    message.success('恢复成功');
  };

  render() {
    console.log(this.props);
    const {
      adminAndcommentAndindex: { data },
      loading,
    } = this.props;

    const { selectedRows, updateModalVisible, updateFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
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

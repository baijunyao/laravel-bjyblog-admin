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
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { OpenSourceStateType } from './model';
import CreateForm, { NewItem } from './components/CreateForm';
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable from '@/pages/admin/components/StandardTable';
import { OpenSourceType } from './data.d'

import styles from '@/utils/style.less';

const type:string[] = ['', 'GitHub', 'Gitee'];
const status:string[] = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminOpenSource/add'
      | 'adminOpenSource/update'
      | 'adminOpenSource/destroy'
      | 'adminOpenSource/forceDelete'
      | 'adminOpenSource/restore'
    >
  >;
  loading: boolean;
  adminOpenSource: OpenSourceStateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  updateFormValues: UpdateItem;
}

@connect(
  ({
    adminOpenSource,
    loading,
  }: {
    adminOpenSource: OpenSourceStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminOpenSource,
    loading: loading.models.adminOpenSource,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    updateFormValues: {
      id: 0,
      name: '',
      sort: 0,
      type: 1,
    },
  };

  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'Sort' }),
      dataIndex: 'sort',
    },
    {
      title: formatMessage({ id: 'Type' }),
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
      title: formatMessage({ id: 'Status' }),
      width: 80,
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
      title: formatMessage({ id: 'Created_at' }),
      width: 115,
      dataIndex: 'created_at',
      sorter: true,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: formatMessage({ id: 'Handle' }),
      width: 110,
      render: (text: string, record: OpenSourceType) => {
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
      type: 'adminOpenSource/add',
      payload: fields,
    });
    this.handleModalVisible();
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/update',
      payload: fields,
    });
    this.handleUpdateModalVisible();
  };

  handleDestroy = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/restore',
      payload: fields,
    });
  };

  render() {
    const { modalVisible, updateModalVisible, updateFormValues } = this.state;

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
              columns={this.columns}
              model="adminOpenSource"
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

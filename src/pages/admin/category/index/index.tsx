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
import { CategoryStateType } from '@/models/category';
import CreateForm, { NewCategory } from './components/CreateForm';
import UpdateForm, { UpdateCategory } from './components/UpdateForm';
import StandardTable from '@/pages/admin/components/StandardTable';

import styles from '@/utils/style.less';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminTag/add'
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
  updateFormValues: UpdateCategory;
}

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
    updateFormValues: {
      id: 0,
      name: '',
      keywords: '',
      description: '',
      deleted_at: '',
    },
  };

  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
      render: (text:string, record: UpdateCategory) => <a href={`/category/${record.id}`} target="_blank" rel="noopener noreferrer">{text}</a>,
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
      render: (text:string, record: UpdateCategory) => {
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

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateCategory) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        name: '',
        keywords: '',
        description: '',
        deleted_at: '',
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
              model="adminTag"
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

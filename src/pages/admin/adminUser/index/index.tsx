import { Card, Form } from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { AdminUserStateType } from './model';
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable from '@/pages/admin/components/StandardTable';
import { AdminUserType } from './data.d';
import styles from '@/utils/style.less';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminUser/update'
      | 'adminUser/destroy'
      | 'adminUser/forceDelete'
      | 'adminUser/restore'
    >
  >;
  loading: boolean;
  adminUser: AdminUserStateType;
}

interface TableListState {
  updateModalVisible: boolean;
  updateFormValues: UpdateItem;
}

@connect(
  ({
    adminUser,
    loading,
  }: {
    adminUser: AdminUserStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminUser,
    loading: loading.models.adminUser,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    updateModalVisible: false,
    updateFormValues: {
      id: 0,
      name: '',
      email: '',
    },
  };

  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'Email' }),
      dataIndex: 'email',
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
      render: (text: string, record: AdminUserType) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({ id: 'Edit' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({ id: 'Edit' })}</a>
          </Fragment>
        )
      },
    },
  ];

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateItem) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        name: '',
        email: '',
      },
    });
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminUser/update',
      payload: fields,
    });

    this.handleUpdateModalVisible();
  };

  render() {
    const { updateModalVisible, updateFormValues } = this.state;

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
            </div>
            <StandardTable
              columns={this.columns}
              model="adminUser"
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

import {
  Card,
  Form,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { StateType } from './model';
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable from '@/pages/admin/components/StandardTable';
import { SocialiteUserType } from './data.d';

import styles from '@/utils/style.less';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminSocialiteUser/update'
      | 'adminSocialiteUser/destroy'
      | 'adminSocialiteUser/forceDelete'
      | 'adminSocialiteUser/restore'
      >
    >;
  loading: boolean;
  adminSocialiteUser: StateType;
}

interface TableListState {
  updateModalVisible: boolean;
  updateFormValues: UpdateItem;
}

@connect(
  ({
     adminSocialiteUser,
     loading,
   }: {
    adminSocialiteUser: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminSocialiteUser,
    loading: loading.models.adminSocialiteUser,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    updateModalVisible: false,
    updateFormValues: {
      id: 0,
      name: '',
      email: '',
      is_admin: 0,
      is_blocked: 0,
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
      title: formatMessage({ id: 'Socialite Client Name' }),
      dataIndex: 'socialite_client.name',
    },
    {
      title: formatMessage({ id: 'Is Administrator' }),
      dataIndex: 'is_admin',
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
      title: formatMessage({ id: 'Is Blocked' }),
      dataIndex: 'is_blocked',
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
      title: formatMessage({ id: 'Created_at' }),
      width: 115,
      dataIndex: 'created_at',
      sorter: true,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: formatMessage({ id: 'Handle' }),
      width: 110,
      render: (text: string, record: SocialiteUserType) => {
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
        is_admin: 0,
        is_blocked: 0,
      },
    });
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSocialiteUser/update',
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
              model="adminSocialiteUser"
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

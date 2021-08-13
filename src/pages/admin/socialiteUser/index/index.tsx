import {
  Card,
  Form, Input, Radio,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { SocialiteUserStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { SocialiteUserType } from './data.d';

import styles from '@/utils/style.less';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import { MetaType } from '@/components/FormBuilder';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch;
  adminSocialiteUser: SocialiteUserStateType;
}

@connect(
  ({
     adminSocialiteUser,
   }: {
    adminSocialiteUser: SocialiteUserStateType;
  }) => ({
    adminSocialiteUser,
  }),
)
class TableList extends Component<TableListProps> {
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
      render: (text: string, record: SocialiteUserType) => (
        <Fragment>
          <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminSocialiteUser/update')}>{formatMessage({ id: 'Edit' })}</a>
        </Fragment>
      ),
    },
  ];

  meta: MetaType[] = [
    {
      key: 'name',
      label: 'Name',
      widget: Input,
      required: true,
    },
    {
      key: 'email',
      label: 'Email',
      widget: Input,
      required: true,
    },
    {
      key: 'is_admin',
      label: 'Is Administrator',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 1,
            label: 'Yes',
          },
          {
            value: 0,
            label: 'No',
          },
        ],
      },
      required: true,
    },
    {
      key: 'is_blocked',
      label: 'Is Blocked',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 1,
            label: 'Yes',
          },
          {
            value: 0,
            label: 'No',
          },
        ],
      },
      required: true,
    },
  ];

  render() {
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
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

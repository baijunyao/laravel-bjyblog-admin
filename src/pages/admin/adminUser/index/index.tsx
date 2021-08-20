import { Card, Form, Input } from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { AdminUserStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { AdminUserType } from './data.d';
import styles from '@/utils/style.less';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import { MetaType } from '@/components/FormBuilder';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch;
  adminUser: AdminUserStateType;
}

@connect(
  ({
    adminUser,
  }: {
    adminUser: AdminUserStateType;
  }) => ({
    adminUser,
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
      render: (text: string, record: AdminUserType) => (
        <Fragment>
          <a className="handle-edit-btn" onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminUser/update')}>{formatMessage({ id: 'Edit' })}</a>
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
      key: 'password',
      label: 'Password',
      widget: Input,
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
              model="adminUser"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

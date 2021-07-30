import {
  Card,
  Divider,
  Form, Input,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { FriendStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import styles from '@/utils/style.less';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import { MetaType } from '@/components/FormBuilder';
import { FriendType } from '@/pages/admin/friend/index/data';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminFriendship/destroy'
      | 'adminFriendship/forceDelete'
      | 'adminFriendship/restore'
    >
  >;
  loading: boolean;
  adminFriendship: FriendStateType;
}

@connect(
  ({
    adminFriendship,
    loading,
  }: {
    adminFriendship: FriendStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminFriendship,
    loading: loading.models.adminFriendship,
  }),
)
class TableList extends Component<TableListProps> {
  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      render: (url: string) => <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>,
    },
    {
      title: formatMessage({ id: 'Sort' }),
      dataIndex: 'sort',
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
      render: (text: string, record: FriendType) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminFriendship/update')}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminFriendship/update')}>{formatMessage({ id: 'Edit' })}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleForceDelete(record)}>{formatMessage({ id: 'Force Delete' })}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleRestore(record)}>{formatMessage({ id: 'Restore' })}</a>
          </Fragment>
        )
      },
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
      key: 'url',
      label: 'URL',
      widget: Input,
      required: true,
    },
    {
      key: 'sort',
      label: 'Sort',
      widget: Input,
      required: true,
    },
  ];

  handleDestroy = (fields: FriendType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminFriendship/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: FriendType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminFriendship/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: FriendType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminFriendship/restore',
      payload: fields,
    });
  };

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <AddButton
              meta={this.meta}
              actionType="adminCategory/add"
            />
            <StandardTable
              columns={this.columns}
              model="adminFriendship"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

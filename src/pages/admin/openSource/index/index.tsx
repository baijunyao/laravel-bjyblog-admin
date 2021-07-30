import {
  Card,
  Divider,
  Form, Input, Radio,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { OpenSourceStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { OpenSourceType } from './data.d'
import styles from '@/utils/style.less';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import { MetaType } from '@/components/FormBuilder';

const type:string[] = ['', 'GitHub', 'Gitee'];
const status:string[] = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminOpenSource/destroy'
      | 'adminOpenSource/forceDelete'
      | 'adminOpenSource/restore'
    >
  >;
  loading: boolean;
  adminOpenSource: OpenSourceStateType;
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
class TableList extends Component<TableListProps> {
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
              <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminOpenSource/update')}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminOpenSource/update')}>{formatMessage({ id: 'Edit' })}</a>
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
      key: 'type',
      label: 'Type',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 1,
            label: 'GitHub',
          },
          {
            value: 2,
            label: 'Gitee',
          },
        ],
      },
      required: true,
    },
    {
      key: 'name',
      label: 'Name',
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

  handleDestroy = (fields: OpenSourceType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: OpenSourceType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: OpenSourceType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminOpenSource/restore',
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
              model="adminOpenSource"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

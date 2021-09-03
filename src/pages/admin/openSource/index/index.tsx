import {
  Card,
  Form, Input, Radio,
} from 'antd';
import React, { Component } from 'react';

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
import ModalForm from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import { MetaType } from '@/components/FormBuilder';
import HandleDropdown from '@/components/HandleDropdown';

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
  adminOpenSource: OpenSourceStateType;
}

@connect(
  ({
    adminOpenSource,
  }: {
    adminOpenSource: OpenSourceStateType;
  }) => ({
    adminOpenSource,
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
      render: (text: string, record: OpenSourceType) => (
        <HandleDropdown
          dispatch={this.props.dispatch}
          meta={this.meta}
          rows={this.props.adminOpenSource.data.list}
          selectedRow={record}
          namespace="adminOpenSource"
        />
      ),
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

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <AddButton
              meta={this.meta}
              actionType="adminOpenSource/add"
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

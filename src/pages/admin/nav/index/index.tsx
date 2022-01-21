import { Card, Form, Input } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { NavStateType } from '@/models/nav';
import StandardTable from '@/pages/admin/components/StandardTable';
import ModalForm from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import styles from '@/utils/style.less';
import { MetaType } from '@/components/FormBuilder';
import { NavType } from '@/models/data';
import HandleDropdown from '@/components/HandleDropdown';
import InputNumber from "antd/lib/input-number";

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminNav/destroy'
      | 'adminNav/forceDelete'
      | 'adminNav/restore'
    >
  >;
  adminNav: NavStateType;
}

@connect(
  ({
    adminNav,
  }: {
    adminNav: NavStateType;
  }) => ({
    adminNav,
  }),
)
class TableList extends Component<TableListProps> {
  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
      render: (text:string, record: NavType) => <a href={`/nav/${record.id}`} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: formatMessage({ id: 'URL' }),
      dataIndex: 'url',
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
      render: (text:string, record: NavType) => (
        <HandleDropdown
          dispatch={this.props.dispatch}
          meta={this.meta}
          rows={this.props.adminNav.data.list}
          selectedRow={record}
          namespace="adminNav"
        />
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

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <AddButton
              meta={this.meta}
              actionType="adminNav/add"
            />
            <StandardTable
              columns={this.columns}
              model="adminNav"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

import { Card, Form, Input } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { CategoryStateType } from '@/models/category';
import StandardTable from '@/pages/admin/components/StandardTable';
import ModalForm from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import styles from '@/utils/style.less';
import { MetaType } from '@/components/FormBuilder';
import { CategoryType } from '@/models/data';
import HandleDropdown from '@/components/HandleDropdown';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminCategory/destroy'
      | 'adminCategory/forceDelete'
      | 'adminCategory/restore'
    >
  >;
  adminCategory: CategoryStateType;
}

@connect(
  ({
    adminCategory,
  }: {
    adminCategory: CategoryStateType;
  }) => ({
    adminCategory,
  }),
)
class TableList extends Component<TableListProps> {
  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
      render: (text:string, record: CategoryType) => <a href={`/category/${record.id}`} target="_blank" rel="noopener noreferrer">{text}</a>,
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
      render: (text:string, record: CategoryType) => (
        <HandleDropdown
          dispatch={this.props.dispatch}
          meta={this.meta}
          rows={this.props.adminCategory.data.list}
          selectedRow={record}
          namespace="adminCategory"
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
      key: 'keywords',
      label: 'Keywords',
      widget: Input,
      required: true,
    },
    {
      key: 'description',
      label: 'Description',
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
              actionType="adminCategory/add"
            />
            <StandardTable
              columns={this.columns}
              model="adminCategory"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

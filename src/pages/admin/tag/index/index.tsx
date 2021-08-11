import {
  Card,
  Form, Input,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { TagStateType } from '@/models/tag';
import StandardTable from '@/pages/admin/components/StandardTable';
import { TagType } from '@/models/data.d';

import styles from '@/utils/style.less';
import ModalForm from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import { MetaType } from '@/components/FormBuilder';
import HandleDropdown from '@/components/HandleDropdown';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch;
  adminTag: TagStateType;
}

@connect(
  ({
    adminTag,
  }: {
    adminTag: TagStateType;
  }) => ({
    adminTag,
  }),
)
class TableList extends Component<TableListProps> {
  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
      render: (name: string, record: TagType) => <a href={`/tag/${record.id}`} target="_blank" rel="noopener noreferrer">{name}</a>,
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
      render: (text: string, record: TagType) => (
        <HandleDropdown
          dispatch={this.props.dispatch}
          meta={this.meta}
          rows={this.props.adminTag.data.list}
          selectedRow={record}
          namespace="adminTag"
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
              actionType="adminTag/add"
            />
            <StandardTable
              columns={this.columns}
              model="adminTag"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

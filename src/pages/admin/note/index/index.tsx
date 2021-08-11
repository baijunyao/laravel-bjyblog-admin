import {
  Card,
  Form, Input,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { NoteStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { NoteType } from './data.d'
import styles from '@/utils/style.less';
import AddButton from '@/components/AddButton';
import ModalForm from '@/components/ModalForm';
import { MetaType } from '@/components/FormBuilder';
import HandleDropdown from '@/components/HandleDropdown';

const { TextArea } = Input;
const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminNote/destroy'
      | 'adminNote/forceDelete'
      | 'adminNote/restore'
    >
  >;
  loading: boolean;
  adminNote: NoteStateType;
}

@connect(
  ({
    adminNote,
    loading,
  }: {
    adminNote: NoteStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminNote,
    loading: loading.models.adminNote,
  }),
)
class TableList extends Component<TableListProps> {
  columns = [
    {
      title: formatMessage({ id: 'Content' }),
      dataIndex: 'content',
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
      render: (text: string, record: NoteType) => (
        <HandleDropdown
          dispatch={this.props.dispatch}
          meta={this.meta}
          rows={this.props.adminNote.data.list}
          selectedRow={record}
          namespace="adminNote"
        />
      ),
    },
  ];

  meta: MetaType[] = [
    {
      key: 'content',
      label: 'Content',
      widget: TextArea,
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
              model="adminNote"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

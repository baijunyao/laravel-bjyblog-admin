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
import { NoteStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { NoteType } from './data.d'
import styles from '@/utils/style.less';
import AddButton from '@/components/AddButton';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import { MetaType } from '@/components/FormBuilder';

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
      render: (text: string, record: NoteType) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminNote/update')}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminNote/update')}>{formatMessage({ id: 'Edit' })}</a>
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
      key: 'content',
      label: 'Content',
      widget: TextArea,
      required: true,
    },
  ];

  handleDestroy = (fields: NoteType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminNote/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: NoteType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminNote/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: NoteType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminNote/restore',
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

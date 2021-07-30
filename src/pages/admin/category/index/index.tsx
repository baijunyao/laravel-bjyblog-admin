import { Card, Divider, Form, Input } from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { CategoryStateType } from '@/models/category';
import StandardTable from '@/pages/admin/components/StandardTable';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import styles from '@/utils/style.less';
import { MetaType } from '@/components/FormBuilder';
import { CategoryType } from '@/models/data';

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
      render: (text:string, record: CategoryType) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminCategory/update')}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminCategory/update')}>{formatMessage({ id: 'Edit' })}</a>
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

  handleDestroy = (fields: CategoryType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminCategory/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: CategoryType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminCategory/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: CategoryType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminCategory/restore',
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

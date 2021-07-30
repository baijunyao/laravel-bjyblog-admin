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
import { SiteStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { SiteType } from './data.d';

import styles from '@/utils/style.less';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import AddButton from '@/components/AddButton';
import { MetaType } from '@/components/FormBuilder';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminSite/fetch'
      | 'adminSite/destroy'
      | 'adminSite/forceDelete'
      | 'adminSite/restore'
    >
  >;
  loading: boolean;
  adminSite: SiteStateType;
}

@connect(
  ({
    adminSite,
    loading,
  }: {
    adminSite: SiteStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminSite,
    loading: loading.models.adminSite,
  }),
)
class TableList extends Component<TableListProps> {
  columns = [
    {
      title: formatMessage({ id: 'Name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'Description' }),
      dataIndex: 'description',
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
      title: formatMessage({ id: 'Audited' }),
      dataIndex: 'audit',
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
      render(val: number) {
        return val === 1 ? status[0] : status[1];
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
      render: (text: string, record: SiteType) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminSite/update')}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminSite/update')}>{formatMessage({ id: 'Edit' })}</a>
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
      key: 'description',
      label: 'Description',
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
    {
      key: 'audit',
      label: 'Audited',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 1,
            label: 'Yes',
          },
          {
            value: 0,
            label: 'No',
          },
        ],
      },
      required: true,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSite/fetch',
    });
  }

  handleDestroy = (fields: SiteType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSite/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: SiteType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSite/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: SiteType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSite/restore',
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
              model="adminSite"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

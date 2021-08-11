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
import { CommentStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { CommentType } from './data.d';
import styles from '@/utils/style.less';
import { MetaType } from '@/components/FormBuilder';
import ModalForm from '@/components/ModalForm';
import HandleDropdown from '@/components/HandleDropdown';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminComment/destroy'
      | 'adminComment/forceDelete'
      | 'adminComment/restore'
    >
  >;
  loading: boolean;
  adminComment: CommentStateType;
}

interface TableListState {
  updateModalVisible: boolean;
  updateFormValues: CommentType;
}

@connect(
  ({
    adminComment,
    loading,
  }: {
    adminComment: CommentStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminComment,
    loading: loading.models.adminComment,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  columns = [
    {
      title: formatMessage({ id: 'Content' }),
      dataIndex: 'content',
      render: (content: string, record: CommentType) => <a href={`/article/${record.article.id}#comment-${record.id}`} target="_blank" rel="noopener noreferrer"><div dangerouslySetInnerHTML={{ __html: content }} /></a>,
    },
    {
      title: formatMessage({ id: 'Article' }),
      dataIndex: 'article.title',
    },
    {
      title: formatMessage({ id: 'User' }),
      dataIndex: 'socialite_user.name',
    },
    {
      title: formatMessage({ id: 'Audited' }),
      dataIndex: 'is_audited',
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
      render: (text: string, record: CommentType) => (
        <HandleDropdown
          dispatch={this.props.dispatch}
          meta={this.meta}
          rows={this.props.adminComment.data.list}
          selectedRow={record}
          namespace="adminComment"
        />
      ),
    },
  ];

  meta: MetaType[] = [
    {
      key: 'content',
      label: 'Content',
      widget: Input,
      required: true,
    },
    {
      key: 'is_audited',
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

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
            </div>
            <StandardTable
              columns={this.columns}
              model="adminComment"
            />
          </div>
        </Card>
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

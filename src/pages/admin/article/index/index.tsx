import {
  Button,
  Card,
  Divider,
  Form,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { router } from 'umi';
import StandardTable from '@/pages/admin/components/StandardTable';
import { ArticleListPaginationType, ArticleType } from '@/models/data.d';
import styles from '@/utils/style.less';

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminArticle/destroy'
      | 'adminArticle/forceDelete'
      | 'adminArticle/restore'
    >
  >;
  articles: ArticleListPaginationType;
}

interface TableListState {
  selectedRows: ArticleType[];
  formValues: { [key: string]: string };
}

class TableList extends Component<TableListProps, TableListState> {
  columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: formatMessage({ id: 'Category' }),
      dataIndex: 'category.name',
    },
    {
      title: formatMessage({ id: 'Title' }),
      dataIndex: 'title',
      render: (title: string, record: ArticleType) => <a href={`/article/${record.id}`} target="_blank" rel="noopener noreferrer">{title}</a>,
    },
    {
      title: formatMessage({ id: 'Click Counts' }),
      dataIndex: 'views',
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
      render: (text: string, record: ArticleType) => {
        if (record.deleted_at === null) {
          return (
            <Fragment>
              <a onClick={() => this.handleRedirectToEditPage(record)}>{formatMessage({ id: 'Edit' })}</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDestroy(record)}>{formatMessage({ id: 'Delete' })}</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a onClick={() => this.handleRedirectToEditPage(record)}>{formatMessage({ id: 'Edit' })}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleForceDelete(record)}>{formatMessage({ id: 'Force Delete' })}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleRestore(record)}>{formatMessage({ id: 'Restore' })}</a>
          </Fragment>
        )
      },
    },
  ];

  handleRedirectToCreatePage = () => {
    router.push('/article/create');
  };

  handleRedirectToEditPage = (record: ArticleType) => {
    router.push(`/article/edit/${record.id}`);
  };

  handleDestroy = (fields: ArticleType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminArticle/destroy',
      payload: fields,
    });
  };

  handleForceDelete = (fields: ArticleType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminArticle/forceDelete',
      payload: fields,
    });
  };

  handleRestore = (fields: ArticleType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminArticle/restore',
      payload: fields,
    });
  };

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.handleRedirectToCreatePage}>
                {formatMessage({ id: 'Add' })}
              </Button>
            </div>
            <StandardTable
              columns={this.columns}
              model="adminArticle"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

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
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { router } from 'umi';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem } from './data.d';
import { ArticleListType, ArticleType, TableListPagination, TableListParams } from '@/models/data.d';
import { ArticleStateType } from '@/models/article';
import styles from './style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const status = ['√', '×'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminArticle/fetchAll'
      | 'adminArticle/destroy'
      | 'adminArticle/forceDelete'
      | 'adminArticle/restore'
    >
  >;
  articles: ArticleListType;
}

interface TableListState {
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
}

@connect(
  ({
     adminArticle,
  }: {
    adminArticle: ArticleStateType;
  }) => ({
    articles: adminArticle.list_data,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  columns: StandardTableColumnProps[] = [
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
      render: (title, record) => <a href={`/article/${record.id}`} target="_blank" rel="noopener noreferrer">{title}</a>,
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
      render: (text, record) => {
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminArticle/fetchAll',
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'adminArticle/fetchAll',
      payload: params,
    });
  };

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
              data={this.props.articles}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
              selectedRows={[]}
              onSelectRow={() => {}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

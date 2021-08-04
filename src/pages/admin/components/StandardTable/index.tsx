import { Table } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { TableListParams } from '@/models/data';

interface StandardTablePropType {
  columns: any;
  model: string;
}

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect((state: any) => (state))
class StandardTable extends Component<StandardTablePropType> {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: `${this.props.model}/fetch`,
    });
  }

  handleFilter = (pagination: any, filtersArg: any, sorter: any) => {
    const { dispatch } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: `${this.props.model}/fetch`,
      payload: params,
    });
  };

  render() {
    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={record => record.id.toString()}
          dataSource={this.props[this.props.model].data.list}
          pagination={this.props[this.props.model].data.pagination}
          onChange={this.handleFilter}
          columns={this.props.columns}
        />
      </div>
    );
  }
}

export default StandardTable;

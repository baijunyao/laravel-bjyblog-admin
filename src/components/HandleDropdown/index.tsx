import { Dropdown, Menu } from 'antd';
import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { collect } from 'collect.js';
import { handleUpdate } from '@/components/ModalForm';
import { MetaType } from '@/components/FormBuilder';
import { EloquentType } from '@/models/data.d'

interface HandleDropdownProps {
  dispatch: Dispatch;
  meta: MetaType[];
  rows: EloquentType[];
  selectedRow: EloquentType;
  namespace: string;
}

class HandleDropdown extends Component<HandleDropdownProps> {
  handleDestroy = (fields: EloquentType) => {
    const { dispatch } = this.props;

    dispatch({
      type: `${this.props.namespace}/destroy`,
      payload: fields,
    });
  };

  handleForceDelete = (fields: EloquentType) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.props.namespace}/forceDelete`,
      payload: fields,
    });
  };

  handleRestore = (fields: EloquentType) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.props.namespace}/restore`,
      payload: fields,
    });
  };

  generateMenu = (selectedRow: EloquentType) => {
    const deletedAt: string | null = collect(this.props.rows).where('id', this.props.selectedRow.id).first().deleted_at;

    return (
      <Menu>
        <Menu.Item key="0">
          <a onClick={() => handleUpdate(this.props.dispatch, this.props.meta, this.props.selectedRow, `${this.props.namespace}/update`)}>{formatMessage({ id: 'Edit' })}</a>
        </Menu.Item>
        <Menu.Item key="1">
          {
            deletedAt === null ?
              <a onClick={() => this.handleDestroy(selectedRow)}>{formatMessage({ id: 'Delete' })}</a> :
              <a onClick={() => this.handleForceDelete(selectedRow)}>{formatMessage({ id: 'Force Delete' })}</a>
          }
        </Menu.Item>
        <Menu.Item key="2">
          <a onClick={() => this.handleRestore(selectedRow)}>{formatMessage({ id: 'Restore' })}</a>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    if (this.props.selectedRow === undefined) {
      return <></>
    }

    return (
      <Dropdown overlay={this.generateMenu(this.props.selectedRow)}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {formatMessage({ id: 'Handle' })}
        </a>
      </Dropdown>
    );
  }
}

export default connect(
  (state: HandleDropdownProps) => (state),
)(HandleDropdown)

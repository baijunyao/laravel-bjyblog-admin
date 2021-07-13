import {
  Card,
  Form,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { StateType } from './model';
import UpdateForm, { UpdateItem } from './components/UpdateForm';
import StandardTable from '@/pages/admin/components/StandardTable';
import { SocialiteClientType } from './data.d';

import styles from '@/utils/style.less';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminSocialiteClient/fetch'
      | 'adminSocialiteClient/update'
      | 'adminSocialiteClient/destroy'
    >
  >;
  loading: boolean;
  adminSocialiteClient: StateType;
}

interface TableListState {
  updateModalVisible: boolean;
  updateFormValues: UpdateItem;
}

@connect(
  ({
    adminSocialiteClient,
    loading,
  }: {
    adminSocialiteClient: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    adminSocialiteClient,
    loading: loading.models.adminSocialiteClient,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    updateModalVisible: false,
    updateFormValues: {
      id: 0,
      client_id: '',
      client_secret: '',
    },
  };

  columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'client id',
      dataIndex: 'client_id',
    },
    {
      title: 'client secret',
      dataIndex: 'client_secret',
    },
    {
      title: formatMessage({ id: 'Handle' }),
      width: 110,
      render: (text: string, record: SocialiteClientType) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({ id: 'Edit' })}</a>
          </Fragment>
        ),
    },
  ];

  handleUpdateModalVisible = (flag?: boolean, record?: UpdateItem) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {
        id: 0,
        client_id: '',
        client_secret: '',
      },
    });
  };

  handleUpdate = (fields: UpdateItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminSocialiteClient/update',
      payload: fields,
    });
    this.handleUpdateModalVisible();
  };

  render() {
    const { updateModalVisible, updateFormValues } = this.state;

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              columns={this.columns}
              model="adminSocialiteClient"
            />
          </div>
        </Card>
        <UpdateForm
          {...updateMethods}
          updateModalVisible={updateModalVisible}
          updateFormValues={ updateFormValues }
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

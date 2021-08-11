import {
  Card,
  Form, Input,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { SocialiteClientStateType } from './model';
import StandardTable from '@/pages/admin/components/StandardTable';
import { SocialiteClientType } from './data.d';

import styles from '@/utils/style.less';
import ModalForm, { handleUpdate } from '@/components/ModalForm';
import { MetaType } from '@/components/FormBuilder';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminSocialiteClient/fetch'
      | 'adminSocialiteClient/update'
      | 'adminSocialiteClient/destroy'
    >
  >;
  loading: boolean;
  adminSocialiteClient: SocialiteClientStateType;
}

@connect(
  ({
    adminSocialiteClient,
    loading,
  }: {
    adminSocialiteClient: SocialiteClientStateType;
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
class TableList extends Component<TableListProps> {
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
            <a onClick={() => handleUpdate(this.props.dispatch, this.meta, record, 'adminSocialiteClient/update')}>{formatMessage({ id: 'Edit' })}</a>
          </Fragment>
        ),
    },
  ];

  meta: MetaType[] = [
    {
      key: 'client_id',
      label: 'Client id',
      widget: Input,
      required: true,
    },
    {
      key: 'client_secret',
      label: 'Client secret',
      widget: Input,
      required: true,
    },
  ];

  render() {
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
        <ModalForm />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

import {
  Form,
  Input,
} from 'antd';
import React, { Component } from 'react';

import ConfigForm from '@/pages/admin/config/components/ConfigForm';
import { MetaType } from '@/components/FormBuilder';

class TableList extends Component {
  meta: MetaType[] = [
    {
      key: '205',
      label: 'secret_id',
      widget: Input,
      required: false,
    },
    {
      key: '206',
      label: 'secret_key',
      widget: Input,
      required: false,
    },
    {
      key: '207',
      label: 'region',
      widget: Input,
      required: false,
    },
    {
      key: '208',
      label: 'project_id',
      widget: Input,
      required: false,
    },
  ];

  render() {
    return (
      <ConfigForm meta={this.meta} />
    );
  }
}

export default Form.create()(TableList);

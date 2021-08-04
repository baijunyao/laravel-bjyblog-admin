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
      key: '188',
      label: 'github',
      widget: Input,
      required: false,
    },
    {
      key: '189',
      label: 'gitee',
      widget: Input,
      required: false,
    },
    {
      key: '190',
      label: 'zhihu',
      widget: Input,
      required: false,
    },
    {
      key: '191',
      label: 'weibo',
      widget: Input,
      required: false,
    },
    {
      key: '192',
      label: 'upyun',
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

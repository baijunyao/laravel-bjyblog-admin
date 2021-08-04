import {
  Form,
  Input,
  Checkbox,
} from 'antd';
import React, { Component } from 'react';

import ConfigForm from '@/pages/admin/config/components/ConfigForm';
import { MetaType } from '@/components/FormBuilder';

class TableList extends Component {
  meta: MetaType[] = [
    {
      key: '164',
      label: 'Type',
      widget: Checkbox.Group,
      children: {
        widget: Checkbox,
        list: [
          {
            value: 'local',
            label: 'Local',
          },
          {
            value: 'oss',
            label: 'Aliyun OSS',
          },
        ],
      },
      required: true,
    },
    {
      key: '159',
      label: 'MySQL Dump Path',
      widget: Input,
      required: true,
    },
    {
      key: '160',
      label: 'Aliyun AccessKeyID',
      widget: Input,
      required: true,
    },
    {
      key: '161',
      label: 'Aliyun AccessKeySecret',
      widget: Input,
      required: true,
    },
    {
      key: '162',
      label: 'Aliyun BUCKET',
      widget: Input,
      required: true,
    },
    {
      key: '163',
      label: 'Aliyun ENDPOINT',
      widget: Input,
      required: true,
    },
  ];

  render() {
    return (
      <ConfigForm meta={this.meta} />
    );
  }
}

export default Form.create()(TableList);

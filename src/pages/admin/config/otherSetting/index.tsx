import {
  Form,
  Input,
  Radio,
} from 'antd';
import React, { Component } from 'react';

import ConfigForm from '@/pages/admin/config/components/ConfigForm';
import { MetaType } from '@/components/FormBuilder';

class TableList extends Component {
  meta: MetaType[] = [
    {
      key: '166',
      label: 'Language',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'en',
            label: 'English',
          },
          {
            value: 'fr',
            label: 'French',
          },
          {
            value: 'ru',
            label: 'Russian',
          },
          {
            value: 'zh-CN',
            label: 'Chinese(Simplified)',
          },
        ],
      },
      required: true,
    },
    {
      key: '195',
      label: 'Timezone',
      widget: Input,
      required: true,
    },
    {
      key: '171',
      label: 'Logo Style',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'true',
            label: 'Allow commercial',
          },
          {
            value: 'false',
            label: 'Only text',
          },
        ],
      },
      required: true,
    },
    {
      key: '117',
      label: 'ICP',
      widget: Input,
      required: true,
    },
    {
      key: '125',
      label: 'Default Author',
      widget: Input,
      required: true,
    },
    {
      key: '119',
      label: 'Article Copyright Word',
      widget: Input,
      required: true,
    },
    {
      key: '141',
      label: 'Image Alt Word',
      widget: Input,
      required: true,
    },
    {
      key: '107',
      label: 'Image Water Text',
      widget: Input,
      required: true,
    },
    {
      key: '110',
      label: 'Image Water Color',
      widget: Input,
      required: true,
    },
    {
      key: '128',
      label: 'Baidu Site URL',
      widget: Input,
      required: true,
    },
    {
      key: '123',
      label: 'Statistics Code',
      widget: Input,
      required: true,
    },
    {
      key: '118',
      label: 'Admin Email',
      widget: Input,
      required: true,
    },
    {
      key: '148',
      label: 'Notification Email',
      widget: Input,
      required: true,
    },
    {
      key: '158',
      label: 'Sentry DSN',
      widget: Input,
      required: true,
    },
    {
      key: '172',
      label: 'CDN Domain',
      widget: Input,
      required: true,
    },
    {
      key: '185',
      label: 'Cookie Domain',
      widget: Input,
      required: true,
    },
    {
      key: '193',
      label: 'Link Target',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: '_blank',
            label: 'New Tab',
          },
          {
            value: '_self',
            label: 'Current Tab',
          },
        ],
      },
      required: true,
    },
    {
      key: '194',
      label: 'Breadcrumb',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'true',
            label: 'Yes',
          },
          {
            value: 'false',
            label: 'No',
          },
        ],
      },
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

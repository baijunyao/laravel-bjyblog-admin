import {Form, Input, Modal, Radio} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { SiteType } from '@/pages/admin/site/index/data';
import { formatMessage } from 'umi-plugin-react/locale';

export type NewItem = Pick<SiteType, 'name' | 'description' | 'url' | 'sort' | 'audit'>

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: NewItem) => void;
  handleModalVisible: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title={formatMessage({ id: 'Add' })}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Name' })}>
        {form.getFieldDecorator('name', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Description' })}>
        {form.getFieldDecorator('description', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="URL">
        {form.getFieldDecorator('url', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Sort' })}>
        {form.getFieldDecorator('sort', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Audited' })}>
        {form.getFieldDecorator('audit', {
          rules: [{ required: true }],
          initialValue: 1,
        })(<Radio.Group>
          <Radio value={1}>{formatMessage({ id: 'Yes' })}</Radio>
          <Radio value={0}>{formatMessage({ id: 'No' })}</Radio>
        </Radio.Group>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

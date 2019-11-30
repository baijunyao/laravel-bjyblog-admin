import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from '@/pages/admin/category/index/data';

export type NewCategory = Pick<TableListItem, 'name' | 'keywords' | 'description'>

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: NewCategory) => void;
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
      title="新增分类"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="关键字">
        {form.getFieldDecorator('keywords', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('description', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

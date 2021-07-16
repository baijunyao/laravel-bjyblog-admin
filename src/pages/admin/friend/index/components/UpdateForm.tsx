import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { FriendType } from '@/pages/admin/friend/index/data';
import { formatMessage } from 'umi-plugin-react/locale';

export type UpdateItem = Pick<FriendType, 'id' | 'name' | 'url' | 'sort'>

const FormItem = Form.Item;

interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  handleUpdate: (fieldsValue: UpdateItem) => void;
  handleUpdateModalVisible: () => void;
  updateFormValues: UpdateItem;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const {
    updateModalVisible,
    form,
    handleUpdate,
    handleUpdateModalVisible,
    updateFormValues,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title={formatMessage({ id: 'Edit' })}
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      {form.getFieldDecorator('id', {
        rules: [{ required: true }],
        initialValue: updateFormValues.id,
      })(<Input type="hidden" />)}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Name' })}>
        {form.getFieldDecorator('name', {
          rules: [{ required: true }],
          initialValue: updateFormValues.name,
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="URL">
        {form.getFieldDecorator('url', {
          rules: [{ required: true }],
          initialValue: updateFormValues.url,
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Sort' })}>
        {form.getFieldDecorator('sort', {
          rules: [{ required: true }],
          initialValue: updateFormValues.sort,
        })(<Input />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
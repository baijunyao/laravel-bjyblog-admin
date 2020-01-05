import { Form, Input, Modal, Radio } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from '@/pages/admin/socialiteUser/index/data';

export type UpdateItem = Pick<TableListItem, 'id' | 'name' | 'email' | 'is_admin'>

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
      title="编辑"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      {form.getFieldDecorator('id', {
        rules: [{ required: true }],
        initialValue: updateFormValues.id,
      })(<Input type="hidden" />)}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true }],
          initialValue: updateFormValues.name,
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮件">
        {form.getFieldDecorator('email', {
          rules: [{ required: true }],
          initialValue: updateFormValues.email,
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理员">
        {form.getFieldDecorator('is_admin', {
          rules: [{ required: true }],
          initialValue: updateFormValues.is_admin,
        })(<Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);

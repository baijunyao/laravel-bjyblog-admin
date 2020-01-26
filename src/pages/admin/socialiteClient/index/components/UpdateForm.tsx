import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from '@/pages/admin/socialiteClient/index/data';

export type UpdateItem = Pick<TableListItem, 'id' | 'client_id' | 'client_secret'>

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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="client id">
        {form.getFieldDecorator('client_id', {
          rules: [{ required: true }],
          initialValue: updateFormValues.client_id,
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="client secret">
        {form.getFieldDecorator('client_secret', {
          rules: [{ required: true }],
          initialValue: updateFormValues.client_secret,
        })(<Input />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);

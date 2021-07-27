import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import collect from 'collect.js';
import FormBuilder, { FormBuilderPropType, MetaType } from '@/components/FormBuilder';
import { ModalModelState } from '@/models/modal';

interface ModalFormPropType extends FormBuilderPropType{
  dispatch: Dispatch;
  modal: ModalModelState;
}

export function handleUpdate(
  dispatch: Dispatch,
  meta: MetaType[],
  record: any,
  actionType: string,
) {
  meta.map(value => {
    const valueWithDefault: MetaType = value;
    valueWithDefault.initialValue = record[value.key];

    return valueWithDefault;
  })

  if (collect(meta).where('key', 'id').count() === 0) {
    meta.push({
      key: 'id',
      label: 'ID',
      required: false,
      widget: Input,
      initialValue: record.id,
      visibility: 'hidden',
    })
  }

  updateModalFormProps(
    dispatch,
    true,
    formatMessage({ id: 'Edit' }),
    meta,
    actionType,
  )
}

export function updateModalFormProps(
  dispatch: Dispatch,
  visible: boolean,
  title: string,
  meta: MetaType[],
  actionType: string,
) {
  dispatch({
    type: 'modal/update',
    payload: {
      title,
      visible,
      meta,
      actionType,
    },
  });
}

class ModalForm extends Component<ModalFormPropType> {
  okHandle = () => {
    const { dispatch, form, modal } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: modal.actionType,
        payload: fieldsValue,
      })

      updateModalFormProps(
        dispatch,
        false,
        modal.title,
        modal.meta,
        modal.actionType,
      );

      form.resetFields();
    });
  };

  cancelHandle = () => {
    const { dispatch, modal } = this.props;

    updateModalFormProps(
      dispatch,
      false,
      modal.title,
      modal.meta,
      modal.actionType,
    );
  }

  render() {
    const { modal } = this.props;

    return (
      <Modal
        title={modal.title}
        visible={modal.visible}
        onOk={this.okHandle}
        onCancel={this.cancelHandle}
      >
        <FormBuilder
          meta={modal.meta}
          // @ts-ignore
          form={this.props.form}
        />
      </Modal>
    );
  }
}

export default connect(
  (modal: { modal: ModalModelState }) => (modal),
)(Form.create<ModalFormPropType>()(ModalForm))

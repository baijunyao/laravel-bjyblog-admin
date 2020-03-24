import { Checkbox, Form, Input, Modal, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from '@/pages/admin/article/index/data';
import { StateType as Category } from '@/models/category'
import { StateType as Tag } from '@/models/tag'
import UploadOnImage from '@/components/UploadOnImage'
import Markdown from '@/components/Markdown'

export type NewItem = Pick<TableListItem, 'id' | 'category_id' | 'title' | 'slug' | 'author' | 'markdown' | 'description' | 'keywords' | 'cover'>

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: NewItem) => void;
  handleModalVisible: () => void;
  adminAndcategoryAndindex: Category;
  adminAndtagAndindex: Tag;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, adminAndcategoryAndindex, adminAndtagAndindex } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const { getFieldDecorator } = form;

  const CategorySelect = (categories: any) => {
    const options = categories.map((category: any) => <Option value={category.id}>{category.name}</Option>)
    return (
      <Select placeholder="请选择分类" style={{ width: '100%' }}>
        {options}
      </Select>
    )
  }

  const TagCheckbox = (tags: any) => {
    const checkboxes = tags.map((tag: any) => <Checkbox value={tag.id}>{tag.name}</Checkbox>)
    return (
      <Checkbox.Group>
        {checkboxes}
      </Checkbox.Group>
    )
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 20 },
    },
  };

  return (
    <Modal
      style={{ top: 0 }}
      width="300"
      centered={false}
      title="新增"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="分类"
      >
        {getFieldDecorator('category_id', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          CategorySelect(adminAndcategoryAndindex.data.list),
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="标题"
      >
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="作者"
      >
        {getFieldDecorator('author', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="关键字"
      >
        {getFieldDecorator('keywords', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="标签"
      >
        {getFieldDecorator('tag_ids', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          TagCheckbox(adminAndtagAndindex.data.list),
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="封面"
      >
        {getFieldDecorator('cover', {
          rules: [],
        })(
          <UploadOnImage action="/api/articleCover" />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="描述"
      >
        {getFieldDecorator('description', {
          rules: [],
        })(
          <TextArea />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="内容"
      >
        {getFieldDecorator('markdown', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Markdown antForm={form} />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="置顶"
      >
        {getFieldDecorator('is_top', {
          rules: [{ required: true }],
          initialValue: 0,
        })(<Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>)}
      </FormItem>

    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

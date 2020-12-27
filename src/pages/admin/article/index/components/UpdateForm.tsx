import { Checkbox, Form, Input, Modal, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from '@/pages/admin/article/index/data';
import { StateType as Category } from '@/models/category'
import { StateType as Tag } from '@/models/tag'
import UploadOnImage from '@/components/UploadOnImage'
import Markdown from '@/components/Markdown'
import { TableListItem as TagItem } from '@/pages/admin/tag/index/data'
import { formatMessage } from 'umi-plugin-react/locale';

export type UpdateItem = Pick<TableListItem, 'id' | 'category_id' | 'title' | 'slug' | 'author' | 'markdown' | 'description' | 'keywords' | 'cover' | 'is_top' | 'category' | 'tags'>

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  handleUpdate: (fieldsValue: UpdateItem) => void;
  updateFormValues: UpdateItem;
  handleUpdateModalVisible: () => void;
  adminAndcategoryAndindex: Category;
  adminAndtagAndindex: Tag;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const { updateModalVisible, form, handleUpdate, handleUpdateModalVisible, updateFormValues, adminAndcategoryAndindex, adminAndtagAndindex } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      fieldsValue.id = updateFormValues.id;
      handleUpdate(fieldsValue);
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

  const tagIds:[] = [];
  updateFormValues.tags.forEach((tag:TagItem) => {
    tagIds.push(tag.id);
  })

  return (
    <Modal
      style={{ top: 0 }}
      width="300"
      centered={false}
      title={formatMessage({ id: 'Add' })}
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Category' })}
      >
        {getFieldDecorator('category_id', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: updateFormValues.category_id,
        })(
          CategorySelect(adminAndcategoryAndindex.data.list),
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Title' })}
      >
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: updateFormValues.title,
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Author' })}
      >
        {getFieldDecorator('author', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: updateFormValues.author,
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Keywords' })}
      >
        {getFieldDecorator('keywords', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: updateFormValues.keywords,
        })(
          <Input />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Tag' })}
      >
        {getFieldDecorator('tag_ids', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: tagIds,
        })(
          TagCheckbox(adminAndtagAndindex.data.list),
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Cover' })}
      >
        {getFieldDecorator('cover', {
          rules: [],
          initialValue: updateFormValues.cover,
        })(
          <UploadOnImage action="/api/articleImages" imageUrl={updateFormValues.cover} />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Description' })}
      >
        {getFieldDecorator('description', {
          rules: [],
          initialValue: updateFormValues.description,
        })(
          <TextArea />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Content' })}
      >
        {getFieldDecorator('markdown', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: updateFormValues.markdown,
        })(
          <Markdown antForm={form} value={updateFormValues.markdown} />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label={formatMessage({ id: 'Topping' })}
      >
        {getFieldDecorator('is_top', {
          rules: [{ required: true }],
          initialValue: updateFormValues.is_top,
        })(<Radio.Group>
          <Radio value={1}>{formatMessage({ id: 'Yes' })}</Radio>
          <Radio value={0}>{formatMessage({ id: 'No' })}</Radio>
        </Radio.Group>)}
      </FormItem>

    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);

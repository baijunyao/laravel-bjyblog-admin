import { Button, Card, Form, Input, Radio } from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ArticleType } from '@/models/data.d';
import ArticleTags from '@/components/ArticleTags';
import ArticleCategories from '@/components/ArticleCategories';
import { CategoryStateType } from '@/models/category';
import { ArticleStateType } from '@/models/article';
import Markdown from "@/components/Markdown";
import UploadOnImage from "@/components/UploadOnImage";

const FormItem = Form.Item;
const { TextArea } = Input;

interface ArticleEditPageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminArticle/add'
    >
  >;
  article: ArticleType;
  adminCategory: CategoryStateType;
}

@connect(
  ({
     adminArticle,
  }: {
    adminArticle: ArticleStateType;
  }) => ({
    article: adminArticle.current_data,
  }),
)
class EditPage extends Component<ArticleEditPageProps> {
  constructor(props: ArticleEditPageProps) {
    super(props);

    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleStore = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'adminArticle/add',
      payload: this.props.form.getFieldsValue(),
    });
  };

  handleTagChange(checkedTagIds: number[]) {
    this.props.form.setFieldsValue({
      tag_ids: checkedTagIds,
    });
  }

  handleCategoryChange(selectedCategoryId: number) {

    this.props.form.setFieldsValue({
      category_id: selectedCategoryId,
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

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
      <PageHeaderWrapper>
        <Card bordered={false}>
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
            })(
              <ArticleCategories onCategoryChange={this.handleCategoryChange}/>,
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
            })(
              <Input />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Tag' })}
          >
            {getFieldDecorator('tag_ids', {
              rules: [],
            })(
              <ArticleTags onTagsChange={this.handleTagChange} />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Cover' })}
          >
            {getFieldDecorator('cover', {
              rules: [],
            })(
              <UploadOnImage action="/api/articleImages" />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Description' })}
          >
            {getFieldDecorator('description', {
              rules: [],
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
            })(
              <Markdown antForm={form} />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Topping' })}
          >
            {getFieldDecorator('is_top', {
              rules: [{ required: true }],
            })(<Radio.Group>
              <Radio value={1}>{formatMessage({ id: 'Yes' })}</Radio>
              <Radio value={0}>{formatMessage({ id: 'No' })}</Radio>
            </Radio.Group>)}
          </FormItem>

          <Button type="primary" htmlType="submit" onClick={this.handleStore}>
            {formatMessage({ id: 'Submit' })}
          </Button>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<ArticleEditPageProps>()(EditPage);

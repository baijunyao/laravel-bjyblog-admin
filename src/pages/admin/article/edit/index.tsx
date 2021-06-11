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
import Markdown from '@/components/Markdown';
import UploadOnImage from '@/components/UploadOnImage';

const FormItem = Form.Item;
const { TextArea } = Input;

interface ArticleEditPageProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminArticle/show'
      | 'adminArticle/update'
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

  componentDidMount() {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'adminArticle/show',
      payload: match.params.id,
    });
  }

  handleUpdate = () => {
    const { dispatch, match } = this.props;
    const fieldsValue = { ...this.props.form.getFieldsValue(), id: match.params.id };

    dispatch({
      type: 'adminArticle/update',
      payload: fieldsValue,
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
      this.props.article &&
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
              initialValue: this.props.article.category_id,
            })(
              <ArticleCategories onCategoryChange={this.handleCategoryChange} selectedCategory={this.props.article.category}/>,
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
              initialValue: this.props.article.title,
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
              initialValue: this.props.article.author,
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
              initialValue: this.props.article.keywords,
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
              initialValue: this.props.article.tags.map(tag => tag.id),
            })(
              <ArticleTags checkedTags={this.props.article.tags} onTagsChange={this.handleTagChange} antForm={this.props.form} />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Cover' })}
          >
            {getFieldDecorator('cover', {
              rules: [],
              initialValue: this.props.article.cover,
            })(
              <UploadOnImage action="/api/articleImages" imageUrl={this.props.article.cover} />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Description' })}
          >
            {getFieldDecorator('description', {
              rules: [],
              initialValue: this.props.article.description,
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
              initialValue: this.props.article.markdown,
            })(
              <Markdown antForm={form} value={this.props.article.markdown}/>,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Topping' })}
          >
            {getFieldDecorator('is_top', {
              rules: [{ required: true }],
              initialValue: this.props.article.is_top,
            })(<Radio.Group>
              <Radio value={1}>{formatMessage({ id: 'Yes' })}</Radio>
              <Radio value={0}>{formatMessage({ id: 'No' })}</Radio>
            </Radio.Group>)}
          </FormItem>

          <FormItem style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" onClick={this.handleUpdate}>
              {formatMessage({ id: 'Submit' })}
            </Button>
          </FormItem>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<ArticleEditPageProps>()(EditPage);

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
import UploadImage from '@/components/UploadImage';
import { formItemLayout } from '@/pages/admin/global'

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
  handleStore = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'adminArticle/add',
      payload: this.props.form.getFieldsValue(),
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

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
              <ArticleCategories />,
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
              <ArticleTags />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={formatMessage({ id: 'Cover' })}
          >
            {getFieldDecorator('cover', {
              rules: [],
            })(
              <UploadImage apiUrl="/api/articleImages" />,
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
              <Markdown />,
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

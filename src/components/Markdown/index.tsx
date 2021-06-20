import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { getToken } from '@/utils/request';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleImageUpload(file: File): Promise<string> {
  return new Promise(resolve => {
    const formData = new FormData();
    formData.append('image', file);
    axios.post('/api/articleImages', formData, { headers: { Authorization: getToken() } })
      .then((response) => {
        console.log(response)
        resolve(response.data.url);
      });
  });
}

interface ArticleMarkdownPropType {
  value: string;
  onChange: (text: string) => void;
}
class ArticleMarkdown extends Component<ArticleMarkdownPropType> {
  handleEditorChange({ html, text }: {html: string, text: string}) {
    this.props.onChange(text)
  }

  render() {
    return <div>test</div>;
    return <MdEditor
      value={this.props.value}
      renderHTML={text => mdParser.render(text)}
      onChange={this.handleEditorChange}
      onImageUpload={handleImageUpload}
    />
  }
}

export default ArticleMarkdown;

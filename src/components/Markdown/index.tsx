// import react, react-markdown-editor-lite, and a markdown parser you like
import * as React from 'react'
import { getToken } from '@/utils/request';
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';

const mdParser = new MarkdownIt(/* Markdown-it options */);

let antForm:any = {};

// Finish!
function handleEditorChange({ html, text }: any) {
  antForm.setFieldsValue({
    markdown: text,
  })
}

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

export default (props: any) => {
  antForm = props.antForm;

  return <MdEditor
    value={props.value}
    renderHTML={(text) => mdParser.render(text)}
    onChange={handleEditorChange}
    onImageUpload={handleImageUpload}
  />
}

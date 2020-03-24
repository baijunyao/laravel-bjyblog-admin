// import react, react-markdown-editor-lite, and a markdown parser you like
import * as React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

let antForm:any = {};

// Finish!
function handleEditorChange({ html, text }: any) {
  antForm.setFieldsValue({
    markdown: text,
  })
}
export default (props: any) => {
  antForm = props.antForm;

  return <MdEditor
    value={props.value}
    renderHTML={(text) => mdParser.render(text)}
    onChange={handleEditorChange}
  />
}

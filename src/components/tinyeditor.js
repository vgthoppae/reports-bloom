import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = ({ editorContent, setEditorContent, index, disabled }) => {
  const [editorState, setEditorState] = React.useState({
    content: editorContent,
  });

  const default_toolbars =
    'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent';

  const handleChange = (content, editor) => {
    setEditorState({ content });
    if (!disabled) setEditorContent(content, index);
  };

  const toolbars = () => {
    return disabled ? '' : default_toolbars;
  };

  useEffect(() => {
    setEditorState({ content: editorContent });
  }, [editorContent]);

  return (
    <Editor
      disabled={disabled}
      value={editorState.content}
      apiKey="usfmcpsopjvlqf4ck8v2nove0n9qvp9ycj3dr82qdxmhx6mi"
      init={{
        height: 200,
        menubar: false,
      }}
      toolbar={toolbars()}
      onEditorChange={handleChange}
    />
  );
};

export default TinyEditor;

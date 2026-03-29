import { useRef } from 'react';
// 1. Import đúng chuẩn
import { Editor } from '@tinymce/tinymce-react';

export default function App() {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey='g7698wge1gl86j024v4q43z679ywanepr3odcn8nc1pnnknn' // Thay bằng API Key lấy từ trang chủ TinyMCE
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Chào mừng bạn đến với TinyMCE!</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>In nội dung ra Console</button>
    </>
  );
}
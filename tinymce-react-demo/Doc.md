# TinyMCE ( Chỉ miễn phí cho tới ngày 12 tháng 4)

- TinyMCE là một văn bản đa định dạng cho phép người dùng tạo ra nội dung được formatted trong 1 UI thân thiện với người dùng.

- **Output**: TinyMCE tạo ra HTML5 và hỗ trợ nhiều content element khác nhau như list, table, hoặc tuỳ chọn định dạng khác.

## Basics Setup

**4 tuỳ chọn cấu hình phổ biến nhất cho TinyMCE là**

- Selector configuration
- The Plugin configuartion
- The toolbar configuration
- The menu and menu Bar configuration

## Cách cài đặt

**Sử dụng React SWC và Vite**

1. Use Vite and React SWC to create a new React project named tinymce-react-demo.

```terminal
npm create vite@5 tinymce-react-demo -- --template react-swc
```

2. Navigate to the project directory and install @tinymce/tinymce-react

```terminal
cd tinymce-react-demo && npm install @tinymce/tinymce-react
```

3. Update App.jsx to include Editor from tinymce/tinymce-react as below.

```javascript
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./App.css";

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
        apiKey="no-api-key"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
```

4. Update the _apiKey_ prop with your <a href="https://www.tiny.cloud/my-account/integrate/react/">Tiny Cloud API key.</a>
5. Run the development server to test the application:

```terminal
npm run dev
```

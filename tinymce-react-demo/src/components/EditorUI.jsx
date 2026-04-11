import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorUI({ selectedForm, onBack, onSave, loading }) {
  const editorRef = useRef(null);

  // Hàm cục bộ để lấy data từ Editor rồi truyền ngược ra ngoài
  const handleSaveClick = () => {
    if (editorRef.current) {
      const updatedHTML = editorRef.current.getContent();
      onSave(updatedHTML); // Gọi hàm onSave được truyền từ App.jsx vào
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>Đang chỉnh sửa: {selectedForm.id}</h2>
        <div>
          <button onClick={onBack} style={{ marginRight: '10px', padding: '10px' }}>
            Quay lại
          </button>
          <button 
            onClick={handleSaveClick} 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            {loading ? 'Đang lưu...' : '💾 Lưu Thay Đổi'}
          </button>
        </div>
      </div>

      <Editor
        apiKey="g7698wge1gl86j024v4q43z679ywanepr3odcn8nc1pnnknn"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={selectedForm.content}
        init={{
          height: 600,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
}

EditorUI.propTypes = {
  selectedForm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
import { useState, useEffect } from 'react';
import { formApi } from './api/formApi';
import FormList from './components/formList';
import EditorUI from './components/EditorUI';
import './styles/App.css'

function App() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(false);

  // Khởi tạo: Lấy danh sách form
  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const data = await formApi.getAllForms();
      setForms(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách form:", error);
    }
  };

  // Xử lý khi click vào 1 form
  const handleSelectForm = async (formId) => {
    setLoading(true);
    try {
      const data = await formApi.getFormById(formId);
      setSelectedForm(data);
    } catch (error) {
      console.error("Lỗi lấy chi tiết form:", error);
      alert("Không thể tải form!");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi ấn Save từ Editor
  const handleSaveForm = async (updatedHTML) => {
    setLoading(true);
    try {
      await formApi.updateForm(selectedForm.id, updatedHTML);
      alert('Lưu thay đổi thành công! User hiện tại đã có thể thấy bản cập nhật.');
      setSelectedForm(null); // Quay lại màn hình list
    } catch (error) {
      console.error("Lỗi khi lưu form:", error);
      alert('Lỗi khi lưu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* CƠ CHẾ ĐIỀU HƯỚNG ĐƠN GIẢN */}
      {!selectedForm ? (
        <FormList 
          forms={forms} 
          onSelectForm={handleSelectForm} 
        />
      ) : (
        <EditorUI 
          selectedForm={selectedForm} 
          loading={loading}
          onBack={() => setSelectedForm(null)} 
          onSave={handleSaveForm} 
        />
      )}
    </div>
  );
}

export default App;
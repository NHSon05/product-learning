import './App.css'; // File CSS của bạn (nếu có)
import Document from './components/Document';

export default function App() {
  // const editorRef = useRef(null);
  // const [isSaving, setIsSaving] = useState(false);
  // const [message, setMessage] = useState("");

  // // HÀM QUAN TRỌNG NHẤT: Xử lý khi nhấn "Lưu thay đổi"
  // const handleSaveDataToFile = async () => {
  //   if (!editorRef.current) return;

  //   setMessage("");
  //   setIsSaving(true);

  //   try {
  //     // BƯỚC 1: Lấy toàn bộ nội dung HTML khách hàng đã điền
  //     const htmlContent = editorRef.current.getContent();
      
  //     console.log("Nội dung HTML đang được xử lý...");

  //     // BƯỚC 2: Chuyển đổi String HTML thành 1 File Object thực tế
  //     // Chúng ta sẽ đặt tên file có kèm timestamp để không bị trùng
  //     const fileName = `bien_ban_ban_giao_${Date.now()}.html`;
      
  //     // Tạo Blob từ htmlContent, định dạng là text/html
  //     const blob = new Blob([htmlContent], { type: 'text/html' });
      
  //     // Tạo File Object từ Blob
  //     const finalHtmlFile = new File([blob], fileName, { type: 'text/html' });

  //     console.log("Đã tạo file:", finalHtmlFile);

  //     // BƯỚC 3: Gửi File HTML sang Backend (Giả lập)
  //     // Dùng FormData để gửi file
  //     const formData = new FormData();
  //     formData.append('document', finalHtmlFile); // Key 'document' là key backend sẽ nhận
  //     formData.append('client_id', 'client123'); // Gửi kèm thông tin khác nếu cần

  //     // Giả lập gọi API tới backend
  //     console.log("Đang gửi file sang backend tại endpoint /api/save-document...");
  //     const response = await fetch('/api/save-document', {
  //       method: 'POST',
  //       body: formData, // FormData tự động set Header Content-Type
  //     });

  //     if (response.ok) {
  //       setMessage("🎉 Đã lưu biên bản thành công!");
  //     } else {
  //       setMessage("❌ Có lỗi xảy ra khi lưu trên hệ thống.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi Save:", error);
  //     setMessage("❌ Lỗi kỹ thuật. Vui lòng thử lại sau.");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  return (
    <div className="product-container">
      <Document/>
      {/* <h1>Biểu mẫu Biên bản bàn giao</h1> */}
      
      {/* Thông báo trạng thái cho khách hàng */}
      {/* {message && <div className={`status-message ${message.startsWith('❌') ? 'error' : 'success'}`}>{message}</div>} */}

      {/* <Editor
        apiKey='g7698wge1gl86j024v4q43z679ywanepr3odcn8nc1pnnknn' // ⚠️ Bạn ĐÃ lấy và gắn API KEY chưa? 
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={bienBanTemplate} // NẠP MẪU BIỂU MẪU LÚC KHỞI TẠO
        init={{
          height: 600,
          menubar: false,
          // Tối giản thanh công cụ cho người non-tech, chỉ để lại những thứ họ cần
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'preview', 'searchreplace', 'wordcount'],
          toolbar: 'undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | preview',
          content_style: 'body { font-family:Times New Roman,Times,serif; font-size:16px } .entry-field { color: blue; font-style: italic; }' // Giữ style cho chỗ cần điền
        }}
      /> */}

      {/* <div className="action-bar"> */}
        {/* Nút lưu được làm to, nổi bật, có icon */}
        {/* <button 
          className="save-button" 
          onClick={handleSaveDataToFile} 
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="loader"></span> Đang gửi...
            </>
          ) : (
            <>💾 Lưu thay đổi và xuất File</>
          )}
        </button> */}
      {/* </div> */}
    </div>
  );
}
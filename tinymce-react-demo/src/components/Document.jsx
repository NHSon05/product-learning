import { useRef, useState } from "react"
import { Editor } from '@tinymce/tinymce-react';
import bienBanTemplate from '../assets/bien_ban_ban_giao_template.html?raw'

export default function Document() {
    const editorRef = useRef(null)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("");    
    const [currentFileName, setCurrentFileName] = useState("")

    // HÀM QUAN TRỌNG NHẤT: Xử lý khi click Submit
    const handleSaveData = async() => {
        if (!editorRef.current) return;

        // setMessage("");
        setIsSaving(true);

        try {

            const rawContent = editorRef.current.getContent()

            const fullHtmlString = `
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Biên bản bàn giao</title>
        <style>
            /* Đặt toàn bộ CSS của biểu mẫu vào đây để file tải xuống vẫn giữ nguyên định dạng */
            body { font-family: 'Times New Roman', Times, serif; line-height: 1.5; }
            .form-container { width: 80%; max-width: 800px; margin: 20px auto; padding: 40px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; font-weight: bold; font-size: 1.2em; margin-bottom: 30px; }
            .entry-field { color: blue; font-style: italic; }
        </style>
    </head>
    <body>
        ${rawContent}
    </body>
</html>
                `;
            // Bước 1: Lấy toàn bộ file nội dung HTML khách hàng đã điền
            // const htmlContent = editorRef.current.getContent()
            
            console.log("Nội dung HTML đang được xử lý")
            // Bước 2: Chuyển đổi string HTML thành 1 File Object thực tế
            // TA sẽ đặt tên file có kèm timestamp để không bị trùng
            const fileName = currentFileName || `bien_ban_ban_giao_${Date.now()}.html`;

            // Tạo Blob từ htmlContent, định dạng là text/html
            const blob = new Blob([fullHtmlString], {type: 'text/html'})

            // Tạo file Object từ Blob
            const finalHtmlFile = new File([blob], fileName, {type: 'text/html'})

            console.log("Đã tạo file", finalHtmlFile);

            // Bước 3: Gửi file HTML sang Backend (Giả lập)
            // Dùng formData để gửi file
            const formData = new FormData()
            formData.append('document', finalHtmlFile)
            formData.append('client_id', 'client123')

            // Giả lập gọi API tới backend
            console.log("Đang gửi file sang backend")
            const response = await fetch('http://localhost:3000/api/save-document', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                const data = await response.json();
                setCurrentFileName(data.fileName);
                setMessage("Đã lưu biên bản thành công")
            } else {
                setMessage("Có lỗi xảy ra khi lưu trên hệ thống")
            }


        } catch (error) {
            console.log("Lỗi", error)
            setMessage("Lỗi kỹ thuật")
        } finally {
            setIsSaving(true)
        }
    }


    return (
        <div className="">
            <h1>Biểu mẫu biên bản bàn giao</h1>

            {/* Thông báo trạng thái cho khách hàmg */}
            {message && 
                <div className={`status-message ${message.startsWith('❌') ? 'error' : 'success'}`}>
                    {message}
                </div>
            }

            <Editor
                apiKey='g7698wge1gl86j024v4q43z679ywanepr3odcn8nc1pnnknn'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={bienBanTemplate} // NẠP MẪU BIỂU MẪU LÚC KHỞI TẠO
                init={{
                    height: 800,
                    menubar: true,
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'preview', 'searchreplace', 'wordcount'],
                    toolbar: 'undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | preview',
                    content_style: 'body { font-family:Times New Roman,Times,serif; font-size:16px } .entry-field { color: blue; font-style: italic; }' // Giữ style cho chỗ cần điền
                }}

            />
            {/* Nút lưu */}
            <button
                className="save-button"
                onClick={handleSaveData}
                disabled={isSaving}
            >
                {isSaving ? (
                    <>
                        <span className="loader">Đang gửi</span>
                    </>
                ) : (
                    <span>Lưu thay đổi và xuất file</span>
                )}
            </button>
        </div>
    )
}

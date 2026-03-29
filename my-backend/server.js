const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Cho phép React gọi API
app.use(cors());
// Cho phép backend đọc data dạng JSON
app.use(express.json());

// --- CẤU HÌNH NƠI LƯU FILE ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Cấu hình Multer: Quyết định lưu file ở đâu và tên gì
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Để update được, ta sẽ lấy tên file do React gửi lên.
    // Nếu React gửi file có tên đã tồn tại, nó sẽ TỰ ĐỘNG GHI ĐÈ (chính là Update).
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

// --- TẠO API ENDPOINT ---
// Chú ý: 'document' phải khớp đúng với tên biến trong formData.append('document', file) ở React
app.post('/api/save-document', upload.single('document'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Không tìm thấy file gửi lên!' });
    }

    console.log(`Đã lưu/update file: ${file.originalname}`);
    
    res.status(200).json({ 
      message: 'Lưu biểu mẫu thành công!', 
      fileName: file.originalname,
      path: `/uploads/${file.originalname}`
    });
  } catch (error) {
    console.error('Lỗi server:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra trên server.' });
  }
});

// Chạy server
app.listen(PORT, () => {
  console.log(`🚀 Backend đang chạy tại http://localhost:${PORT}`);
}); 
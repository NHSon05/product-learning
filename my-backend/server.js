const express = require('express');
const cors = require('cors');

// Nhúng file Routes vừa tạo
const formRoutes = require('./src/routes/formRoutes')

const app = express();

// Cấu hình cơ bản
app.use(cors());
app.use(express.json({ limit: '10mb' })); 

// Gắn Router: 
// Câu lệnh này có nghĩa là: "Bất kỳ URL nào bắt đầu bằng /api/forms, hãy giao cho formRoutes xử lý"
app.use('/api/forms', formRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server đang chạy tại http://localhost:${PORT}`);
});
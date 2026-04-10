const fs = require('fs');
const path = require('path');

// Lưu ý: Lùi lại 1 cấp thư mục ('../') vì file này đang nằm trong thư mục 'controllers'
const formsDir = path.join(__dirname, '../forms');

// Tạo sẵn thư mục và file mẫu nếu chưa có
if (!fs.existsSync(formsDir)) {
    fs.mkdirSync(formsDir);
    fs.writeFileSync(path.join(formsDir, 'don-xin-nghi-phep.html'), '<h1>Đơn Xin Nghỉ Phép</h1><p>Nội dung mẫu...</p>');
    fs.writeFileSync(path.join(formsDir, 'bao-cao-thang.html'), '<h1>Báo Cáo Tháng</h1><p>Nội dung báo cáo...</p>');
}

// Logic: Lấy danh sách form
const getAllForms = (req, res) => {
    fs.readdir(formsDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Lỗi đọc thư mục' });
        
        const forms = files
            .filter(file => file.endsWith('.html'))
            .map(file => ({
                id: file,
                name: file.replace('.html', '').replace(/-/g, ' ').toUpperCase()
            }));
        res.json(forms);
    });
};

// Logic: Lấy 1 form cụ thể
const getFormById = (req, res) => {
    const filePath = path.join(formsDir, req.params.id);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Không tìm thấy form' });
    
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ id: req.params.id, content: content });
};

// Logic: Cập nhật form
const updateForm = (req, res) => {
    const { htmlContent } = req.body;
    const filePath = path.join(formsDir, req.params.id);
    
    // Phòng thủ: Chặn nếu React gửi lên data rỗng
    if (typeof htmlContent === 'undefined') {
        return res.status(400).json({ error: 'Dữ liệu rỗng, không thể lưu!' });
    }

    try {
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        res.json({ message: 'Lưu thay đổi thành công!' });
    } catch (err) {
        console.error("Lỗi ghi file:", err);
        res.status(500).json({ error: 'Lỗi khi lưu file' });
    }
};

// Xuất các hàm ra để file khác có thể gọi
module.exports = {
    getAllForms,
    getFormById,
    updateForm
};
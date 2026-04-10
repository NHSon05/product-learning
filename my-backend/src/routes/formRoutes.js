const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController'); // Nhúng controller vào

// GET /api/forms/ -> Lấy danh sách
router.get('/', formController.getAllForms);

// GET /api/forms/:id -> Lấy chi tiết
router.get('/:id', formController.getFormById);

// PUT /api/forms/:id -> Cập nhật
router.put('/:id', formController.updateForm);

module.exports = router;
import PropTypes from 'prop-types';

export default function FormList({ forms, onSelectForm }) {
  return (
    <div>
      <h2>Quản Lý Biểu Mẫu (Admin)</h2>
      <p style={{ color: 'gray' }}>Chọn một biểu mẫu dưới đây để chỉnh sửa:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {forms.map((form) => (
          <button 
            key={form.id} 
            onClick={() => onSelectForm(form.id)}
            style={{ 
              padding: '15px', 
              fontSize: '16px', 
              cursor: 'pointer', 
              textAlign: 'left', 
              borderRadius: '5px', 
              border: '1px solid #ccc' 
            }}
          >
            📄 {form.name}
          </button>
        ))}
      </div>
    </div>
  );
}
FormList.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectForm: PropTypes.func.isRequired,
};
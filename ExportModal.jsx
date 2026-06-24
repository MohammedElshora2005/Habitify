import React, { useState } from 'react';

function ExportModal({ onExport, onClose }) {
  const [fileName, setFileName] = useState(`habits_backup_${new Date().toISOString().slice(0,10)}.json`);

  const handleExport = () => {
    if (fileName.trim()) {
      onExport(fileName.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📤 تصدير البيانات</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <label>اسم الملف:</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="أدخل اسم الملف..."
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleExport()}
          />
          <p className="modal-hint">📌 سيتم حفظ البيانات بصيغة JSON</p>
        </div>
        <div className="modal-footer">
          <button className="modal-cancel" onClick={onClose}>إلغاء</button>
          <button className="modal-confirm" onClick={handleExport}>تصدير ✅</button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
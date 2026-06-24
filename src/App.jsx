import React, { useState, useEffect } from 'react';
import HabitHeader from './components/HabitHeader';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import ExportModal from './components/ExportModal';
import './index.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // تحميل البيانات من LocalStorage عند بدء التطبيق
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // بيانات افتراضية إذا لم توجد بيانات محفوظة
      setHabits([
        { id: 1, name: "شرب 2 لتر ماء", days: [false, false, false, false, false, false, false] },
        { id: 2, name: "قراءة 10 صفحات", days: [false, false, false, false, false, false, false] },
        { id: 3, name: "تمرين رياضي", days: [false, false, false, false, false, false, false] }
      ]);
    }
    
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // حفظ البيانات عند التغيير
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  // تبديل حالة اليوم
  const toggleDay = (habitId, dayIndex) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const updatedDays = [...habit.days];
          updatedDays[dayIndex] = !updatedDays[dayIndex];
          return { ...habit, days: updatedDays };
        }
        return habit;
      })
    );
  };

  // إضافة عادة جديدة
  const addHabit = (name) => {
    if (name.trim() === '') return;
    const newHabit = {
      id: Date.now(),
      name: name.trim(),
      days: [false, false, false, false, false, false, false]
    };
    setHabits([...habits, newHabit]);
  };

  // حذف عادة
  const deleteHabit = (habitId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه العادة؟')) {
      setHabits(habits.filter(habit => habit.id !== habitId));
    }
  };

  // إعادة ضبط كل التقدم
  const resetAllProgress = () => {
    if (window.confirm('هل أنت متأكد من إعادة ضبط كل التقدم؟')) {
      setHabits(habits.map(habit => ({
        ...habit,
        days: [false, false, false, false, false, false, false]
      })));
    }
  };

  // تصدير البيانات مع اسم مخصص
  const exportData = (fileName) => {
    const dataStr = JSON.stringify(habits, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
    setShowExportModal(false);
  };

  // استيراد البيانات
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedHabits = JSON.parse(e.target.result);
        if (Array.isArray(importedHabits) && importedHabits.length > 0) {
          setHabits(importedHabits);
          alert('✅ تم استيراد البيانات بنجاح!');
        }
      } catch (error) {
        alert('❌ خطأ في قراءة الملف');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="background-animation">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
        <div className="circle c4"></div>
        <div className="circle c5"></div>
      </div>

      <div className="app-content">
        <div className="app-header-actions">
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            title="تبديل الثيم"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="reset-btn" onClick={resetAllProgress} title="مسح كل التقدم">
            🔄 إعادة ضبط
          </button>
          <button className="export-btn" onClick={() => setShowExportModal(true)} title="تصدير البيانات">
            📤 تصدير
          </button>
          <label className="import-btn" title="استيراد بيانات">
            📥 استيراد
            <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
          </label>
        </div>

        <HabitHeader habits={habits} />
        <AddHabitForm onAddHabit={addHabit} />
        <HabitList 
          habits={habits} 
          onToggleDay={toggleDay} 
          onDeleteHabit={deleteHabit}
        />
      </div>

      {showExportModal && (
        <ExportModal 
          onExport={exportData} 
          onClose={() => setShowExportModal(false)} 
        />
      )}
    </div>
  );
}

export default App;

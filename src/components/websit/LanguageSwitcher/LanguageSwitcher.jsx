import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // تأكد من تحديث الكوكيز بعد تغيير اللغة
    document.cookie = `i18next=${lng}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 أيام
  };

  return (
    <div>
      <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

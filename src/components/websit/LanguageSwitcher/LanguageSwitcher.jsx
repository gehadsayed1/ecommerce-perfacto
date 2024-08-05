import React from 'react';
import { useTranslation } from 'react-i18next';
import css from './languageSwitcher.module.css'
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // تأكد من تحديث الكوكيز بعد تغيير اللغة
    document.cookie = `i18next=${lng}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 أيام
  };

  return (
    <div>
      <select className={css.selects} onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

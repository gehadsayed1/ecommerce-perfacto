import { useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import css from './interface.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../../pages/websit/imgWed/Perfecto New.png'
export default function InterFase() {
    const [selectedCountry, setSelectedCountry] = useState('');
const {t} = useTranslation()
  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const countries = [
    // الدول العربية
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'EG', name: 'Egypt' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LY', name: 'Libya' },
    { code: 'MA', name: 'Morocco' },
    { code: 'OM', name: 'Oman' },
    { code: 'QA', name: 'Qatar' },
    { code: 'SY', name: 'Syria' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'YE', name: 'Yemen' },
  
    // الدول الأجنبية الأساسية
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'AU', name: 'Australia' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'RU', name: 'Russia' },
  ];
  
      
  return (
    <div className={css.continer}>
      <img src={logo} className={css.logo} alt="" />
        <div className=' d-flex flex-column align-items-center'>
        <LanguageSwitcher/>
        <select id="country" className={css.selectCountry} value={selectedCountry} onChange={handleChange}>
        <option value="">{t('Select a country')}</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {t(`countries.${country.code}`)}
          </option>
        ))}
      </select>
     <Link to='/home'> <button className=' btn btn-outline-dark fw-bold fs-5 mt-5'>{t('Go')}</button></Link>
      </div>
      
    </div>
  )
}

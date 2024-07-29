// src/components/withDirection.js
import React, { useEffect, useState } from 'react';
import stylesLTR from './styles-ltr.module.css';
import stylesRTL from './styles-rtl.module.css';

const withDirection = (WrappedComponent) => {
  return (props) => {
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
      const handleDirChange = () => {
        const dir = document.body.getAttribute('dir');
        setIsRTL(dir === 'rtl');
      };

      handleDirChange(); // Call once on mount
      window.addEventListener('languageChanged', handleDirChange);

      return () => {
        window.removeEventListener('languageChanged', handleDirChange);
      };
    }, []);

    const styles = isRTL ? stylesRTL : stylesLTR;

    return <WrappedComponent {...props} styles={styles} />;
  };
};

export default withDirection;

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import TextChangeEffect from './TextChangeEffect';

const Footer: React.FC = () => {
        const { t } = useLanguage();
        const { darkMode } = useTheme();
    return (
        <footer className="footer">
            <TextChangeEffect text={t('footer.text')} />
            <br />
            <TextChangeEffect text={t('footer.rights')} />
        </footer>
    );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiInfo, FiFolder, FiMail } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();
    const { darkMode, toggleTheme } = useTheme();

    const getFlag = () => language === 'de'
        ? 'https://flagcdn.com/w40/gb.png'
        : 'https://flagcdn.com/w40/de.png';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return (
        <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <nav className="navbar-container">
                <ul className="navbar-links">
                    <li><Link to="/" className={`navbar-link`}><FiHome /> {t('navbar.home')}</Link></li>
                    <li><Link to="/about" className={`navbar-link`}><FiInfo /> {t('navbar.about')}</Link></li>
                    <li><Link to="/projects" className={`navbar-link`}><FiFolder /> {t('navbar.projects')}</Link></li>
                    <li><Link to="/contact" className={`navbar-link`}><FiMail /> {t('navbar.contact')}</Link></li>
                </ul>

                <div className="navbar-controls">
                    <img
                        src={getFlag()}
                        alt={language === 'de' ? 'Switch to English' : 'Wechsle zu Deutsch'}
                        className="navbar-flag"
                        onClick={toggleLanguage}
                    />
                    <button className="navbar-theme-toggle" onClick={toggleTheme}>
                        {darkMode ? '🌙' : '☀️'}
                    </button>

                    <button className="navbar-menu-button" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="mobile-menu">
                    <a><Link to="/">{t('navbar.home')}</Link></a>
                    <a><Link to="/about">{t('navbar.about')}</Link></a>
                    <a><Link to="/projects">{t('navbar.projects')}</Link></a>
                    <a><Link to="/contact">{t('navbar.contact')}</Link></a>
                </div>
            )}
        </header>
    );
};

export default Navbar;

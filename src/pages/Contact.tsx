import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext'; 
import TextChangeEffect from '../components/TextChangeEffect';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <main className="h-screen flex items-center justify-center">
            <section className="text-center px-6 md:px-12">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    <TextChangeEffect text={t('contact.title')} />
                </h1>

                <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6">
                    <TextChangeEffect text={t('contact.description')} />
                </p>

                <div className="flex justify-center space-x-4">
                    <a
                        href="https://www.linkedin.com/in/tim-luca-taxis-205248277/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                    >
                        <FaLinkedin />
                        <TextChangeEffect text={t('contact.linkedin')} />
                    </a>
                    
                    <a
                        href="https://github.com/timmyAtGithub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                    >
                        <FaGithub />
                        <TextChangeEffect text={t('contact.github')} />
                    </a>

                    <a
                        href="mailto:timlucataxis@gmail.com"
                        className="button"
                    >
                        <FaEnvelope />
                        <TextChangeEffect text={t('contact.email')} />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Contact;
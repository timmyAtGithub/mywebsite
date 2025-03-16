import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext'; 
import TextChangeEffect from '../components/TextChangeEffect';

const Home: React.FC = () => {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <main className={`h-screen flex items-center justify-center`}>
            
            <section className="text-center px-6 md:px-12">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    <TextChangeEffect text={t('hero.title')} />
                </h1>

                <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6">
                    <TextChangeEffect text={t('hero.description')} />
                </p>

                <div className="flex justify-center space-x-4">
  <a href="/projects" className="button">
    <TextChangeEffect text={t('hero.projectsButton')} />
  </a>
</div>

            </section>
        </main>
    );
};

export default Home;
import React, { createContext, useContext, useState, ReactNode } from 'react';
import de from '../locales/de.json';
import en from '../locales/en.json';

type Language = 'de' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
    triggerEffect: boolean; 
    setTriggerEffect: (value: boolean) => void; 
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('de');
    const [triggerEffect, setTriggerEffect] = useState(false); 

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'de' ? 'en' : 'de'));
        setTriggerEffect(true); 
    };

    const translations = language === 'de' ? de : en;

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations;

        for (const k of keys) {
            value = value[k];
            if (value === undefined) return key;
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, triggerEffect, setTriggerEffect }}>
            {children}
        </LanguageContext.Provider>
    );
};

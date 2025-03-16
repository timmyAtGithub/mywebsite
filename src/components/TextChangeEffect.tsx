import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

interface TextChangeEffectProps {
    text: string;
    className?: string;
}

const TextChangeEffect: React.FC<TextChangeEffectProps> = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const { triggerEffect, setTriggerEffect } = useLanguage();

    useEffect(() => {
        if (triggerEffect) {
            const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
            const lines = text.split('\n');
            let currentLines = lines.map(() => "");
            const maxLength = Math.max(...lines.map(line => line.length));

            const animateLines = () => {
                let iteration = 0;
                const animate = () => {
                    const newLines = lines.map(line =>
                        line.split('').map((char, index) => {
                          if (index < iteration) return char;
                          if (char === " ") return " ";
                          return chars[Math.floor(Math.random() * chars.length)];
                        }).join('')
                      );

                    setDisplayText(newLines.join('\n'));

                    if (iteration < maxLength) {
                        iteration++;
                        setTimeout(animate, 25);
                    } else {
                        setDisplayText(text);
                        setTriggerEffect(false);
                    }
                };

                animate();
            };

            animateLines();
        }
    }, [text, triggerEffect, setTriggerEffect]);

    return (
        <span 
            className={`${className} whitespace-pre-line`} 
            style={{ 
                display: 'inline-block', 
                width: 'auto',
                maxWidth: '100%'
            }}
        >
            {displayText}
        </span>
    );
};

export default TextChangeEffect;
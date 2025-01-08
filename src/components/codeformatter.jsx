import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

const CodePrettier = ({ code }) => {
    const [formattedCode, setFormattedCode] = useState('');
    const [isBeautifierLoaded, setIsBeautifierLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-html.min.js';
        script.async = true;
        script.onload = () => setIsBeautifierLoaded(true);
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const detectLanguage = (content) => {
        try {
            JSON.parse(content);
            return 'json';
        } catch {}

        if (content.trim().startsWith('<') && content.trim().endsWith('>')) {
            return 'markup';
        }

        if (content.includes('{') && content.includes('}') && 
            (content.includes(':') || content.includes('@media'))) {
            return 'css';
        }

        return 'javascript';
    };

    const applyCustomStyling = (html) => {
        if (!html) return '';

        return html
            .replace(/<span class="token tag">/g, '<span class="text-blue-400">')
            .replace(/<span class="token punctuation">/g, '<span class="text-gray-400">')
            .replace(/<span class="token attr-name">/g, '<span class="text-sky-300">')
            .replace(/<span class="token attr-value">/g, '<span class="text-orange-300">')
            .replace(/<span class="token string">/g, '<span class="text-orange-300">')
            .replace(/<span class="token number">/g, '<span class="text-purple-300">')
            .replace(/<span class="token keyword">/g, '<span class="text-purple-400">')
            .replace(/<span class="token property">/g, '<span class="text-teal-300">')
            .replace(/<span class="token comment">/g, '<span class="text-gray-500">')
            .replace(/<span class="token operator">/g, '<span class="text-yellow-300">');
    };

    useEffect(() => {
        if (!code) {
            setFormattedCode('');
            return;
        }

        const language = detectLanguage(code);
        try {
            let formatted = code;
            switch (language) {
                case 'json':
                    const parsed = JSON.parse(code);
                    formatted = JSON.stringify(parsed, null, 2);
                    break;
                case 'markup':
                    if (isBeautifierLoaded && window.html_beautify) {
                        formatted = window.html_beautify(code, {
                            indent_size: 2,
                            wrap_line_length: 80,
                            preserve_newlines: true,
                            max_preserve_newlines: 2
                        });
                    }
                    break;
                case 'css':
                    formatted = code.replace(/\{/g, ' {\n  ')
                                  .replace(/;/g, ';\n  ')
                                  .replace(/}/g, '\n}\n')
                                  .replace(/\s+/g, ' ')
                                  .trim();
                    break;
                default:
                    formatted = code.replace(/\{/g, ' {\n  ')
                                  .replace(/;/g, ';\n  ')
                                  .replace(/}/g, '\n}\n')
                                  .replace(/\s+/g, ' ')
                                  .trim();
            }

            const highlighted = Prism.highlight(
                formatted,
                Prism.languages[language],
                language
            );

            setFormattedCode(applyCustomStyling(highlighted));
        } catch (error) {
            console.error('Error formatting code:', error);
            setFormattedCode(code);
        }
    }, [code, isBeautifierLoaded]);

    return (
        <div>
            <pre className="p-4 text-sm font-mono">
                <code 
                    dangerouslySetInnerHTML={{ __html: formattedCode }}
                    className={`language-${detectLanguage(code)} leading-6`}
                />
            </pre>
        </div>
    );
};

export default CodePrettier;
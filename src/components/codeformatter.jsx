import { useEffect, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

const CodePrettier = ({ code }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-html.min.js';
        script.async = true;
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

        // Replace Prism's default color classes with Tailwind classes
        return html
            // HTML Tags
            .replace(/<span class="token tag">/g, '<span class="text-blue-400">')
            // Tag brackets
            .replace(/<span class="token punctuation">/g, '<span class="text-gray-400">')
            // Attributes
            .replace(/<span class="token attr-name">/g, '<span class="text-sky-300">')
            // Attribute values
            .replace(/<span class="token attr-value">/g, '<span class="text-orange-300">')
            // Strings
            .replace(/<span class="token string">/g, '<span class="text-orange-300">')
            // Numbers
            .replace(/<span class="token number">/g, '<span class="text-purple-300">')
            // Keywords
            .replace(/<span class="token keyword">/g, '<span class="text-purple-400">')
            // Properties
            .replace(/<span class="token property">/g, '<span class="text-teal-300">')
            // Comments
            .replace(/<span class="token comment">/g, '<span class="text-gray-500">')
            // Operators
            .replace(/<span class="token operator">/g, '<span class="text-yellow-300">');
    };

    const formatAndHighlight = useMemo(() => {
        if (!code) return '';
        const language = detectLanguage(code);
        try {
            let formatted = code;
            switch (language) {
                case 'json':
                    const parsed = JSON.parse(code);
                    formatted = JSON.stringify(parsed, null, 2);
                    break;
                case 'markup':
                    if (window.html_beautify) {
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

            // Apply syntax highlighting and custom styling
            const highlighted = Prism.highlight(
                formatted,
                Prism.languages[language],
                language
            );

            return applyCustomStyling(highlighted);
        } catch (error) {
            console.error('Error formatting code:', error);
            return code;
        }
    }, [code]);

    return (
        <div>
            <pre className="p-4 text-sm font-mono">
                <code 
                    dangerouslySetInnerHTML={{ __html: formatAndHighlight }}
                    className={`language-${detectLanguage(code)} leading-6`}
                />
            </pre>
        </div>
    );
};

export default CodePrettier;
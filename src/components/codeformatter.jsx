import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodePrettier = ({ code }) => {
    const [language, setLanguage] = useState('javascript');
    const [formattedCode, setFormattedCode] = useState('');

    const detectLanguage = (content) => {
        try {
            JSON.parse(content);
            return 'json';
        } catch {}

        if (content?.trim().startsWith('<') && content?.trim().endsWith('>')) {
            return 'html';
        }

        if (content?.includes('{') && content?.includes('}') && 
            (content?.includes(':') || content?.includes('@media'))) {
            return 'css';
        }

        return 'javascript';
    };

    const formatJSON = (jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 2);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return jsonString;
        }
    };

    const formatHTML = (htmlString) => {
        let formatted = htmlString.replace(/>\s*</g, '>\n<');
        formatted = formatted.replace(/(<.*?>)/g, (match) => {
            return match.replace(/\s+/g, ' ');
        });
        let indentLevel = 0;
        let result = '';
        formatted.split('\n').forEach(line => {
            line = line.trim();
            if (line.match(/<\/.*?>/)) {
                indentLevel--;
            }
            result += '  '.repeat(indentLevel) + line + '\n';
            if (line.match(/<.*?>/) && !line.match(/<\/.*>/) && !line.match(/\/>/)) {
                indentLevel++;
            }
        });
        return result.trim();
    };

    const formatCSS = (cssString) => {
        return cssString
            .replace(/\s*{\s*/g, ' {\n  ')
            .replace(/;\s*/g, ';\n  ')
            .replace(/\s*}\s*/g, '\n}\n')
            .replace(/\n\s*\n/g, '\n')
            .replace(/\s*:\s*/g, ': ')
            .replace(/\s*,\s*/g, ', ')
            .trim();
    };

    const formatJavaScript = (jsString) => {
        // This is a basic formatter. For more complex formatting,
        // consider using a library like prettier
        return jsString
            .replace(/{\s*/g, '{\n  ')
            .replace(/;\s*/g, ';\n  ')
            .replace(/}\s*/g, '\n}\n')
            .replace(/\s*,\s*/g, ', ')
            .replace(/\s*=\s*/g, ' = ')
            .replace(/\s*:\s*/g, ': ')
            .replace(/\n\s*\n/g, '\n')
            .trim();
    };

    useEffect(() => {
        if (!code) {
            setFormattedCode('');
            return;
        }

        const detectedLanguage = detectLanguage(code);
        setLanguage(detectedLanguage);

        let formatted;
        try {
            switch (detectedLanguage) {
                case 'json':
                    formatted = formatJSON(code);
                    break;
                case 'html':
                    formatted = formatHTML(code);
                    break;
                case 'css':
                    formatted = formatCSS(code);
                    break;
                case 'javascript':
                    formatted = formatJavaScript(code);
                    break;
                default:
                    formatted = code;
            }
        } catch (error) {
            console.error('Error formatting code:', error);
            formatted = code;
        }

        setFormattedCode(formatted);
    }, [code]);

    return (
        <div className="w-full h-full text-sm">
            <Editor
                height="100%"
                language={language}
                value={formattedCode}
                theme="vs-dark"
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    renderWhitespace: 'selection',
                    tabSize: 2,
                    wordWrap: 'on',
                    automaticLayout: true,
                    fontSize: 14,
                    fontFamily: 'monospace',
                    formatOnPaste: true,
                    formatOnType: true
                }}
            />
        </div>
    );
};

export default CodePrettier;
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodePrettier = ({ code, fileName }) => {
    const [language, setLanguage] = useState('javascript');
    const [formattedCode, setFormattedCode] = useState('');

    const getLanguageFromExtension = (fileName) => {
        if (!fileName) return null;
        
        const extension = fileName.toLowerCase().split('.').pop();
        const extensionMap = {
            // JavaScript
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            // HTML
            'html': 'html',
            'htm': 'html',
            'svg': 'html',
            // CSS
            'css': 'css',
            'scss': 'scss',
            'sass': 'scss',
            'less': 'less',
            // JSON
            'json': 'json',
            // Other common types
            'md': 'markdown',
            'py': 'python',
            'rb': 'ruby',
            'php': 'php',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'cs': 'csharp',
            'go': 'go',
            'rs': 'rust',
            'swift': 'swift',
            'kt': 'kotlin',
            'sql': 'sql',
            'yaml': 'yaml',
            'yml': 'yaml',
            'xml': 'xml',
        };
        
        return extensionMap[extension] || null;
    };

    const detectLanguage = (content, fileName) => {
        const fileExtensionLanguage = getLanguageFromExtension(fileName);
        if (fileExtensionLanguage) {
            return fileExtensionLanguage;
        }

        try {
            JSON.parse(content);
            return 'json';
        } catch {}

        if (content?.trim().startsWith('<') && content?.trim().endsWith('>')) {
            // Check for SVG specifically
            if (content.toLowerCase().includes('<svg')) {
                return 'html';
            }
            return 'html';
        }

        if (content?.includes('{') && content?.includes('}') && 
            (content?.includes(':') || content?.includes('@media'))) {
            if (content.includes('@media') || content.includes('@keyframes') || 
                !content.includes('function') && !content.includes('const ')) {
                return 'css';
            }
        }

        if (content?.includes('def ') || content?.includes('import ') && 
            content?.includes(':') && !content?.includes('{')) {
            return 'python';
        }

        if (content?.includes('def ') && content?.includes('end') && 
            !content?.includes('{')) {
            return 'ruby';
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
            result += '  '.repeat(Math.max(0, indentLevel)) + line + '\n';
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

    const formatCode = (codeString, lang) => {
        switch (lang) {
            case 'json':
                return formatJSON(codeString);
            case 'html':
                return formatHTML(codeString);
            case 'css':
            case 'scss':
            case 'less':
                return formatCSS(codeString);
            default:
                return codeString
                    .split('\n')
                    .map(line => line.trim())
                    .join('\n');
        }
    };

    useEffect(() => {
        if (!code) {
            setFormattedCode('');
            return;
        }

        const detectedLanguage = detectLanguage(code, fileName);
        setLanguage(detectedLanguage);

        try {
            const formatted = formatCode(code, detectedLanguage);
            setFormattedCode(formatted);
        } catch (error) {
            console.error('Error formatting code:', error);
            setFormattedCode(code);
        }
    }, [code, fileName]);

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
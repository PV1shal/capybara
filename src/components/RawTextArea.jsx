import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({bodyRawData, setBodyRawData}) => {
    const [language, setLanguage] = useState('javascript');

    const detectLanguage = (content) => {
        if (!content) return 'javascript';
        const trimmedContent = content.trim();
        
        try {
            JSON.parse(trimmedContent);
            return 'json';
        } catch {}
        
        if (trimmedContent.startsWith('<?xml') || 
            (trimmedContent.startsWith('<') && trimmedContent.endsWith('>') && trimmedContent.includes('</') && !trimmedContent.includes('<html'))) {
            return 'xml';
        }

        if (trimmedContent.startsWith('<') && trimmedContent.endsWith('>') && 
            (trimmedContent.includes('<html') || trimmedContent.includes('<!DOCTYPE html'))) {
            return 'html';
        }

        if (trimmedContent.includes('{') && trimmedContent.includes('}') && 
            (trimmedContent.includes(':') || trimmedContent.includes('@media'))) {
            return 'css';
        }
        return 'javascript';
    };
    

    const handleChange = (value) => {
        const detectedLanguage = detectLanguage(value);
        if (detectedLanguage !== language) {
            setLanguage(detectedLanguage);
        }
        setBodyRawData(value);
    };

    return (
        <div className="h-full">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                language={language}
                theme="vs-dark"
                onChange={handleChange}
                value={bodyRawData}
                options={{
                    autoIndent: true,
                    colorDecorators: true,
                    colorDecoratorsActivatedOn: "clickAndHover",
                    fontSize: 14,
                    fontFamily: 'monospace',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    renderWhitespace: 'selection',
                    tabSize: 2,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
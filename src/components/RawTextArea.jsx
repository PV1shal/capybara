import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
    const [language, setLanguage] = useState('javascript');

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

    const handleChange = (value) => {
        const detectedLanguage = detectLanguage(value);
        if (detectedLanguage !== language) {
            setLanguage(detectedLanguage);
        }
    };

    return (
        <div className="w-full h-full text-sm justify-center items-center">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                language={language}
                theme="vs-dark"
                onChange={handleChange}
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
                    automaticLayout: true
                }}
            />
        </div>
    );
};

export default CodeEditor;
const PreviewInjectFrameComponent = ({ body }) => {
  const customScrollbarCSS = `
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(107, 114, 128, 0.5);
        border-radius: 9999px;
        border: 2px solid transparent;
        background-clip: padding-box;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(107, 114, 128, 0.7);
    }
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
`;

  const iframeContent = `
        <html>
            <head>
                <style>${customScrollbarCSS}</style>
            </head>
            <body>
                ${body}
            </body>
        </html>`;

  return (
    <iframe
      srcDoc={iframeContent}
      className="w-full h-full border-none"
      sandbox="allow-same-origin"
      title="Preview"
    />
  );
};

export default PreviewInjectFrameComponent;

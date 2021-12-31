import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string | undefined;
  bundleStatus: string | undefined;
}
const html: string = `
        <html>
          <head>
            <style>
              html {
                background-color:#fff;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script>
              const handleError = (error) => {
                const root = document.querySelector("#root")
                root.style.color = "red"
                root.textContent = error
                console.error(error)
              };

              window.addEventListener("error",(event) => {
                event.preventDefault()
                handleError(event.error)
              })



              window.addEventListener("message",(event) => {
              try {
                Function(event.data)();   
              } catch (error) {
                handleError(error)
              }
              },false);
    
            </script>
          </body>
        </html>
      `;

const Preview: React.FC<PreviewProps> = ({ code, bundleStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        srcDoc={html}
        title="code-exec"
        sandbox="allow-scripts"
      ></iframe>
      {bundleStatus && <div className="preview-error">{bundleStatus}</div>}
    </div>
  );
};

export default Preview;

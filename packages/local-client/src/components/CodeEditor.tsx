import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue: string;
  changeInput(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  changeInput,
  initialValue,
}) => {
  const editorRef: any = useRef();

  const handleChange: OnMount = editor => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      changeInput(editor.getValue());
    });
  };

  const onFormat = () => {
    //   get current value;
    const unformatted = editorRef.current.getValue();
    // format the value;
    const format = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        singleQuote: false,
        semi: true,
        useTabs: true,
      })
      .replace(/\n$/, "");

    // Set the formatted value in editor
    editorRef.current.setValue(format);
  };

  return (
    <div className="code-editor">
      <button className="button is-primary is-small btn" onClick={onFormat}>
        Format
      </button>
      <MonacoEditor
        onMount={handleChange}
        value={initialValue}
        theme="vs-dark"
        height="100%"
        width="100%"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 20,
          fontFamily: "Poppins",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

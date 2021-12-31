import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { Cell } from "../state";
import { useAction } from "../hooks/useAction";
import "./texteditor.css";

interface TextEditorProps {
  cell: Cell;
}

const Texteditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useAction();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div>
      {editing ? (
        <div ref={editorRef} className="text-editor">
          <MDEditor
            value={cell.content}
            onChange={v => {
              updateCell(cell.id, v || "");
            }}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            setEditing(true);
          }}
          className="text-editor card"
        >
          <div className="card-content">
            <MDEditor.Markdown source={cell.content || "Click to Edit"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Texteditor;

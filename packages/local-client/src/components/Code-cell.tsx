import { Cell } from "../state";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useEffect } from "react";
import "./codecell.css";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

interface CodeCellProps {
  cell: Cell;
}

const Codecell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector(state => state.bundle?.[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(() => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, createBundle, cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            changeInput={value => {
              updateCell(cell.id, value);
            }}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundleStatus={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default Codecell;

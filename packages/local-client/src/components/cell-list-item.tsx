import { Cell } from "../state";
import ActionBar from "./ActionBar";
import Codecell from "./Code-cell";
import Texteditor from "./Texteditor";
import "./cellListItem.css";

interface CellListItemsProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemsProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <Codecell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <ActionBar id={cell.id} />
        <Texteditor cell={cell} />
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;

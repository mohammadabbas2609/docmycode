import { Fragment, useEffect } from "react";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./cell-list-item";
import "./cellList.css";

const CellList: React.FC = () => {
  const cells = useTypedSelector(state => {
    if (state.cells) {
      const {
        cells: { order, data },
      } = state;
      return order.map(id => data[id]);
    }
  });

  const { fetchCells } = useAction();
  useEffect(() => {
    fetchCells();

    // eslint-disable-next-line
  }, []);

  const renderedCells = cells?.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;

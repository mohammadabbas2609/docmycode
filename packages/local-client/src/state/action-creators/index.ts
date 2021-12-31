import { ActionType } from "../action-types";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Action,
} from "../actions";
import { CellTypes, DirectionTypes } from "../cell";
import { Dispatch } from "redux";
import { bundler } from "../../bundler";
import axios from "axios";
import { Cell, RootState } from "..";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id,
    },
  };
};

export const moveCell = (
  id: string,
  direction: DirectionTypes
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_STARTED,
      payload: {
        cellId,
      },
    });

    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_CREATED,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.FETCH_CELLS,
  });

  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");

    dispatch({
      type: ActionType.FETCH_CELLS_COMPLETE,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ActionType.FETCH_CELLS_ERROR,
      payload: error.message,
    });
  }
};

export const saveCells =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells: CellsData } = getState();
    if (CellsData) {
      const { data, order } = CellsData;

      const cells = order.map(id => data[id]);

      try {
        await axios.post("/cells", { cells });
      } catch (error: any) {
        dispatch({
          type: ActionType.SAVE_CELL_ERROR,
          payload: error.message,
        });
      }
    }
  };

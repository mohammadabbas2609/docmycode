export type CellTypes = "code" | "text";

export type DirectionTypes = "up" | "down";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

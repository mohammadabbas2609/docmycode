import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}
const router = express.Router();

export const createCellsRouter = (fileName: string, dirName: string) => {
  const fullPath = path.join(dirName + "/" + fileName);

  //@desc     Get All the Cells from the file
  //@route    GET /cells
  //@access   Public
  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  //@desc     Add a cell to file
  //@route    POST /cells
  //@access   Public
  router.post("/cells", async (req, res) => {
    //TODO: Take the list of cells from request object

    // TODO: Serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // TODO: Write the cells into the file

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};

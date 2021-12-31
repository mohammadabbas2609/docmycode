import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  fileName: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(express.json());

  if (useProxy) {
    app.use(createCellsRouter(fileName, dir));
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve(
      "@docmycode/local-client/build/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};

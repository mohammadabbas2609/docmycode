import { Command } from "commander";
import { serve } from "@docmycode/local-api";
import path from "path";
import chalk from "chalk";

const log = console.log;
const inProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file in browser for editing")
  .option("-p, --port <number>", "Port to run server on", "4005")

  .action(async (filename = "doc.js", options: { port: string }) => {
    try {
      await serve(
        parseInt(options.port),
        path.basename(filename),
        path.resolve(),
        !inProduction
      );

      log(
        chalk.blue(
          `Opened ${filename}. Navigate to ${chalk.magenta(
            `http://localhost:${options.port}`
          )} to edit the content.`
        )
      );
    } catch (error: any) {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${options.port} is already in use please try on some other port `
        );
      } else {
        console.error(error.message);
      }

      process.exit(1);
    }
  });

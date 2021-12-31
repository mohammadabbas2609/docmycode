import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: boolean = false;
export const bundler = async (rawCode: string) => {
  if (service === false) {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.14.1/esbuild.wasm",
    });
    service = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (error: any) {
    return {
      code: "",
      error: error.message,
    };
  }
};

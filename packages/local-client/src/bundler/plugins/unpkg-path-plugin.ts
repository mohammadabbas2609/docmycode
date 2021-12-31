import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root level entry file of "index.js"
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // Handle relative file in modules
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        const { href } = new URL(
          args.path,
          "https://unpkg.com" + args.resolveDir + "/"
        );

        return {
          path: href,
          namespace: "a",
        };
      });

      // Handle main file of module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};

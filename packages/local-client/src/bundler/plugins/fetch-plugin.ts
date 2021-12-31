import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import axios from "axios";

const fileCache = localForage.createInstance({
  name: "file-cache",
});




export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });
   
      build.onLoad({filter:/.*/},async (args:any) => {
        // Check to see if we have a already fetched a file
        const cacheResult =
          await fileCache.getItem<esbuild.OnLoadResult | null>(args.path);
  
        // and if it is return it immidiately from here
        if (cacheResult) {
          return cacheResult;
        }       
      })
      build.onLoad({filter:/.css$/},async (args:any) => {
        // Check to see if we have a already fetched a file
        const cacheResult =
          await fileCache.getItem<esbuild.OnLoadResult | null>(args.path);
  
        // and if it is return it immidiately from here
        if (cacheResult) {
          return cacheResult;
        }
  
        const { request, data } = await axios.get(args.path);
        
        const escaped = data.replace(/\n/g, '').replace(/"/g,'\\"').replace(/'/g,"\\'");
        const contents =
          `
            const style = document.createElement("style");
            style.innerText = '${escaped}';
            document.head.appendChild(style)
            `;
            
        // If fetched any file cached it for future
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
  
        await fileCache.setItem(args.path, result);

        return result;
        
      })

      build.onLoad({ filter: /.*$/ }, async (args: any) => {
        // Check to see if we have a already fetched a file
          const cacheResult =
          await fileCache.getItem<esbuild.OnLoadResult | null>(args.path);

        // and if it is return it immidiately from here
        if (cacheResult) {
           return cacheResult;
        }

        const { request, data } = await axios.get(args.path);

        // If fetched any file cached it for future
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents:data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};

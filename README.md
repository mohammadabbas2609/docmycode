# docmycode
> [CLI Tool for Code Documentation](https://www.npmjs.com/package/docmycode)
---
> [Tutorial](https://vimeo.com/661697363)
---
## Prerequesites
* NodeJS on local machine
---
## Installing and Running
```
npm install -g docmycode
docmycode serve
```
---
## Commands
```
# Starts the application in browser [PORT:4005] and creates the file in current directory doc.js for persistence 
docmycode serve
# Starts the application and serves the file mentioned in browser 
docmycode serve [filename]
# Starts the application on provided port otherwise PORT 4005 is default
docmycode serve -p [PORT] || docmycode serve --port [PORT]
```
---
## Features
* Can Create multiple blocks of text and code for interactive documentation
* All the Code blocks appeared are interconnected following DRY principle to avoid repetation of code
* Can Shuffle all blocks at preferred position
* Custom Function view() is given to display the result directly in window
* All the changes are persisted in the file doc.js [By default it can be changed]

## Tech Stack
* ReactJS: For UI
* Bulma CSS: For Styling
* Redux: For State Management
* Immer: For manupulating State
* Typescript: For type Safety
* MonacoEditor: For Code editor in Browser
* MD-Editor: For Markdown Editor
* Prettier: For code fomatting in editor
* esbuild-wasm: For code transpiling in Browser
* localforage: For handling indexedDB browser database
* express: For creating server
* Commander: For handling CLI
* lerna: For managing multiple packages

## Under The Hood
> Docmycode is lightweight CLI tool for documenting code.It make use of esbuild-wasm to bundle the users code as fast as possible in the browser,User can create dynamic      documentation using this tool.All the packages that are imported from NPM is cached to provide essential speed and performant experience.Also all the data is persisted locally on users hard drive so it could be shared with others.Apart from code it also provide markdown editor for documenting the code.

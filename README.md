# docmycode
> [Documentation Tool for Code](https://www.npmjs.com/package/docmycode)
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


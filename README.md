# Node_NLW04 :rocket:	
This repository contains the Node project made by me on rocketseat's NLW 04, with concepts from RestFull API, database and html / css frontend

## Comands to create a API from scratch
- Init
```
yarn init -y
```
- Dependency (micro framework, create routes, create the server, create midware): 
```
yarn add express 
```
- Typing library: 
```
yarn add @types/express
```
- Add typescript on project:
```
yarn add typescript -D
yarn tsc --init (starting typescript within the application)
```
- Translator for execution with javascript (extension):
```
yarn add ts-node-dev -D
```
- Add in package.json:
```
  "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```
- Run application with:
```
yarn dev
```

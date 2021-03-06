# Swag Labs UI Automation
If for any reason the testing gets stopt on the browser screen please refresh it using ctrl + f5
## Clone the repository
```
git clone "https://github.com/LuisZanella/SwagLabs_UI_TestCafe" "(your_folder_name)"
```
## How to run it
First you need to be sure to download all the node js dependencies:
> You will be requiered to have node js 12.x at least
```
npm i
```
```
npm test
```
## How to generate a report
Please execute the next commands in order to generate a report

```
 npm run test:json
```
```
 npm run report
```

You will find the general report in your local folder "root_folder/reports/index.html"

NOTE: You should keep ".json" files from your src/reporting/json


## Project Dependencies

This project has use the next npm dependencies:

- TypeScript (Apache 2.0)
```
npm i typescript
```
- ts-node (MIT License)
```
npm i ts-node
```
- Multiple Cucumber HTML Reporter (MIT License)
```
npm i multiple-cucumber-html-reporter
```
- testcafe-reporter-cucumber-json (MIT License)
```
npm i testcafe-reporter-cucumber-json
```
- faker
```
npm i @types/faker
```
```
npm i faker
```
- dotEnv
```
npm i dotenv
```
- Eslint (--dev Env)
```
npm i eslint --save-dev
```
```
npm install @typescript-eslint/eslint-plugin@latest --save-dev
```
```
npm install eslint-plugin-prettier@latest --save-dev
```
```
npm install eslint-plugin-import@latest --save-dev
```
```
npm install eslint-plugin-testcafe@latest --save-dev
```
```
npm i @typescript-eslint/parser --save-dev
```
```
npm i @typescript-eslint/eslint-plugin --save-dev
```
- Pritter
```
npm i prettier --save-dev
```
```
npm i @types/prettier --save-dev
```
- tsconfig-paths (MIT)
```
npm i tsconfig-paths
```
- eslint-import-resolver-alias
```
npm i eslint-import-resolver-alias
```
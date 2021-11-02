import * as path from 'path';
import 'tsconfig-paths/register';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const report = require('multiple-cucumber-html-reporter');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@config/testEnv.spec');

const projectName = path.basename(__dirname);
const projectVersion = process.env.npm_package_version;
const enviroment = process.env.ENV_URL;
const reportGenerationTime = new Date().toISOString();
const jsonReportDir = process.env.JSON_REPORT_PATH;

report.generate({
  customData: {
    data: [
      { label: 'Project', value: `${projectName}` },
      { label: 'Release', value: `${projectVersion}` },
      { label: 'Report Generation Time', value: `${reportGenerationTime}` },
      { label: 'Enviroment', value: `${enviroment}` },
    ],
    title: 'Run info',
  },
  disableLog: true,
  displayDuration: true,
  durationInMS: true,
  jsonDir: jsonReportDir,
  openReportInBrowser: true,
  reportName: 'Report Swag_Labs',
  reportPath: 'reports',
});

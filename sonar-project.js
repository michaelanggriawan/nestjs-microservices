// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.sources': '.',
      'sonar.inclusions': 'src/**', // Entry point of your code
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
);

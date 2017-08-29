jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

var testsContext = require.context(".", true, /.*\.spec\.js$/);
testsContext.keys().forEach(testsContext);
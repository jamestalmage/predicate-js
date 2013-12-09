var projectFiles = require('./projectFiles.js');
module.exports = function(config){
  config.set({
    basePath: './',
    frameworks: ['mocha'],
    reporters: ['progress','growl'],
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
    files:projectFiles.mergeFilesFor('source','test'),
    colors: true
  })
};

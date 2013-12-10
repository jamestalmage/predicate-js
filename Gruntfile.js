/**
 * Created by jamestalmage on 12/8/13.
 */
module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        port:9898,
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: 'karma.conf.js',
        port:9899
      }
    },
    jshint:{
      src:{
        options:{
          'laxcomma':true
        },
        src:['src/*.js']
      },
      unit:{
        options:{
          '-W030':true
        },
        src:['test/*.js']
      }
    }
  });

  grunt.registerTask('test_nolint',['karma:unit']);
  grunt.registerTask('lint',['jshint']);
  grunt.registerTask('test',['test_nolint','lint']);
  grunt.registerTask('autotest',['karma:unit_auto']);

};
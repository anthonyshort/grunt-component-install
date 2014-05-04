
module.exports = function(grunt) {

  grunt.task.loadTasks('../tasks')
  
  grunt.registerTask('default', [
    'componentinstall'
  ]);
  
  grunt.initConfig({
    componentinstall: {
      all: {
        src: ['./*']
      }
    }
  });
  
 };
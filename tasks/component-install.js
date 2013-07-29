var fs = require('fs');
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function(grunt) {
  grunt.registerMultiTask('componentinstall', function(){

    var options = this.options({
      dev: true,
      remotes: []
    });

    var done = this.async();
    var files = this.filesSrc.slice();

    function next() {
      if(!files.length) return done();
      var name = files.shift();
      if(!fs.existsSync(name + '/component.json')) return next();
      grunt.log.subhead(name);

      var child = spawn(__dirname + '/../node_modules/component/bin/component-install', [
        '--force',
        '--dev'
      ], {
        cwd: name
      });

      child.stdout.on('data', function(msg){
        msg = msg.toString().trim();
        if(msg != "") console.log(msg);
      });

      child.stderr.on('data', function(msg){
        grunt.log.error(msg.toString());
        done(false);
      });

      child.on('close', function(){
        next();
      });
    }

    next();
  });
};
var fs = require('fs');
var spawn = require('win-fork');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('componentinstall', function(){

    var options = this.options({
      dev: true,
      force: false,
      remotes: []
    });

    var done = this.async();
    var files = this.filesSrc.slice();

    function next() {
      if(!files.length) return done();
      var name = files.shift();
      var filepath = path.resolve(name);
      var bin = path.resolve(__dirname + '/../node_modules/component/bin/component-install');
      if(!fs.existsSync(name + '/component.json')) return next();
      grunt.log.subhead(name);
      var args = [];
      if (options.dev) args.push('--dev');
      if (options.force) args.push('--force');

      var child = spawn(bin, args, {
        stdio: 'inherit',
        cwd: name
      });

      child.on('data', function(msg){
        msg = msg.toString().trim();
        if(msg != "") console.log(msg);
      });

      child.on('error', function(msg){
        grunt.log.error(msg.toString());
        done(false);
      });

      child.on('close', function(code){
        if(code === 1) {
          return done(false);
        }
        next();
      });
    }
    next();
  });
};

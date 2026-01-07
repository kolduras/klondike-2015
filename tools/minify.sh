#!/usr/bin/env node

var ClosureCompiler = require('google-closure-compiler').compiler;
var cmdRegPack = require('regpack').cmdRegPack;
var fs = require('fs');
var path = require('path');

var argv = (function() {
    var opts = {};
    var opt;
    var re = /^--(\w+)=(.+)$/;
    var args = process.argv.slice(2);

    for (var i = 0; i < args.length; i++)
        if (opt = re.exec(args[i])) {
            opts[opt[1]] = opt[2];
        }
    return opts;
})();

var outStream;
var sourceFileName;

if (argv['in']) {
   sourceFileName = path.resolve(argv['in']);

  if (!fs.existsSync(sourceFileName)) {
    process.stderr.write('Input file not found');
    process.exit();
  }
}

if (argv['out']) {
  var destinationFileName = path.resolve(argv['out']);
  outStream = fs.createWriteStream(destinationFileName);
  
  if (!outStream) {
    outStream = process.stdout;
  }
}

var closureCompiler = new ClosureCompiler({
  charset: 'utf-8',
  third_party: true,
  compilation_level: 'SIMPLE_OPTIMIZATIONS',
  warning_level: 'QUIET',
  js: sourceFileName
});

closureCompiler.run(function(exitCode, stdOut, stdErr) {
  if (exitCode !== 0) {
    process.stderr.write(stdErr);
    process.exit(exitCode);
  }

  var packed = cmdRegPack(stdOut, {
    crushGainFactor: 1,
    crushLengthFactor: 0,
    crushCopiesFactor: 0
  });

  outStream.write(packed);
});


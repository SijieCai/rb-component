var babel = require("babel-core");
var sass = require('node-sass'); 
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var outputFileSync = require('output-file-sync');

function compileBabel(content, filename, destination, babelOptions) {
  babelOptions.filename = filename;
  content = content.replace("style.scss'", "style.css'");
  var result = babel.transform(content, babelOptions);
  outputFileSync(destination, result.code, {encoding: 'utf8'});
}

function compileSassToCss(content, filename, destination) {
  outputFileSync(destination, content, {encoding: 'utf8'});
  var result = sass.renderSync({
    data: content,
    outputStyle: 'expanded'
  });
  outputFileSync(destination.replace('.scss', '.css'), result.css, {encoding: 'utf8'});
}

function buildFile(filename, destination, babelOptions) {
  var content = fs.readFileSync(filename, {encoding: 'utf8'});
  var outputPath = path.join(destination, path.basename(filename));
  if(path.basename(filename) === 'doc.js') {
    return;
  }
  if (path.extname(filename) === '.js') {
    compileBabel(content, filename, outputPath, babelOptions);
  } else if(path.extname(filename) === '.css') {
    outputFileSync(outputPath, content, {encoding: 'utf8'});
  } else if(path.extname(filename) === '.scss') {
    compileSassToCss(content, filename, outputPath);
  } 
}

function buildFolder(folderPath, destination, babelOptions, firstFolder) {
  var stats = fs.statSync(folderPath);

  if (stats.isFile()) {
    buildFile(folderPath, destination, babelOptions);
  } else if (stats.isDirectory()) {
    var outputPath = firstFolder ? destination : path.join(destination, path.basename(folderPath));
    var files = fs.readdirSync(folderPath).map(file => path.join(folderPath, file));
    files.forEach(filename => buildFolder(filename, outputPath, babelOptions, false));
  }
}

function buildGlob(filesGlob, destination, babelOptions) {
  var files = glob.sync(filesGlob);
  if (!files.length) {
    files = [filesGlob];
  }
  files.forEach(filename => buildFolder(filename, destination, babelOptions, true));
}

var componentRoot = path.join(__dirname, 'src/');
var libRoot = path.join(__dirname, 'lib/');
buildGlob(componentRoot, libRoot, {});
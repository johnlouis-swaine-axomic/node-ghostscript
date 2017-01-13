var exec = require('child_process').exec,
    spawn = require('child_process').spawn;

var create = function() {
  return new gs();
};

var gs = function() {
  this.options = [];
  this._input = null;
};

gs.prototype.batch = function() {
  this.options.push('-dBATCH');
  return this;
};

gs.prototype.device = function(device) {
  device = device || 'jpeg';
  this.options.push('-sDEVICE=' + device);
  return this;
};

gs.prototype.exec = function(callback) {
  var self = this;

  if (!this._input) return callback("Please specify input");

  var args = this.options.concat([this._input]).join(' ');
  exec('gs ' + args, function(err, stdout, stderr) {
    callback(err, stdout, stderr);
  });
};

gs.prototype.writetostream = function(writestream, callback){
  var self = this,
      errorString = '';

  this.options.push('-sOutputFile=%stdout');
  this.options.push(this._input);

  var gsProcess = spawn('gs', this.options);

  gsProcess.stderr.on('data', function (data) {
    errorString += data;   
  });

  gsProcess.on('close', function (code) {
    if (code !== 0) {
      callback({msg: errorString, exitcode: code});
    } else {
      callback(null);
    }
  });

  gsProcess.stdout.pipe(writestream);
};

gs.prototype.input = function(file) {
  this._input = file;
  return this;
};

gs.prototype.jpegq = function(value) {
  value = value || 75;
  this.options.push('-dJPEGQ=' + value);
  return this;
}

gs.prototype.firstpage = function(value) {
  this.options.push('-dFirstPage#' + value);
  return this;
};

gs.prototype.lastpage = function(value) {
  this.options.push('-dLastPage#' + value);
  return this;
};

gs.prototype.aligntopixels = function(value) {
  this.options.push('-dAlignToPixels#' + value);
  return this;
};

gs.prototype.textalphabits = function(value) {
  this.options.push('-dTextAlphaBits#' + value);
  return this;
};

gs.prototype.gridfitt = function(value) {
  this.options.push('-dGridFitTT#' + value);
  return this;
};

gs.prototype.graphicsalphabits = function(value) {
  this.options.push('-dGraphicsAlphaBits#' + value);
  return this;
};

gs.prototype.epscrop = function() {
  this.options.push('-dEPSCrop');
  return this;
}

gs.prototype.epsfitpage = function() {
  this.options.push('-dEPSFitPage');
  return this;
}

gs.prototype.translate = function(x, y) {
    this.options.push(x+' '+y+' translate');
    return this;
}

gs.prototype.usecropbox = function() {
  this.options.push('-dUseCropBox');
  return this;
}

gs.prototype.nopause = function() {
  this.options.push('-dNOPAUSE');
  return this;
}

gs.prototype.safer = function() {
  this.options.push('-dSAFER');
  return this;
};

gs.prototype.output = function(file) {
  file = file || '-';
  this.options.push('-sOutputFile=' + file);
  if (file === '-') return this.quiet();
  return this;
};

gs.prototype.q = gs.prototype.quiet;

gs.prototype.quiet = function() {
  this.options.push('-dQUIET');
  return this;
};

gs.prototype.g = function(xres, yres) {
  this.options.push('-g' + xres + (yres ? 'x' + yres : ''));
  return this;
};

gs.prototype.resolution = function(xres, yres) {
  this.options.push('-r' + xres + (yres ? 'x' + yres : ''));
  return this;
};

gs.prototype.r = gs.prototype.res = gs.prototype.resolution;

module.exports = create;

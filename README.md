# node-ghostscript

Wrapper for ghostscript in node.js.

## Install

    npm install https://github.com/musubu/node-ghostscript/tarball/master

## Usage

    var gs = require('ghostscript');

    gs()
      .batch()
      .quiet()
      .nopause()
      .device('jpeg')
      .input('./test.pdf')
      .output('./test-%d.jpg')
      .r(144)
      .jpegq(90)
      .exec(function(err, stdout, stderr) {
        if (!err) {
          console.log(stdout);
        } else {
          console.log(err);
        }
      });

    // OR
      .writetostream(writeableStream, function(err) {
        if (!err) {
          console.log(success);
          //dostuff with write stream
        } else {
          console.log(err);
        }
      });

## API

* `batch`
* `device`
* `exec`
* `input`
* `jpegq`
* `nopause`
* `output`
* `r`
* `quiet`
* `firstpage`
* `lastpage`
* `aligntopixels`
* `textalphabits`
* `graphicsalphabits`
* `epscrop`
* `usecropbox`
* `gridfitt`
* `gridfitt`
* `writetostream`

## Test

To run test, do:

    make test


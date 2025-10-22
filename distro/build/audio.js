const assert = require('assert');
const fs = require('fs');
const { asyncEachSeries, asyncSeries } = require('glov-async');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath)

const ASSETDIR = __dirname + '/../../assets';
const AUDIODIR = ASSETDIR + '/audio/';

let OUTDIR = __dirname + '/../out';

function mkdir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

mkdir(OUTDIR);
OUTDIR += '/audio';
mkdir(OUTDIR);
mkdir(OUTDIR + '/ogg');
mkdir(OUTDIR + '/ogg/sfx');
mkdir(OUTDIR + '/ogg/music');
mkdir(OUTDIR + '/mp3');
mkdir(OUTDIR + '/mp3/sfx');
mkdir(OUTDIR + '/mp3/music');

let users = fs.readdirSync(AUDIODIR);

function isAudioFile(filename) {
  let ext = filename.toLowerCase().split('.').pop();
  return ['wav', 'ogg', 'mp3'].includes(ext);
}

let todo = [];

users.forEach(function (username) {
  let userdir = AUDIODIR + username;
  let userroot = fs.readdirSync(userdir);
  let sfx = [];
  let music = [];
  userroot.forEach(function (filename) {
    if (isAudioFile(filename)) {
      sfx.push(filename);
    } else {
      let subfiles = fs.readdirSync(`${userdir}/${filename}`);
      subfiles.forEach(function (subname) {
        if (subname.endsWith('.mid')) {
          // ignored
        } else {
          assert(isAudioFile(subname), userdir + '/' + subname);
          (filename.match(/music/i) ? music : sfx).push(`${filename}/${subname}`);
        }
      });
    }
  });


  sfx.forEach(function (filename) {
    let filename_no_ext = filename.match(/([^/]+)\.\w+$/)[1];
    todo.push({
      src: `${userdir}/${filename}`,
      dest: `sfx/${filename_no_ext}`,
    });
  });
  music.forEach(function (filename) {
    let filename_no_ext = filename.match(/([^/]+)\.\w+$/)[1];
    todo.push({
      src: `${userdir}/${filename}`,
      dest: `music/${filename_no_ext}`,
    });
  });
});

asyncSeries([
  function (next) {
    let did_output = {};
    asyncEachSeries(todo, function (elem, next) {
      console.log(elem.src.slice(AUDIODIR.length));
      let src_ext = elem.src.split('.').pop().toLowerCase();

      if (src_ext === 'ogg' || src_ext === 'mp3') {
        // Copy source file as-is
        let copy_target = `${src_ext}/${elem.dest}.${src_ext}`;
        assert(!did_output[copy_target], copy_target + ' output twice');
        did_output[copy_target] = true;
        fs.cpSync(elem.src, `${OUTDIR}/${copy_target}`);
      }

      asyncSeries([
        function writeMP3(next) {
          if (src_ext === 'mp3') {
            return void next();
          }
          let mp3_target = `mp3/${elem.dest}.mp3`;
          assert(!did_output[mp3_target], mp3_target + ' output twice');
          did_output[mp3_target] = true;
          let outStream = fs.createWriteStream(`${OUTDIR}/${mp3_target}`);
          ffmpeg()
            .input(elem.src)
            .audioBitrate(128)
            .toFormat('mp3')
            .on('error', error => console.log(`Encoding Error: ${error.message}`))
            .on('exit', () => console.log('Audio recorder exited'))
            .on('close', () => console.log('Audio recorder closed'))
            .pipe(outStream, { end: true });
          outStream.on('close', function () {
            next();
          });
        },
        function writeOGG(next) {
          if (src_ext === 'ogg') {
            return void next();
          }
          let ogg_target = `ogg/${elem.dest}.ogg`;
          assert(!did_output[ogg_target], ogg_target + ' output twice');
          did_output[ogg_target] = true;
          let outStream = fs.createWriteStream(`${OUTDIR}/${ogg_target}`);
          ffmpeg()
            .input(elem.src)
            .audioQuality(7)
            .toFormat('ogg')
            .on('error', error => console.log(`Encoding Error: ${error.message}`))
            .on('exit', () => console.log('Audio recorder exited'))
            .on('close', () => console.log('Audio recorder closed'))
            .pipe(outStream, { end: true });
          outStream.on('close', function () {
            next();
          });
        },
      ], next);
    }, next);
  },
], function (err) {
  if (err) {
    throw err;
  }
  console.log('Done.');
});

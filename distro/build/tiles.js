const assert = require('assert');
const fs = require('fs');
const ASSETDIR = __dirname + '/../../assets';
const TILEDIR = ASSETDIR + '/tiles/';
const { pngAlloc, pngRead, pngWrite } = require('./png');
const { abs, floor, round, max } = Math;

const OUTDIR = __dirname + '/../out';

const DO_LOOKUP = false;

const REMAPPING1 = {
  'Rykhath-Tiles Donation': 'tiles',
  'IDK tiles': 'tiles2',
  'floortiles_and_stuff': 'tiles',
  'crystalwarriors-sheet': 'crystalwarriors',
  'rock-monsters': 'monsters2',
};

function remapper(key, tilex, tiley) {
  if (key === 'davidyork/monsters') {
    let monidx = tilex % 4;
    let frameidx = floor(tilex / 4);
    return [monidx * 4 + frameidx, tiley];
  }
  if (key === 'davidyork/crystalwarriors') {
    let monidx = tilex % 4;
    let frameidx = floor(tilex / 4);
    return [monidx * 2 + frameidx, tiley];
  }
  if (key === 'davidyork/monsters2') {
    let monidx = tilex % 8;
    let frameidx = floor(tilex / 8);
    return [monidx * 4 + frameidx, tiley];
  }
  return [tilex, tiley];
}

const DIM = 12;
const PALETTE = [
  [0xbe, 0x4a, 0x2f,  round(118.5)],
  [0xd7, 0x76, 0x43,  round(141.0)],
  [0xea, 0xd4, 0xaa,  round(202.0)],
  [0xe4, 0xa6, 0x72,  round(171.0)],
  [0xb8, 0x6f, 0x50,  round(132.0)],
  [0x73, 0x3e, 0x39,  round(86.0)],
  [0x3e, 0x27, 0x31,  round(50.5)],
  [0xa2, 0x26, 0x33,  round(100.0)],
  [0xe4, 0x3b, 0x44,  round(143.5)],
  [0xf7, 0x76, 0x22,  round(140.5)],
  [0xfe, 0xae, 0x34,  round(153.0)],
  [0xfe, 0xe7, 0x61,  round(175.5)],
  [0x63, 0xc7, 0x4d,  round(138.0)],
  [0x3e, 0x89, 0x48,  round(99.5)],
  [0x26, 0x5c, 0x42,  round(65.0)],
  [0x19, 0x3c, 0x3e,  round(43.5)],
  [0x12, 0x4e, 0x89,  round(77.5)],
  [0x00, 0x99, 0xdb,  round(109.5)],
  [0x2c, 0xe8, 0xf5,  round(144.5)],
  [0xff, 0xff, 0xff,  round(255.0)],
  [0xc0, 0xcb, 0xdc,  round(206.0)],
  [0x8b, 0x9b, 0xb4,  round(159.5)],
  [0x5a, 0x69, 0x88,  round(113.0)],
  [0x3a, 0x44, 0x66,  round(80.0)],
  [0x26, 0x2b, 0x44,  round(53.0)],
  [0x18, 0x14, 0x25,  round(28.5)],
  [0xff, 0x00, 0x44,  round(127.5)],
  [0x68, 0x38, 0x6c,  round(82.0)],
  [0xb5, 0x50, 0x88,  round(130.5)],
  [0xf6, 0x75, 0x7a,  round(181.5)],
  [0xe8, 0xb7, 0x96,  round(191.0)],
  [0xc2, 0x85, 0x69,  round(149.5)],

  // sorted by luminance:
  // [0x18, 0x14, 0x25], // luminance 28.5
  // [0x19, 0x3c, 0x3e], // luminance 43.5
  // [0x3e, 0x27, 0x31], // luminance 50.5
  // [0x26, 0x2b, 0x44], // luminance 53.0
  // [0x26, 0x5c, 0x42], // luminance 65.0
  // [0x12, 0x4e, 0x89], // luminance 77.5
  // [0x3a, 0x44, 0x66], // luminance 80.0
  // [0x68, 0x38, 0x6c], // luminance 82.0
  // [0x73, 0x3e, 0x39], // luminance 86.0
  // [0x3e, 0x89, 0x48], // luminance 99.5
  // [0xa2, 0x26, 0x33], // luminance 100.0
  // [0x00, 0x99, 0xdb], // luminance 109.5
  // [0x5a, 0x69, 0x88], // luminance 113.0
  // [0xbe, 0x4a, 0x2f], // luminance 118.5
  // [0xff, 0x00, 0x44], // luminance 127.5
  // [0xb5, 0x50, 0x88], // luminance 130.5
  // [0xb8, 0x6f, 0x50], // luminance 132.0
  // [0x63, 0xc7, 0x4d], // luminance 138.0
  // [0xf7, 0x76, 0x22], // luminance 140.5
  // [0xd7, 0x76, 0x43], // luminance 141.0
  // [0xe4, 0x3b, 0x44], // luminance 143.5
  // [0x2c, 0xe8, 0xf5], // luminance 144.5
  // [0xc2, 0x85, 0x69], // luminance 149.5
  // [0xfe, 0xae, 0x34], // luminance 153.0
  // [0x8b, 0x9b, 0xb4], // luminance 159.5
  // [0xe4, 0xa6, 0x72], // luminance 171.0
  // [0xfe, 0xe7, 0x61], // luminance 175.5
  // [0xf6, 0x75, 0x7a], // luminance 181.5
  // [0xe8, 0xb7, 0x96], // luminance 191.0
  // [0xea, 0xd4, 0xaa], // luminance 202.0
  // [0xc0, 0xcb, 0xdc], // luminance 206.0
  // [0xff, 0xff, 0xff], // luminance 255.0
];

const TOL = 0xe9-0xdb; // color #17
function colorInPalette(r, g, b) {
  let ret = null;
  for (let ii = 0; ii < PALETTE.length; ++ii) {
    let pal = PALETTE[ii];
    if (abs(pal[0] - r) <= TOL &&
      abs(pal[1] - g) <= TOL &&
      abs(pal[2] - b) <= TOL
    ) {
      assert(ret === null);
      ret = ii;
    }
  }
  return ret;
}

function writePNGs(filename, img) {
  let outbuf = pngWrite(img);
  fs.writeFileSync(filename.replace('/color/', '/'), outbuf);

  let greyscale = pngAlloc({ width: img.width, height: img.height, byte_depth: 4 });
  let lookup = pngAlloc({ width: img.width, height: img.height, byte_depth: 4 });
  let x8 = pngAlloc({ width: img.width * 8, height: img.height * 8, byte_depth: 4 });
  for (let ii = 0; ii < greyscale.data.length; ii+=4) {
    let r = img.data[ii];
    let g = img.data[ii+1];
    let b = img.data[ii+2];
    let a = img.data[ii+3];
    let gsr = r;
    let gsg = g;
    let gsb = b;
    let lur = r;
    let lug = 0;
    let lub = 0;
    if (a) {
      let idx = colorInPalette(r, g, b);
      assert(idx !== null);
      gsr = gsg = gsb = PALETTE[idx][3]
      lur = idx;
    }
    greyscale.data[ii] = gsr;
    greyscale.data[ii+1] = gsg;
    greyscale.data[ii+2] = gsb;
    greyscale.data[ii+3] = a;
    lookup.data[ii] = lur;
    lookup.data[ii+1] = lug;
    lookup.data[ii+2] = lub;
    lookup.data[ii+3] = a;
    let xxx = ii/4 % img.width;
    let yyy = (ii/4 - xxx) / img.width;
    for (let yy = 0; yy < 8; ++yy) {
      for (let xx = 0; xx < 8; ++xx) {
        x8.data[((yyy * 8 + yy) * img.width * 8 + xxx * 8 + xx) * 4] = r;
        x8.data[((yyy * 8 + yy) * img.width * 8 + xxx * 8 + xx) * 4 + 1] = g;
        x8.data[((yyy * 8 + yy) * img.width * 8 + xxx * 8 + xx) * 4 + 2] = b;
        x8.data[((yyy * 8 + yy) * img.width * 8 + xxx * 8 + xx) * 4 + 3] = a;
      }
    }
  }
  outbuf = pngWrite(greyscale);
  fs.writeFileSync(filename.replace('/color/', '/greyscale/'), outbuf);
  if (DO_LOOKUP) {
    outbuf = pngWrite(lookup);
    fs.writeFileSync(filename.replace('/color/', '/lookup/'), outbuf);
  }
  outbuf = pngWrite(x8);
  if (filename.endsWith('atlas.png')) {
    fs.writeFileSync(filename.replace('/color/', '/').replace('atlas.png', 'atlas-8x.png'), outbuf);
  } else {
    assert(filename.includes('/individual/'));
    fs.writeFileSync(filename.replace('/color/', '/').replace('/individual/', '/individual-8x/'), outbuf);
  }
}

function hexcolor(r, g, b, a) {
  return ('000000' + (r << 16 | g << 8 | b).toString(16)).slice(-6);
}

function mkdir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

mkdir(OUTDIR);
mkdir(OUTDIR + '/tiles');
mkdir(OUTDIR + '/tiles/individual');
mkdir(OUTDIR + '/tiles/individual-8x');
mkdir(OUTDIR + '/tiles/greyscale');
mkdir(OUTDIR + '/tiles/greyscale/individual');
if (DO_LOOKUP) {
  mkdir(OUTDIR + '/tiles/lookup');
  mkdir(OUTDIR + '/tiles/lookup/individual');
}
mkdir(OUTDIR + '/fonts');
let onepng = pngAlloc({ width: DIM, height: DIM, byte_depth: 4 });

const OUTW = 42; // in tiles, <~512px
const OUTH = floor(1024/DIM);
let outpng = pngAlloc({ width: OUTW * DIM, height: OUTH * DIM, byte_depth: 4 });
let out_row_y = 0;
let out_row_y1 = 0;
let out_row_x = 0;

let users = fs.readdirSync(TILEDIR);

let atlas_ids = [];

let seen_keys = {};
let seen_imgnames = {};

users.forEach(function (username) {
  let files = fs.readdirSync(TILEDIR + username);
  files = files.filter((filename) => {
    return filename.endsWith('.png');
  });

  files.forEach((sourcename) => {
    let png = pngRead(fs.readFileSync(TILEDIR + username + '/' + sourcename));
    assert(!png.err, png.err);
    png = png.img;
    assert(sourcename.endsWith('.png'));
    sourcename = sourcename.slice(0, -4);
    let imgname = REMAPPING1[sourcename] || sourcename.toLowerCase();
    sourcename = `${username}/${sourcename}.png`;

    let imgkey = imgname;
    if (seen_keys[imgname]) {
      imgkey = `${username}-${imgname}`;
    }
    seen_keys[imgname] = true;

    const { width, height, data } = png;
    let key = `${username}/${imgname}`;
    console.log(`${key}: ${width}x${height}`);
    assert(!(width % DIM));
    assert(!(height % DIM));

    let seen_lines = [];

    let tilew = width / DIM;
    let tileh = height / DIM;
    let tiles_out = [];
    for (let tiley = 0; tiley < tileh; ++tiley) {
      for (let tilex = 0; tilex < tilew; ++tilex) {
        let any_used = false;
        for (let yy = 0; yy < DIM; ++yy) {
          for (let xx = 0; xx < DIM; ++xx) {
            let xxx = tilex * DIM + xx;
            let yyy = tiley * DIM + yy;
            let idx = (xxx + yyy * width) * 4;
            let r = data[idx];
            let g = data[idx+1];
            let b = data[idx+2];
            let a = data[idx+3];
            if (!a) {
              continue;
            }
            any_used = true;
            seen_lines[tiley] = true;
            if (a !== 255) {
              console.log(`${sourcename} @${xxx},${yyy}: Semi-transparent: `, r, g, b, a);
              assert(false, 'semi-transparent pixel encountered');
            }
            let use_color = colorInPalette(r, g, b);
            if (use_color === null) {
              console.log(`${sourcename} @${xxx},${yyy}: Not in palette: `, r, g, b, a, hexcolor(r, g, b, a));
              assert(false, 'non-palette pixel encountered');
            } else {
              data[idx] = PALETTE[use_color][0];
              data[idx+1] = PALETTE[use_color][1];
              data[idx+2] = PALETTE[use_color][2];
            }
          }
        }
        if (!any_used) {
          // console.log(`Skip ${key}/${tilex},${tiley}`);
          continue;
        }
        // output the tile later
        tiles_out.push({
          src: [tilex, tiley],
          dest: remapper(key, tilex, tiley),
        });
      }
    }

    // compress blank lines
    let out_line = 0;
    for (let ii = 0; ii < seen_lines.length; ++ii) {
      if (!seen_lines[ii]) {
        continue;
      }
      for (let jj = 0; jj < tiles_out.length; ++jj) {
        if (tiles_out[jj].dest[1] === ii) {
          tiles_out[jj].dest[1] = out_line;
        }
      }
      ++out_line;
    }

    if (username === 'rykhath') {
      // also compress empty spots in each row
      let rowy = 0;
      let rowx = 0;
      for (let ii = 0; ii < tiles_out.length; ++ii) {
        let pair = tiles_out[ii];
        if (pair.dest[1] !== rowy) {
          rowy = pair.dest[1];
          rowx = 0;
        }
        pair.dest[0] = rowx;
        ++rowx;
      }
    }

    let jsondata;

    if (fs.existsSync(TILEDIR + sourcename.replace('.png', '.json'))) {
      jsondata = JSON.parse(fs.readFileSync(TILEDIR + sourcename.replace('.png', '.json'), 'utf8')).frames;
    }

    // output individual tiles
    let count = 0;
    tiles_out.sort((a, b) => {
      a = a.dest;
      b = b.dest;
      if (a[1] !== b[1]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
    let outidx = 0;
    tiles_out.forEach(function (pair) {
      let [tilex, tiley] = pair.src;
      // let [desttilex, desttiley] = pair.dest;
      // let outpath = `${OUTDIR}/tiles/color/individual/${imgkey}-${desttiley * tilew + desttilex}.png`;
      let name = `${imgkey}-${outidx++}`;
      for (let key2 in jsondata) {
        let elem = jsondata[key2];
        if (elem.frame.x === tilex * DIM && elem.frame.y === tiley * DIM) {
          name = key2.toLowerCase();
          break;
        }
      }
      let outpath = `${OUTDIR}/tiles/color/individual/${name}.png`;
      assert(!seen_imgnames[name]);
      seen_imgnames[name] = true;
      pair.name = name;
      for (let yy = 0, out=0; yy < DIM; ++yy) {
        let yyy = tiley * DIM + yy;
        for (let xx = 0; xx < DIM; ++xx) {
          for (let ii = 0; ii < 4; ++ii, ++out) {
            onepng.data[out] = data[(tilex * DIM + xx + yyy * width) * 4 + ii];
          }
        }
      }
      writePNGs(outpath, onepng);
      ++count;
    });
    console.log(`${key}: wrote ${count} tiles`);

    // output into atlas
    let destw = 0;
    let desth = 0;
    tiles_out.forEach(function (pair) {
      destw = max(destw, pair.dest[0] + 1);
      desth = max(desth, pair.dest[1] + 1);
    });
    const PACK_TIGHT = false;
    if (!PACK_TIGHT) {
      if (out_row_x + destw > OUTW) {
        out_row_x = 0;
        out_row_y = out_row_y1;
      }
      out_row_y1 = max(out_row_y1, out_row_y + desth);
    }
    tiles_out.forEach(function (pair) {
      let [desttilex, desttiley] = pair.dest;
      if (PACK_TIGHT) {
        desttilex = 0;
        desttiley = 0;
      }
      let [tilex, tiley] = pair.src;
      atlas_ids[(out_row_y + desttiley) * OUTW + (out_row_x + desttilex)] = pair.name;
      for (let yy = 0; yy < DIM; ++yy) {
        let outyyy = (out_row_y + desttiley) * DIM + yy;
        let yyy = tiley * DIM + yy;
        for (let xx = 0; xx < DIM; ++xx) {
          let outxxx = (out_row_x + desttilex) * DIM + xx;
          let xxx = tilex * DIM + xx;
          for (let ii = 0; ii < 4; ++ii) {
            outpng.data[(outxxx + outyyy * OUTW*DIM) * 4 + ii] = data[(xxx + yyy * width) * 4 + ii];
          }
        }
      }
      if (PACK_TIGHT) {
        out_row_x++;
        if (out_row_x === OUTW) {
          out_row_x = 0;
          out_row_y++;
          out_row_y1 = out_row_y + 1;
        }
      }
    });
    if (!PACK_TIGHT) {
      out_row_x += destw;
    }
  });

});
outpng.height = out_row_y1 * DIM;
writePNGs(`${OUTDIR}/tiles/color/atlas.png`, outpng);

let pal = pngAlloc({ width: 32, height: 1, byte_depth: 4 });
for (let ii = 0; ii < PALETTE.length; ++ii) {
  for (let jj = 0; jj < 3; ++jj) {
    pal.data[ii*4 + jj] = PALETTE[ii][jj];
  }
}
for (let ii = 0; ii < pal.width; ++ii) {
  pal.data[ii*4+3] = 255;
}
fs.writeFileSync(`${OUTDIR}/tiles/palette.png`, pngWrite(pal));

let mapping = [];
for (let ii = 0; ii < atlas_ids.length; ++ii) {
  mapping.push(atlas_ids[ii] || 'empty');
}
fs.writeFileSync(`${OUTDIR}/tiles/atlasmap.txt`, mapping.join('\n'));

// Copy non-tiles
fs.readdirSync(`${ASSETDIR}/fonts`)
  .filter((a) => a.endsWith('.ttf') || a.endsWith('.png') || a.endsWith('.txt'))
  .forEach((filename) => {
    fs.cpSync(`${ASSETDIR}/fonts/${filename}`, `${OUTDIR}/fonts/${filename}`);
  });

fs.cpSync(`${ASSETDIR}/../LICENSE`, `${OUTDIR}/LICENSE`);
fs.cpSync(`${OUTDIR}/../README.md`, `${OUTDIR}/README.md`);

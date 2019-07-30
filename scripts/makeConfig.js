#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CUSTOM_CONFIG_FILE = 'text.config.js';
const CONFIG_FILE = 'config.js';
const DEFAULT_CONFIG_FILE = 'defaultConfig.js';
const TEMPLATE_CONFIG_FILE = 'templeConfig.js';

const libPath = path.join(__dirname, '.', CUSTOM_CONFIG_FILE);
const libPathCustom = path.join(__dirname, './react-native-normalization-text', CONFIG_FILE);
const libPathDefault = path.join(__dirname, '.', DEFAULT_CONFIG_FILE);
const libPathTemplate = path.join(__dirname, '.', TEMPLATE_CONFIG_FILE);


makeConfig(process.argv[2]);

function makeConfig(name) {
    if (/--init/.test(name)) {
      init();
    }

    if (/--reset/.test(name)) {
     reset();
     return;
    }

    if (/--update/.test(name)) {
        update();
    }

}

function init() {
  fs.copyFile(libPathTemplate, libPathCustom, function (err) {
    if (err) {
      console.log('init failed!', err);
    } else {
      console.log('init succeed!');
    }
  });
}

function reset() {
  fs.copyFile(libPathDefault, libPath, function (err) {
      if (err) {
        console.log('reset failed!', err);
      } else {
        console.log('reset succeed!');
      }
  });
  // const defaultConfig = fs.readFileSync(path.join(__dirname, '../configs', DEFAULT_CONFIG_FILE));
  // const res = fs.writeFileSync(path.join(__dirname, '../configs', CONFIG_FILE), defaultConfig);
  //
  // if (res) {
  //   console.log('reset failed!', res);
  //   return;
  // }
  // console.log('reset succeed!');
}

// function update() {
//   fs.exists(path.join(process.cwd(), CUSTOM_CONFIG_FILE), function (exists) {
//     if (exists) {
//       const customConfig = fs.readFileSync(path.join(process.cwd(), CUSTOM_CONFIG_FILE));
//       const res = fs.writeFileSync(path.join(__dirname, '../configs', CONFIG_FILE), customConfig);
//       if (res) {
//         console.log('update failed!', res);
//         return;
//       }
//       console.log('update succeed!');
//     } else {
//       console.log('config not found!');
//     }
//   });
// }

function update() {
  const libData = fs.createReadStream(libPath);
  const libDataCopy = fs.createWriteStream(libPathCustom);
  /*
// 前瞻：
exp1(?=exp2) 查找exp2前面的exp1
// 后顾：
(?<=exp2)exp1 查找exp2后面的exp1
// 负前瞻：
exp1(?!exp2) 查找后面不是exp2的exp1
// 负后顾：
(?<!exp2)exp1 查找前面不是exp2的exp1
 */
// 只改相对路径
// 绝对路劲不改
  const resolvePath = (p) => {
    return p.replace(/(?<=require\s?\(\s?['"]\s?)[.].*?(?=\s?['"]\s?\))/g, function (data) {
      return path.join('..', data).split(path.sep).join('/');
    });
  };

  const rl = readline.createInterface({
    input: libData,
    // output: process.stdout
  });

  rl.on('line', (input) => {
    console.log(`接收到：${input}`);
    libDataCopy.write(`${resolvePath(input)}\n`);
  });

  rl.on('close', () => {
    console.log('读完成');
    libDataCopy.end(); // 内存中的数据写完才会close
  });

  libDataCopy.on('close', () => {
    console.log('文件关闭');
  });
}


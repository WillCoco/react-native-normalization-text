#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');

const CUSTOM_CONFIG_FILE = 'text.config.js';
const CONFIG_FILE = 'config.js';
const DEFAULT_CONFIG_FILE = 'defaultConfig.js';
const TEMPLATE_CONFIG_FILE = 'templateConfig.js';

const libPath = path.join(__dirname, '../configs', CONFIG_FILE);                 // 生效配置路径
const libPathDefault = path.join(__dirname, '../configs', DEFAULT_CONFIG_FILE);  // 默认配置路径
const libPathTemplate = path.join(__dirname, '../configs',TEMPLATE_CONFIG_FILE); // 自定义配置模板路径
const libPathCustom = path.join(process.cwd(), CUSTOM_CONFIG_FILE);              // 项目根目录下的自定义配置路径

const citesREG = /((?<=require\s*\(\s*['"]\s?)[^/].*?(?=\s*['"]\s*\)))|((?<=import.*from\s+['"]\s*)[^/].*?(?=\s*['"]\s*))/g;  // 资源引用代码匹配 require/import

makeConfig(process.argv[2]);

function makeConfig(name) {
    if (/--init/.test(name)) {
      init();
      return;
    }

    if (/--reset/.test(name)) {
     reset();
     return;
    }

    if (/--update/.test(name)) {
        update();
        return;
    }

    if (/--help/.test(name)) {
        help();
        return;
    }

    help();
}

function init() {
  fs.copyFile(libPathTemplate, libPathCustom, function (err) {
    if (err) {
      console.log(chalk.red('init failed!'), chalk.red(err));
    } else {
      console.log(chalk.green('init succeed!!!'));
    }
  });
}

function reset() {
  fs.copyFile(libPathDefault, libPath, function (err) {
      if (err) {
        console.log(chalk.red('reset failed!'), chalk.red(err));
      } else {
        console.log(chalk.green('reset succeed!!!'));
      }
  });
}


// 将libCustom写入lib
function update() {
  const lib = fs.createWriteStream(libPath);
  const libCustom = fs.createReadStream(libPathCustom);

// 只改相对路径
// 绝对路劲不改
  const resolvePath = (p) => {
    return p.replace(citesREG, function (data) {
      return path.join(process.cwd(), data).split(path.sep).join('/');
    });
  };

  const rl = readline.createInterface({
    input: libCustom,
    // output: process.stdout
  });

  rl.on('line', (input) => {
    console.log(`|${input}`);
      lib.write(`${resolvePath(input)}\n`);
  });

  rl.on('error', (err) => {
    console.log(chalk.red('update read fail!'), chalk.red(err));
  });

  libCustom.on('error', (err) => {
    console.log(chalk.red('update失败!'), chalk.red(err));
  });

  rl.on('close', () => {
    lib.end(); // 内存中的数据写完才会close
  });

  libCustom.on('close', () => {
    console.log(chalk.green('\n update success!!! '));
  });
}

function help () {
    console.log(chalk.greenBright(`
        -- init 初始化自定义配置文件
        -- update 更新自定配置文件到react-native-normalization-text
        -- reset 重置react-native-normalization-text配置文件
        --- help 查看帮助
    `))
}


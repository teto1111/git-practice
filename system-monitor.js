import chalk from 'chalk';
import fs from 'fs';
import os from 'os';

console.log(chalk.cyan.bold('CLI System Health Monitor Starting...'));

console.log(chalk.blue(`[Log #1] OS Detected: ${process.platform} ${process.platform === 'win32' ? '(Windows)' : ''}`));

const configData = fs.readFileSync('./config.json', 'utf8');
const config = JSON.parse(configData);
console.log(chalk.green('[Log #2] Settings Loaded: App Name ->', config.appName));

const totalRAM = (os.totalmem() / (1024 ** 3)).toFixed(2);
const freeRAM = (os.freemem() / (1024 ** 3)).toFixed(2);
const usedRAM = (totalRAM - freeRAM).toFixed(2);

const promise = new Promise((resolve, reject) => {
  const report = `
=== System Health Report ===
Generated: ${new Date().toLocaleString()}
Platform: ${process.platform}
Total RAM: ${totalRAM} GB
Free RAM: ${freeRAM} GB
Used RAM: ${usedRAM} GB
=============================`;
  
  fs.writeFile('./report.txt', report, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

promise
  .then(() => {
    console.log(chalk.green.bold('[Log #3] RAM Check Done & report.txt saved!'));
    console.log(chalk.yellow(`App: ${config.appName}`));
    console.log(chalk.yellow(`OS: ${process.platform}`));
    console.log(chalk.yellow(`Total RAM: ${totalRAM} GB`));
    console.log(chalk.yellow(`Used RAM: ${usedRAM} GB`));
    console.log(chalk.yellow(`Free RAM: ${freeRAM} GB`));
  })
  .catch(err => console.error(chalk.red(err)));

console.log(chalk.magenta.bold('[Log #4] Main thread still running – Event Loop in action!'));
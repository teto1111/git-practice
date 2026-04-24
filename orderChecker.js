import chalk from 'chalk';
import { readAndUpdateOrder } from './orderModule.js';

console.log(chalk.cyan.bold('Starting Order Status Checker...'));

try {
  const order = await readAndUpdateOrder('./order.json');
  console.log(chalk.green(`Order Found: ${order.orderId} - ${order.item}`));
  console.log(chalk.yellow(`Status updated to: ${order.status}`));
  console.log(chalk.green(`Order ID: ${order.orderId}`));
  console.log(chalk.green(`Item: ${order.item}`));
  console.log(chalk.green(`New Status: ${order.status}`));
} catch (error) {
  console.error(chalk.red('Error:', error.message));
} finally {
  console.log(chalk.white('System Done.'));
}
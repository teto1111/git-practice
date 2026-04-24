import fs from 'fs/promises';
import chalk from 'chalk';

export async function readAndUpdateOrder(filePath) {
  console.log(chalk.blue('Reading order data...'));
  const data = await fs.readFile(filePath, 'utf8');
  const order = JSON.parse(data);
  
  order.status = 'Shipped';
  
  console.log(chalk.blue('Writing update...'));
  await fs.writeFile(filePath, JSON.stringify(order, null, 2));
  
  return order;
}
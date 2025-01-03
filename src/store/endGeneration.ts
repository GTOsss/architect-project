import chalk from 'chalk';
import { createEvent } from 'effector';

export const endGeneration = createEvent();

endGeneration.watch(() => console.log(chalk.green('Success')));

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import winston from 'winston';
import newRelicFormatter from '@newrelic/winston-enricher';

import { CommandoClient } from 'discord.js-commando';
import path from 'path';

const client = new CommandoClient({
  commandPrefix: '?',
  owner: process.env.OWNER
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'test' }),
    newRelicFormatter()
  ),
  transports: [new winston.transports.Console()]
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['first', 'Your first command group'],
    ['second', 'Your second Command Group']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'features'));

client.once('ready', () => {
  // eslint-disable-next-line no-console
  logger.info('The Bot is ready to take some commands');
  client.user?.setActivity('with Commando');
});

// eslint-disable-next-line no-console
client.on('error', logger.error);
client.login(process.env.DISCORD_BOT_TOKEN);

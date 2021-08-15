import * as dotenv from 'dotenv';
dotenv.config();
import winston from 'winston';

import { CommandoClient } from 'discord.js-commando';
import { paths } from './config';
const commandGroups = [
  ['fun', 'Fun'],
  ['general', 'General']
];

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

const client = new CommandoClient({
  commandPrefix: '-'
});

client.registry
  .registerDefaultTypes()
  .registerGroups(commandGroups)
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn({
    filter: /^([^.].*)\.(js|ts)?$/,
    dirname: paths.commands
  });

client.once('ready', () => {
  logger.info('The Bot is ready to take some commands');
  client.user?.setActivity('with Commando');
});

client.on('error', logger.error);
client.login(process.env.DISCORD_BOT_TOKEN);

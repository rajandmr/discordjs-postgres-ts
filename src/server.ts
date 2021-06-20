// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { CommandoClient } from 'discord.js-commando';
import path from 'path';

const client = new CommandoClient({
  commandPrefix: '?',
  owner: process.env.OWNER
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
  console.log('The Bot is ready to take some commands');
  client.user?.setActivity('with Commando');
});

// eslint-disable-next-line no-console
client.on('error', console.error);
client.login(process.env.DISCORD_BOT_TOKEN);

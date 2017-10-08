/* eslint consistent-return:0, no-console:0 */
const Discord = require('discord.js');

const config = require('./config.json');

const client = new Discord.Client();

const handleMessage = (message) => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    // message.reply(`Pong! Latency is: ${Math.round(client.ping)}ms`);
    message.channel.send('Pong...').then((msg) => {
      msg.edit(`Command Execution Time: ${msg.createdTimestamp - message.createdTimestamp}ms | Discord API Latency is ${Math.round(client.ping)}ms`);
    });
  } else

  if (command === 'speak') {
    if (message.author.id !== config.ownerID) return message.reply('No premissions!');
    message.channel.send(args.join(' '));
    message.delete();
  } else

  if (command === 'serverinfo') {
    const embed = new Discord.MessageEmbed()
      .setDescription(`${message.guild.name}'s Information and Details`)
      .setThumbnail(message.guild.iconURL())
      .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL())
      .addField('Members', `${message.guild.members.filter(member => member.user.bot).size} bots of ${message.guild.memberCount} members.`)
      .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice / ${message.guild.channels.filter(chan => chan.type === 'text').size} text`)
      .addField('Roles', message.guild.roles.map(role => role.name).join(', '));

    message.channel.send({ embed });
  }
};

const handleGuildCreate = (guild) => {
  console.log(`I have been added guild: ${guild.name}, Owned by: ${guild.owner.user.tag}, with ${guild.member} members.`);
};

const handleReady = () => {
  console.log(`Logged in as ${client.user.tag}`);
};

const handleGuildMemberAdd = (member) => {
  console.log(`${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id})`);
  const welcomeChannel = member.guild.channels.finf('name', 'welcome');
  if (welcomeChannel) {
    welcomeChannel.send(`Please welcome ${member.user.tag} to our weonderful guild!`);
  }
};

client.on('message', handleMessage);
client.on('guildCreate', handleGuildCreate);
client.on('ready', handleReady);
client.on('guildMemberAdd', handleGuildMemberAdd);

client.login(config.token);

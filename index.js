const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Discord.Collection();

const prefix = '!';

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    client.user.setActivity('Trail Blazers', {type: "WATCHING"})
    console.log('The bot is ready for showdown! Connected as ' + client.user.tag);
});


let stats = {
    serverID: '733663362818506793',
    total: "<810477879526948904>",
    member: "<810481302167224351>",
    bots: "<810482425451905114>"
}

client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    let TotalCountChnl = client.channels.cache.get(stats.total)
    TotalCountChnl.setName(`Total Users: ${member.guild.memberCount}`);
    let MemberCountChnl = client.channels.cache.get(stats.member)
    MemberCountChnl.setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    let BotCountChnl = client.channels.cache.get(stats.bots)
    BotCountChnl.setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    let TotalCountRmvChnl = client.channels.cache.get(stats.total)
    TotalCountRmvChnl.setName(`Total Users: ${member.guild.memberCount}`);
    let MemberCountRmvChnl = client.channels.cache.get(stats.member)
    MemberCountRmvChnl.setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    let BotCountRmvChnl = client.channels.cache.get(stats.bots)
    BotCountRmvChnl.setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on("message", msg =>{
    if(msg.content == '!owner'){
        msg.channel.send("The cool person who made this bot is <@699192193973354516>")
    }
})

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(token);
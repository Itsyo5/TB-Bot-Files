const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command. What else can you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .addField('`kick`', 'Kicks a member from your server via mention or ID')
        .addField('`ban`', 'Bans a member from your server via mention or ID')
        .addField('`clear`', 'Purges messages')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .addField('`calc`', 'Calculates a Maths problem given')
        .addField('`ping`', 'Get the bot\'s API ping')
        .setTimestamp()

        const pages = [
                moderation,
                utility
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
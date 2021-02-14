const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicks a member from the server",

    async run (client, message, args) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You can\'t use that!').then((m) => m.delete({ timeout: 1_000 }))
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I don\'t have the right permissions.').then((m) => m.delete({ timeout: 1_000 }))

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Please specify a user');

        if(!member) return message.channel.send('Can\'t seem to find this user. Sorry about that...').then((m) => m.delete({ timeout: 1_000 }))
        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t kick yourself!').then((m) => m.delete({ timeout: 1_000 }))
        if(member.id === client.user.id) return message.channel.send('Nuh uh. Why would I kick myself!?').then((m) => m.delete({ timeout: 1_000 }))
        if(!member.kickable) return message.channel.send('This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine');
        
        let reason = args.slice(" ")
                
        if(reason.length < 1){
            reason = "Unspecified"
        } else{
            reason = args.slice(1).join(" ");
        }

        member.kick()
        .catch(err => {
            if(err) return message.channel.send('Something went wrong, maybe try again later');
        })

        const kickembed = new Discord.MessageEmbed()
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked', member)
        .addField('Kicked by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked')
        .setTimestamp()
        
        message.channel.send(kickembed);
    }
}

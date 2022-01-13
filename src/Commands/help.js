const Command = require('../Structures/Command.js');
const {MessageEmbed} = require("discord.js");

module.exports = new Command({
    name: 'help',
    aliases: ['h'],
    description: 'Mostra os comandos disponíveis.',

    async run(message, args, client) {
        const channel = message.channel;
        const embed = new MessageEmbed().setColor('#1F0954').setTitle('Help');

        for(let command of client.commands) {
            let name = `${client.prefix}${command[1].name}`;
            if(command[1].aliases) {
                for(let alias of command[1].aliases) {
                    name += `, ${client.prefix}${alias}`;
                }
            }
            let value = `${command[1].description}`;

            embed.addField(name, value);
        }

        return channel.send({embeds: [embed]});
    }
});
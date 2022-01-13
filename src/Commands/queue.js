const Command = require('../Structures/Command.js');
const {MessageEmbed} = require("discord.js");
const queue = require('../index.js').queue;
const Queue = require('../Structures/Queue.js');

module.exports = new Command({
    name: 'queue',
    aliases: ['q'],
    description: 'Mostrar a fila de músicas.',
    
    async run(message, args, client) {
        /**
         * @type {Queue}
         */
        const server_queue = queue.get(message.guild.id);

        if(!server_queue || !server_queue.songs) {
            return message.reply('A fila está vazia.');
        }

        const embed = new MessageEmbed().setColor('#1F0954').setTitle('Song Queue');

        for(let song of server_queue.songs) {
            embed.addField(`**${song.title}** (${song.author})`, `${song.url}`)
        }

        return message.channel.send({embeds: [embed]});
    }
});
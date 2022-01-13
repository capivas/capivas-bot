const Command = require('../Structures/Command.js');
const Queue = require('../Structures/Queue.js');
const queue = require('../index.js').queue;

module.exports = new Command({
    name: 'skip',
    aliases: ['sk'],
    description: 'Próxima música.',

    async run(message, args, client) {
        /**
         * @type {Queue}
         */
        const server_queue = queue.get(message.guild.id);

        if(!server_queue) {
            return message.reply('A fila está vazia.');
        }

        server_queue.player.stop();
        await message.reply(`**${server_queue.songs[0].title}** pulada.`);
    }
});
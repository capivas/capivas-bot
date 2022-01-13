const Command = require('../Structures/Command.js');
const Queue = require('../Structures/Queue.js');
const queue = require('../index.js').queue;

module.exports = new Command({
    name: 'stop',
    aliases: ['st'],
    description: 'Para de tocar músicas.',

    async run(message, args, client) {
        /**
         * @type {Queue}
         */
        const server_queue = queue.get(message.guild.id);

        if(!server_queue) {
            return message.reply('Nenhuma música está sendo tocada.');
        }

        server_queue.songs = [];
        server_queue.connection.disconnect();
        queue.delete(message.guild.id);
    }
});
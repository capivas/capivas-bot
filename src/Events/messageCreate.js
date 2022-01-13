const Event = require("../Structures/Event.js");

module.exports = new Event("messageCreate", (client, message) => {
    if (!message.content.startsWith(client.prefix)) {
        return;
    }

    let args = message.content.substring(client.prefix.length).split(/ +/);
    const command = client.commands.get(args[0]) || client.aliases.get(args[0]);
    
    if (!command) {
        return message.reply(`${args[0]} não é um comando válido, digite !help para ver os comandos.`);
    }

    args = args.toString().substring(args[0].length +1);
    args = args.replaceAll(',', ' ');
    try{
        command.run(message, args, client);
    } catch(err) {
        console.log(err);
        message.channel.send('Houve um erro, tente novamente mais tarde.');
    }
});
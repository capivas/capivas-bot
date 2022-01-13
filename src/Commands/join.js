const Command = require("../Structures/Command.js");
const DiscordVoice = require("@discordjs/voice");

module.exports = new Command({
    name: "join",
    description: "Faz o bot entrar no canal de voz.",
    
    async run(message, args, client) {
        if (message.member.voice.channel) {
            try {
                DiscordVoice.joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });
                message.reply('Entrei.');
            } catch (err) {
                console.log(err);
            }
        } else {
            message.reply('Entre em um canal de voz antes de tentar executar este comando.');
        }
    }
});
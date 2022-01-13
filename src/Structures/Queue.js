const Discord = require("discord.js");
const DiscordVoice = require("@discordjs/voice");
const Song = require('./Song.js');

class Queue {
    /**
     * @param {Discord.Message | Discord.Interaction} message
     * @param {Song[]} songs
     */
    constructor(message, songs) {
        this.voice_channel = message.member.voice.channel;
        /**
         * @type {Discord.TextBasedChannel} text_channel
         */
        this.text_channel = message.channel;
        /**
         * @type {Song[]}
         */
        this.songs = songs;
    }

    /**
     * @param {Discord.Message | Discord.Interaction} message 
     */
    connect(message) {
        if (this.voice_channel) {
            try {
                this.connection = DiscordVoice.joinVoiceChannel({
                    channelId: this.voice_channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    /**
     * @param {Discord.Message | Discord.Interaction} message
     * @returns {boolean} Retorna true caso o usuário possua as permissões necessárias e false caso não possua alguma/todas.
     */
    checarPermissao(message) {
        let permissions = this.voice_channel.permissionsFor(message.client.user);
        return (permissions.has('CONNECT') && permissions.has('SPEAK'));
    }
}

module.exports = Queue;
const {MessageEmbed, Message, Interaction, Guild} = require('discord.js');
const DiscordVoice = require("@discordjs/voice");
const YouTube = require("youtube-api");
const ytdl = require('ytdl-core');

const config = require("../Data/config.json");
const Command = require('../Structures/Command.js');
const Infos = require('../Structures/Infos.js');
const Song = require('../Structures/Song.js');
const Queue = require("../Structures/Queue.js");

const queue = require("../index.js").queue;

module.exports = new Command({
	name: 'play',
	aliases: ['p'],
	description: 'Tocar uma música.',

	async run(message, args, client) {
		/**
		 * @type {Queue}
		 */
		let server_queue = queue.get(message.guild.id);

		if (!server_queue) {
			server_queue = new Queue(message, null);

			if (!server_queue.voice_channel) {
				return message.channel.send('Entre em um canal de voz antes de executar este comando.');
			}
		}

		if (!server_queue.checarPermissao(message)) {
			return message.channel.send('Você não possui as permissões necessárias para isso.');
		}

		if (args.length <= 0) {
			return message.channel.send('Escolha uma música para tocar.');
		}

		/**
		 * @type {Song}
		 */
		let song;

		if (ytdl.validateURL(args)) {
			let infos = await ytdl.getInfo(args);
			infos = new Infos(infos.videoDetails.title, infos.videoDetails.video_url, message.author.username);
			song = new Song(infos);
		} else {
			const infos = await search(args, message);
			if (infos) {
				song = new Song(infos);
			} else {
				message.channel.send('Erro ao buscar vídeo.');
			}
		}

		if (!server_queue.songs) {
			queue.set(message.guild.id, server_queue);
			server_queue.songs = [];
			server_queue.songs.push(song);
			try {
				server_queue.connect(message);
				video_player(message.guild, song);
			} catch (err) {
				queue.delete(message.guild.id);
				message.channel.send('Houve um erro de conexão.');
				throw err;
			}
		} else {
			server_queue.songs.push(song);
			let embed = new MessageEmbed().setColor(`${config.embed_color}`).setTitle('Música adicionada à fila!').addField(`**${song.title}**`, song.url);
			return message.channel.send({embeds: [embed]});
        }
	}
});

/**
 * @type {Infos}
 * @param {string} args
 * @param {Message | Interaction} message
 */
 const search = async (args, message) => {
	var r = await YouTube.search.list({part: 'id,snippet', q: `${args}`, type: 'video', videoCategoryId: `${config.youtube_music_category}`, maxResults: 1, key: `${config.youtube_api_key}`});
	if(r.data.items && r.data.items.length > 0) {
		const video = r.data.items[0];
		return new Infos(video.snippet.title, `https://www.youtube.com/watch?v=${video.id.videoId}`, message.author.username);
	} else {
		r = await YouTube.search.list({part: 'id,snippet', q: `${args}`, types: 'video', maxResults: 1, key: `${config.youtube_api_key}`});
		if(r.data.items && r.data.items.length > 0) {
			const video = r.data.items[0];
			return new Infos(video.snippet.title, `https://www.youtube.com/watch?v=${video.id.videoId}`, message.author.username);
		}
		return null;
	}
}

/**
 * @param {Guild} guild 
 * @param {Song} song 
 * @returns 
 */
const video_player = async (guild, song) => {
	const song_queue = queue.get(guild.id);

	if (!song) {
		song_queue.text_channel.send('Fim da fila.');
		song_queue.connection.disconnect();
		queue.delete(guild.id);
		return;
	}

	const stream = ytdl(song.url, { filter: 'audioonly', volume: 0.5 });
	const player = DiscordVoice.createAudioPlayer();
	
	player.addListener("stateChange", (oldOne, newOne) => {
		if (newOne.status == 'idle') {
			song_queue.songs.shift();
			video_player(guild, song_queue.songs[0]);
		}
	});
	player.on("error", () => {
		return song_queue.text_channel.send("Algo deu errado, tente novamente.");
	});
	song_queue.player = player;
	const resource = DiscordVoice.createAudioResource(stream);

	await play(player, resource, song_queue.connection);

	const embed = new MessageEmbed().setColor(`${config.embed_color}`).setTitle('Tocando agora');
	await now_playing(song_queue, embed);
}

/**
 * @param {DiscordVoice.AudioPlayer} player 
 * @param {DiscordVoice.AudioResource} resource 
 * @param {DiscordVoice.VoiceConnection} connection 
 */
const play = async (player, resource, connection) => {
	await player.play(resource);
	connection.subscribe(player);
}

/**
 * @param {Queue} song_queue 
 * @param {MessageEmbed} embed 
 */
const now_playing = async (song_queue, embed) => {
	embed.addField(`${song_queue.songs[0].title} (${song_queue.songs[0].author})`, `${song_queue.songs[0].url}`);
	song_queue.text_channel.send({embeds: [embed]});
}

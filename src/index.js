console.clear();

const YouTube = require("youtube-api");
const config = require("./Data/config.json");

const Client = require("./Structures/Client.js");
const client = new Client();

const queue = new Map();
module.exports = {queue};

YouTube.videoCategories.list({part: 'snippet', regionCode: `${config.region_code}`, key: `${config.youtube_api_key}`}).then(result => {
    const items = result.data.items;
    for(let item of items) {
        if(item.snippet.title === 'Music') {
            config.youtube_music_category = item.id;
            break;
        }
    }
});

client.start(config.token);
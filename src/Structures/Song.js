const Infos = require('./Infos.js');

class Song {
    /**
     * @param {Infos} infos
     */
    constructor(infos) {
        /**
         * @type {string}
         */
        this.title = infos.title;
        /**
         * @type {string}
         */
        this.url = infos.url;
        /**
         * @type {string}
         */
        this.author = infos.author;
    }
}

module.exports = Song;
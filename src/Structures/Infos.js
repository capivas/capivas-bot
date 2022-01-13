class Infos {
    /**
     * @param {string} title Título da música.
     * @param {string} url URL do vídeo.
     * @param {string} author Nome do usuário que pediu a música.
     */
    constructor(title, url, author = '') {
        /**
         * @type {string}
         */
        this.title = title;
        /**
         * @type {string}
         */
        this.url = url;
        /**
         * @type {string}
         */
        this.author = author;
    }
}

module.exports = Infos;
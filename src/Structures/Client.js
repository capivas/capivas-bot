const Discord = require("discord.js");
const Command = require("./Command.js");
const Event = require("./Event.js");
const fs = require("fs");
const config = require("../Data/config.json");
const intents = new Discord.Intents(32767);

class Client extends Discord.Client {
    constructor() {
        super({ intents });
        /**
         * @type {Discord.Collection<string, Command>}
         */
        this.commands = new Discord.Collection();
        /**
         * @type {Discord.Collection<string, Command>}
         */
        this.aliases = new Discord.Collection();
        /**
         * @type {string}
         */
        this.prefix = config.prefix;
    }

    /**
     * @param {config.token} token 
     */
    start(token) {
        fs.readdirSync("./Commands").filter(file => file.endsWith(".js")).forEach(file => {
                /**
                 * @type {Command}
                 */
                const command = require(`../Commands/${file}`);
                this.commands.set(command.name, command);
                
                if(command.aliases) {
                    command.aliases.forEach(alias => {
                        this.aliases.set(alias, command);
                    });
                }
            });

        fs.readdirSync("./Events").filter(file => file.endsWith(".js")).forEach(file => {
                /**
                 * @type {Event} 
                 */
                const event = require(`../Events/${file}`);
                this.on(event.event, event.run.bind(null, this));
            });

        this.login(token);
    }

}

module.exports = Client;
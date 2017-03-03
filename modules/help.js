class Help {
    constructor() {
        this.commands = ["help"];
        this.commandList = {
            '!card': 'Search for an English Magic card by (partial) name, *Example: !card iona*',
            '!cr': 'Show an entry from the Comprehensive Rulebook, *Example: !cr 100.6b*',
            '!define': 'Show a definition from the Comprehensive Rulebook, *Example: !define phasing*'
        };
    }

    getCommands() {
        return this.commands;
    }

    handleMessage(command, parameter, msg) {
        const commands = Object.keys(this.commandList).map(cmd => `  **${cmd}**: ${this.commandList[cmd]}`);
        const response = [
            '**Available commands:**',
            commands.join('\n')
        ].join('\n');
        return msg.author.sendMessage(response);
    }
}
module.exports = Help;

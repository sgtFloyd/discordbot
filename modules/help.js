class Help {
    constructor() {
        this.commands = ["help"];
        this.commandList = {
            '!mtg': 'Search for an English Magic card by (partial) name, *Example: !mtg iona*',
            '!rule': 'Show an entry from the Comprehensive Rulebook, *Example: !rule 100.6b*',
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
